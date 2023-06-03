import axios from 'axios'
import authorizedAxiosInstance from 'axios/authorizedAxiosInstance'
import { updateNotif } from 'redux/manifold/ManifoldSlice'

import { API_ROOT } from 'utilities/constants'

import {
  BlogDataProps
} from 'types/index.d.ts'

let store
export const injectStoreRequest = _store => {
  store = _store
}

const handleNotif = (content) => {
  store.dispatch(updateNotif({
    appearNotificationBottomSheet: true,
    contentNotificationBottomSheet: content
  }))
}


export const signUpUserAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign_up`, data)
  return request.data
}

export const signInUserAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign_in`, data)
  return request.data
}

export const getInfoUserAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/get_info_user`, data)
  return request.data
}

export const updateUserAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/update`, data)
  return request.data
}

export const refreshTokenAPI = async () => {
  const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`, {
    refreshToken: store.getState().user.currentUser?.refreshToken
  })
  return request.data
}

export const sendOtpAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/send_otp`, data)
  return request.data
}

export const verifyOtpAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/verify_otp`, data)
  return request.data
}

export const resetPasswordAPI = async (data) => {
  const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/reset_password`, data)
  handleNotif('Reset your password successfully!')
  return request.data
}

export const getPrivateKeysAPI = async () => {
  const request = await axios.get(`${API_ROOT}/v1/map/private_keys`)
  return request.data
}

export const getPlaceDetailsAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/map/place_details`, data)
  return request.data
}

export const getPlacesTextSearchAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/map/places_text_search`, data)
  return request.data
}

export const getMorePlacesTextSearchAPI = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/map/places_text_search`, data)
  return request.data
}

export const getRouteDirectionAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/direction/route_direction`, data)
  return request.data
}

export const getWeatherCurrentAPI = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/map/weather_current`, data)
  return request.data
}

export const getWeatherForecastAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/map/weather_forecast`, data)
  return request.data
}


export const getGeocodingReverseAPI = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/map/geocoding_reverse`, data)
  return request.data
}

export const getPlacesAPI = async (query) => {
  let user = store.getState().user.currentUser;
  if(user) query += `&userId=${user._id}`;
  const response = await axios.get(`${API_ROOT}/v1/map/places?${query}`)
  return response.data
}

export const getPlaceDetailsWithPipelineAPI = async (query) => {
  let user = store.getState().user.currentUser;
  if(user) query += `&userId=${user._id}`;
  const response = await axios.get(`${API_ROOT}/v1/map/place_details?${query}`)
  return response.data
}

export const getMapUserAPI = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/users/get_map_user`, data)
  return request.data
}

export const updateMapUserAPI = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/users/update_map_user`, data)
  return request.data
}

export const createNewNotifAPI = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/notif/create_new`, data)
  return request.data
}

export const updateNotifAPI = async (data) => {
  const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/notif/update`, data)
  return request.data
}

export const updateManyNotifsAPI = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/notif/update_many`, data)
  return request.data
}

/**
 * __Authorize Require__
 * 
 * Hàm này dùng để cập nhật dữ liệu cho user.
 * @param {*} data 
 * @returns 
 */
export const updateUserByCaseAPI = async (data) => {
  try {
    let user = store.getState().user;
    if(!user) throw new Error("You must be authorized.");
    let accessToken = user.currentUser.accessToken;
    data.accessToken = accessToken;
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/update_by_case`, data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * __Authorize Require__
 * 
 * Dùng để tải lên một blog
 * @param {{blog: BlogDataProps, content: string}} data 
 * @returns 
 */
export const postNewBlogAPI = async (data) => {
  try {
    let user = store.getState().user;
    if(!user) throw new Error("You must be authorized.");
    let accessToken = user.currentUser.accessToken;
    data.accessToken = accessToken;
    data.blog.authorId = user.currentUser._id;
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/blog/create_new`, data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Dùng để lấy một blog.
 * @param {string} query Params để lấy dữ liệu một blog.
 * @returns 
 */
export const getBlogAPI = async (query) => {
  try {
    let user = store.getState().user.currentUser;
    if(user) query += `&userId=${user._id}`;
    const response = await axios.get(`${API_ROOT}/v1/blog/get_one?${query}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Dùng để lấy nhiều blog.
 * @param {string} query Params để lấy dữ liệu nhiều blog.
 * @returns 
 */
export const getBlogsAPI = async (query = "?limit=5&skip=0") => {
  try {
    let user = store.getState().user.currentUser;
    if(user) query += `&userId=${user._id}`;
    const response = await axios.get(`${API_ROOT}/v1/blog/get_multiple?${query}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}


// Api for chatbot
export const getTextChatBotAPI = async (data) => {
  try {
    const request = await axios.post(`${API_ROOT}/v1/chatbot/get_text`, data)
  return request.data
  } catch (error) {
    console.error(error.message);
  }
}