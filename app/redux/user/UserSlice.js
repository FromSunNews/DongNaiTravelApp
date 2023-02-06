import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from 'axios/authorizedAxiosInstance'

import { API_ROOT } from 'utilities/constants'


// Phương: Khởi tạo giá trị một giá trị của Slice trong Redux
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  userRole: 'guest'
}

// Phương: Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// Phương: https://redux-toolkit.js.org/api/createAsyncThunk

// export const signInUserAPI = createAsyncThunk(
//   'user/signInUserAPI',
//   async (data) => {
//     const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign_in`, data)
//     return request.data
//   }
// )

export const signOutUserAPI = createAsyncThunk(
  'user/signOutUserAPI',
  async () => {
    const request = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/sign_out`)
    return request.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async ( data ) => {
    const request = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return request.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateCurrentUser: (state, action) => {
      const user = action.payload
      state.currentUser = user
      state.isAuthenticated = true
      state.userRole = 'user'
    },
    updateFiledsUser: (state, action) => {
      const user = action.payload
      const keys = ['email', 'username', 'displayName', 'avatar', 'createdAt', 'updatedAt']
      keys.map(key => {
        if (user[key]) {
          state.currentUser = user[key]
        }
      })
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(signInUserAPI.fulfilled, (state, action) => {
    //   const user = action.payload
    //   state.currentUser = user
    //   state.isAuthenticated = true
    //   state.userRole = 'user'
    // })

    builder.addCase(signOutUserAPI.fulfilled, (state) => {
      state.currentUser = null
      state.isAuthenticated = false,
      state.userRole = 'guest'
    })

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const updatedUser = action.payload
      state.currentUser = updatedUser
    })
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.

// Phương: 
export const { 
  updateCurrentUser,
  updateFiledsUser
 } = userSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó
// Phương: để lấy dữ liệu từ trong redux store ra sử dụng

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

// Phương: cái này import ra để check xem người dùng có đăng nhập hay chưa dùng trong các screen hoặc Component như ContributeBlogs, ContributePlaces, Comment
export const selectIsAuthenticated = (state) => {
  return state.user.isAuthenticated
}

export const selectUserRole = (state) => {
  return state.user.userRole
}
// Phương: Export default cái userReducer của chúng ta để combineReducers trong store
export const userReducer = userSlice.reducer