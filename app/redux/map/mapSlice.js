import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from 'utilities/constants'

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentMap: {
    places: [],
    routes: [],
    suggestions: [],
    mapTypes: 'standard',
    mapDetails: false,
    userLocation: null
  }
}

// Phương: Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// Phương: https://redux-toolkit.js.org/api/createAsyncThunk
// Phương: Khởi tạo một slice trong redux store
export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateCurrentMap: (state, action) => {
      const map = action.payload
      state.currentMap = map
    },
    updatePlaces: (state, action) => {
      console.log('oi r')
      const places = action.payload
      console.log("🚀 ~ file: mapSlice.js:36 ~  action.payload:",  action.payload)
      state.currentMap.places = places
    },
    updateRoutes: (state, action) => {
      const routes = action.payload
      state.currentMap.routes = routes
    },
    updateSuggestions: (state, action) => {
      const suggestions = action.payload
      state.currentMap.suggestions = suggestions
    },
    updateMapTypes: (state, action) => {
      const mapTypes = action.payload
      state.currentMap.mapTypes = mapTypes
    },
    updateMapDetails: (state, action) => {
      const mapDetails = action.payload
      state.currentMap.mapDetails = mapDetails
    },
    updateUserLocation: (state, action) => {
      const userLocation = action.payload
      state.currentMap.userLocation = userLocation
    }
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateCurrentMap,
  updatePlaces,
  updateRoutes,
  updateSuggestions,
  updateMapTypes,
  updateMapDetails,
  updateUserLocation
} = mapSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const selectCurrentMap = (state) => {
  return state.map.currentMap
}

// Phương: Export default cái mapReducer của chúng ta để combineReducers trong store
export const mapReducer = mapSlice.reducer