import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT, FilterConstants } from 'utilities/constants'

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentFilter: {
    category: FilterConstants.categories.ALL_CATEGORIES,
    sortBy: FilterConstants.sortBy[0].id,
    priceLevels: [0, 5],
    radius: '5000',
    location: null
  }
}

// Phương: Khởi tạo một slice trong redux store
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateCurrentFilter: (state, action) => {
      const filter = action.payload
      state.currentFilter = filter
    },
    category: (state, action) => {
      const category = action.payload
      state.currentFilter.category = category
    },
    updateSortBy: (state, action) => {
      const sortById = action.payload
      state.currentFilter.sortBy = sortById
    },
    updatePriceLevels: (state, action) => {
      const priceLevels = action.payload
      state.currentFilter.priceLevels = priceLevels
    },
    updateRadius: (state, action) => {
      const radius = action.payload
      state.currentFilter.radius = radius
    },
    resetFilter: (state) => {
      state.currentFilter = {
        category: FilterConstants.categories.ALL_CATEGORIES,
        sortBy: FilterConstants.sortBy[0].id,
        priceLevels: [0, 5],
        radius: '5000',
        location: null
      }
      
      console.log('reset filter', state.currentFilter)
    }
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateCurrentFilter,
  updateCategories,
  updateSortBy,
  updatePriceLevels,
  updateRadius,
  resetFilter
} = filterSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const selectCurrentFilter = (state) => {
  return state.filter.currentFilter
}

// Phương: Export default cái filterReducer của chúng ta để combineReducers trong store
export const filterReducer = filterSlice.reducer