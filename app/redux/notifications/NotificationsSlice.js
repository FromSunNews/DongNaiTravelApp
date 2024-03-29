import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from 'utilities/constants'

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentNotifs: []
}
// Phương: Khởi tạo một slice trong redux store
export const notifsSlice = createSlice({
  name: 'notifs',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateCurrentNotifs: (state, action) => {
      const notifs = action.payload
      console.log('state.currentNotifs', state.currentNotifs)
      state.currentNotifs = notifs.reverse()
    },
    updateNewNotifs: (state, action) => {
      const notifs = action.payload
      state.currentNotifs.unshift(notifs)
    },
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateCurrentNotifs,
  updateNewNotifs
  // Phương
} = notifsSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const selectCurrentNotifs = (state) => {
  return state.notifs.currentNotifs
}

// Phương: Export default cái notifsReducer của chúng ta để combineReducers trong store
export const notifsReducer = notifsSlice.reducer