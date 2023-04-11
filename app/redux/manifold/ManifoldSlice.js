import { createSlice } from '@reduxjs/toolkit'

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentManifold: {
    appearNotificationBottomSheet: false,
    contentNotificationBottomSheet: '',
    isLoading: false,
    privateKeys: null
  }
}

// Phương: Khởi tạo một slice trong redux store
export const manifoldSlice = createSlice({
  name: 'manifold',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateCurrentManifold: (state, action) => {
      const manifold = action.payload
      state.currentManifold = manifold
    },
    updateNotif: (state, action) => {
      state.currentManifold.appearNotificationBottomSheet = action.payload.appearNotificationBottomSheet
      state.currentManifold.contentNotificationBottomSheet = action.payload.contentNotificationBottomSheet
    },
    updateLoading: (state, action) => {
      state.currentManifold.isLoading = action.payload
    },
    updatePrivateKeys: (state, action) => {
      state.currentManifold.privateKeys = action.payload
    }
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateCurrentManifold,
  updateLoading,
  updateNotif,
  updatePrivateKeys
  // Phương
} = manifoldSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const selectCurrentManifold = (state) => {
  return state.manifold.currentManifold
}

// Phương: Export default cái manifoldReducer của chúng ta để combineReducers trong store
export const manifoldReducer = manifoldSlice.reducer