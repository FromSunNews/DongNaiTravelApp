import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from 'utilities/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState = {
  emailName: null,
  password: null,
  isFirstTimeLaunch: true
}

// Phương: Khởi tạo một slice trong redux store
export const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateCurrentWareHouseState: (state, action) => {
      const newData = action.payload
      state = {...state, ...newData}
    }
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateCurrentWareHouseState,
  // Phương
} = warehouseSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const selectCurrentWareHouse = (state) => {
  return state.warehouse
}

export const isFirstTimeLaunchSelector = state => {
  return state.warehouse.isFirstTimeLaunch
}

export const rememberdAccountSelector = state => {
  return {emailName: state.warehouse.emailName, password: state.warehouse.password}
}

// Phương: Export default cái warehouseReducer của chúng ta để combineReducers trong store
export const warehouseReducer = warehouseSlice.reducer