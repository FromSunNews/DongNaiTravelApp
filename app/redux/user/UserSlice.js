import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_ROOT } from 'utilities/constants'


// Phương: Khởi tạo giá trị một giá trị của Slice trong Redux
const initialState = {
  currentUser: null,
  isAuthenticated: false
}

// Phương: Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// Phương: https://redux-toolkit.js.org/api/createAsyncThunk
export const signInUserAPI = createAsyncThunk(
  'user/signInUserAPI',
  async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/users/sign_in`, data)
    return request.data
  }
)

export const signOutUserAPI = createAsyncThunk(
  'user/signOutUserAPI',
  async (showSuccessMessage = true) => {
    const request = await axios.delete(`${API_ROOT}/v1/users/sign_out`)
    if (showSuccessMessage) {
      toast.success('User signed out successfully!', { theme: 'colored' })
    }
    return request.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async ( data ) => {
    const request = await axios.put(`${API_ROOT}/v1/users/update`, data)
    if (request.data) {
      toast.success('Updated successfully!', { theme: 'colored' })
    }
    return request.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Phương:
  },
  extraReducers: (builder) => {
    builder.addCase(signInUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
      state.isAuthenticated = true
    })

    builder.addCase(signOutUserAPI.fulfilled, (state) => {
      state.currentUser = null
      state.isAuthenticated = false
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

// Phương: export const {  } = activeBoardSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó
// Phương: để lấy dữ liệu từ trong redux store ra sử dụng

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

// Phương: cái này import ra để check xem người dùng có đăng nhập hay chưa dùng trong các screen hoặc Component như ContributeBlogs, ContributePlaces, Comment
export const selectIsAuthenticated = (state) => {
  return state.user.isAuthenticated
}
// Phương: Export default cái userReducer của chúng ta để combineReducers trong store
export const userReducer = userSlice.reducer