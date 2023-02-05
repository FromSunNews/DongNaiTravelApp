import { refreshTokenAPI } from 'request_api'
import axios from 'axios'
import { updateLoading, updateNotif } from 'redux/manifold/ManifoldSlice'

import { signOutUserAPI, updateFiledsUser } from 'redux/user/UserSlice'

// Phuong: How can I use the Redux store in non-component files?
// Phuong: https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
// Phuong: Inject store

let store
export const injectStore = _store => {
  store = _store
}

let authorizedAxiosInstance = axios.create()
// Phuong: after 1 minutes api will timeout
authorizedAxiosInstance.defaults.timeout = 1000 * 60 

// Phuong: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE
// authorizedAxiosInstance.defaults.withCredentials = true 

const isLoading = (loading = true) => {
  store.dispatch(updateLoading(loading))
}
// Phuong: https://axios-http.com/docs/interceptors

// Phuong: Can thiệp vào giữa request gửi đi
authorizedAxiosInstance.interceptors.request.use(function (config) {
  console.log("Loading...")

  // Phuong: Do something before request is sent
  isLoading(true)

  return config

}, function (error) {
  // Phuong: Do something with request error
  return Promise.reject(error)
})

// Phuong: Khởi tạo một cái promise cho việc gọi api refresh_token
// Phuong: Mục đích tạo Promise này để khi nào gọi api refresh_token xong xuôi thì mới retry lại các api bị lỗi trước đó.
let refreshTokenPromise = null

// Phuong: Can thiệp vào giữa response trả về
authorizedAxiosInstance.interceptors.response.use(function (response) {
  // Phuong: Bất kỳ mã status code nằm trong phạm vi 200 - 299 thì sẽ là success và code chạy vào đây
  // Phuong: Do something with response data
  console.log("Loading turn off...")
  isLoading(false)

  return response
  
}, function (error) {
  // Phuong: Bất kỳ mã status code nằm ngoài phạm vi 200 - 299 thì sẽ bị coi là error và code chạy vào đây
  // Phuong: Do something with response error
  isLoading(false)

  // Phuong: Nếu như nhận mã 401 từ phía BE trả về, gọi api đăng xuất luôn
  if (error.response?.status === 401) {
    console.log("Logout user....")
    store.dispatch(signOutUserAPI())
  }

  // Phuong: Nếu như nhận mã 410 từ phía BE trả về, gọi api refresh_token
  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true

    // Phuong: Kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_token vào cho cái refreshTokenPromise này
    if (!refreshTokenPromise) {
      console.log("Refresh token for User...")
      refreshTokenPromise = refreshTokenAPI()
        .then((data) => {return data?.accessToken}) 
        .catch(() => {
        // Phuong: Nếu nhận bất kỳ lỗi nào từ api refresh token thì cứ logout luôn
          console.log("Logout user....")
          store.dispatch(signOutUserAPI())
        })
        .finally(() => {
        // Phuong: Xong xuôi hết thì gán lại cái refreshTokenPromise về null
          refreshTokenPromise = null
        })
    }

    return refreshTokenPromise.then(accessToken => {
      // Phuong: Trường hợp nếu dự án cần lưu accessToken vào localstorage sẽ viết code ở đây.
      store.dispatch(updateFiledsUser({
        accessToken: accessToken
      }))
      // Phuong: Quan trọng: Return lại axios instance của chúng ta kết hợp các originalRequests để call lại những api ban đầu bị lỗi
      return authorizedAxiosInstance(originalRequests)
    })
  }

  // Phuong: Bắt lỗi nằm ngoài phạm vi 200-299
  // Phuong: Any status codes that falls outside the range of 2xx cause this function to trigger
  // Phuong: Do something with response error
  let errorMessage = error?.message
  
  
  if (error.response?.data?.errors)
  errorMessage = error.response?.data?.errors
  console.log("🚀 ~ file: AuthorizedAxiosInstance.js:99 ~ errorMessage", errorMessage)
  
  if (error.response?.status !== 410) {
    console.log("🚀 ~ file: AuthorizedAxiosInstance.js:104 ~ error.response?.status", error.response?.status)
    store.dispatch(updateNotif({
      appearNotificationBottomSheet: true,
      contentNotificationBottomSheet: errorMessage
    }))
  }

  return Promise.reject(error)
})

export default authorizedAxiosInstance