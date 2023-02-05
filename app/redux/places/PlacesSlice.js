import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from 'utilities/constants'

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentPlaces: null
}

// Phương: Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// Phương: https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchPlacesAPI = createAsyncThunk(
  'places/fetchPlacesAPI',
  async () => {
    const request = await axios.get(`${API_ROOT}/v1/places`)
    return request.data
  }
)
// Phương: Khởi tạo một slice trong redux store
export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateCurrentPlaces: (state, action) => {
      const places = action.payload
      state.currentPlaces = places
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlacesAPI.fulfilled, (state, action) => {
      let places = action.payload // Phương: chính là cái request.data phía trên

      state.currentPlaces = places
    })
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateCurrentPlaces,
  // Phương
} = placesSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const selectCurrentPlaces = (state) => {
  return state.places.currentPlaces
}

// Phương: Export default cái placesReducer của chúng ta để combineReducers trong store
export const placesReducer = placesSlice.reducer