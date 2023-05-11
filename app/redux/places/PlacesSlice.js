import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from 'utilities/constants'

import {
  getPlacesAPI,
  getPlaceDetailsWithPipelineAPI
} from 'request_api'

import {
  PLACE_DETAILS_DATA_FIELDS
} from 'utilities/constants'

import {
  RequestBriefPlacesInfoProps,
  RequestPlaceDetailsInfoProps,
  BriefPlacesDataProps,
  PlaceDataProps,
  PlaceDetailsDataProps
} from 'types/index.d.ts'

/**
 * Hàm này tính toán việc giảm dữ liệu đi ở một mức nào đó.
 * Tránh việc giảm về quá 0.
 * @param {number} value Số cần giảm
 * @param {number} amount Lượng cần giảm
 * @returns 
 */
function descreaseByAmount(value, amount) {
  let afterDescrease = value - amount;
  if(afterDescrease >= amount) value -= amount;
  else value = 0;
  return value;
}

/**
 * Hàm này dùng để tạo ra các Brief Place khác nhau, tránh các type dùng chung với nhau.
 * @param {number} limit 
 * @param {number} skip 
 * @returns {BriefPlacesDataProps}
 */
function createDefaultBriefPlace(limit = 5, skip = 0) {
  return {
    limit: limit,
    skip: skip,
    data: []
  }
}

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState = {
  placeDetailsList: {},
  briefPlaces: {}
}

// Phương: Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// Phương: https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchBriefPlacesByTypeAsyncThunk = createAsyncThunk(
  'places/fetchPlacesByType',
  /**
   * @param {RequestBriefPlacesInfoProps} requestBriefPlacesInfo
   * @returns 
   */
  async (requestBriefPlacesInfo, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { type, fields } = requestBriefPlacesInfo;
      const briefPlacesByType = briefPlacesSeletor(state, type);
      const limit = briefPlacesByType ? briefPlacesByType.limit : 5;
      const skip = briefPlacesByType ? briefPlacesByType.skip : 0;
      const query = `limit=${limit}&skip=${skip}&filter=quality:${type}&fields=${fields}`;
      const data = await getPlacesAPI(query);
    return [type, data];
    } catch (error) {
      console.error(error.message);
    }
  }
)

export const fetchPlaceDetailsByIdAsyncThunk = createAsyncThunk(
  'places/fetchPlaceDetailsById',
  /**
   * @param {RequestPlaceDetailsInfoProps} requestPlaceDetailsInfo 
   * @param thunkAPI 
   */
  async (requestPlaceDetailsInfo, thunkAPI) => {
    try {
      const { placeId, lang } = requestPlaceDetailsInfo;
      const query = `placeId=${placeId}&fields=${PLACE_DETAILS_DATA_FIELDS}&lang=${lang}`;
      const data = await getPlaceDetailsWithPipelineAPI(query);
      return [placeId, data];
    } catch (error) {
      console.error(error.message);
    }
  }
)

// Phương: Khởi tạo một slice trong redux store
export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    /**
     * Action này dùng để thêm một thông tin của place vào place details list, thường thì được thêm từ một briefplace.
     * @param state 
     * @param {{type: string, payload: PlaceDetailsDataProps}} action 
     */
    addPlaceDetailsState: (state, action) => {
      const placeDetails = action.payload;
      if(!state.placeDetailsList[placeDetails.place_id]) state.placeDetailsList[placeDetails.place_id] = placeDetails;
    },
    /**
     * Action này dùng để update một brief place theo `place_id`.
     * @param state 
     * @param {{type: string, payload: { placeId: string, typeOfBriefPlaces: string, updateData: PlaceDataProps }}} action 
     */
    updateBriefPlaceState: (state, action) => {
      let {placeId, placeIndex, typeOfBriefPlaces, updateData} = action.payload;
      if(state.briefPlaces[typeOfBriefPlaces]) {
        let sliceOfBriefPlaces = state.briefPlaces[typeOfBriefPlaces].data.slice(placeIndex);
        let place = sliceOfBriefPlaces.find(briefPlace => briefPlace.place_id === placeId);
        if(place) state.briefPlaces[typeOfBriefPlaces].data[placeIndex] = Object.assign({}, place, updateData);
      }
    },
    /**
     * Action này dùng để tăng skip của một loại brief places
     * @param state 
     * @param action 
     */
    inscreaseSkipBriefPlacesAmountState: (state, action) => {
      const typeOfBriefPlaces = action.payload;
      state.briefPlaces[typeOfBriefPlaces].skip += state.briefPlaces[typeOfBriefPlaces].limit;
    },
    /**
     * Action này dùng để giảm skip của một loại brief places. Tránh giảm quá 0.
     * @param state 
     * @param action 
     */
    descreaseSkipBriefPlacesAmountState: (state, action) => {
      const typeOfBriefPlaces = action.payload;
      state.briefPlaces[typeOfBriefPlaces].skip = descreaseByAmount(
        state.briefPlaces[typeOfBriefPlaces].skip,
        state.briefPlaces[typeOfBriefPlaces].limit
      )
    },
    /**
     * Action này dùng để clear all state của place
     * @param state 
     * @param action 
     */
    clearAllBriefPlacesState: (state, action) => {
      state.briefPlaces = {}
    },
    /**
     * Action này dùng để clear all state của place details
     * @param state 
     * @param action 
     */
    clearPlaceDetailsState: (state, action) => {
      let placeId = action.payload;
      if(state.placeDetailsList[placeId]) {
        state.placeDetailsList[placeId] = {}
        delete state.placeDetailsList[placeId]
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBriefPlacesByTypeAsyncThunk.fulfilled, (state, action) => {
      let [typeOfBriefPlaces, briefPlaces] = action.payload;

      if(!state.briefPlaces[typeOfBriefPlaces]) {
        state.briefPlaces[typeOfBriefPlaces] = createDefaultBriefPlace();
      }

      if(briefPlaces.length === 0) {
        state.briefPlaces[typeOfBriefPlaces].skip = descreaseByAmount(
          state.briefPlaces[typeOfBriefPlaces].skip,
          state.briefPlaces[typeOfBriefPlaces].limit
        )
      }
      state.briefPlaces[typeOfBriefPlaces].data.push(...briefPlaces);
    }),

    builder.addCase(fetchPlaceDetailsByIdAsyncThunk.fulfilled, (state, action) => {
      let [placeId, placeDetails] = action.payload;

      state.placeDetailsList[placeId] = Object.assign({}, state.placeDetailsList[placeId], placeDetails)
    })
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const {
  addPlaceDetailsState,
  inscreaseSkipBriefPlacesAmountState,
  descreaseSkipBriefPlacesAmountState,
  updateBriefPlaceState,
  clearAllBriefPlacesState,
  clearPlaceDetailsState
  // Phương
} = placesSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
/**
 * Select tất cả thông tin của briefplaces theo type.
 * @param state 
 * @param {string} typeOfBriefPlaces 
 * @returns {BriefPlacesDataProps}
 */
export const briefPlacesSeletor = (state, typeOfBriefPlaces) => {
  // if(!state.places.briefPlaces[typeOfBriefPlaces]) return undefined;
  return state.places.briefPlaces[typeOfBriefPlaces];
}

/**
 * Select place details hiện tại.
 * @param state 
 * @returns {PlaceDataProps}
 */
export const placeDetailsSelector = (state, placeId) => {
  return state.places.placeDetailsList[placeId];
}

// Phương: Export default cái placesReducer của chúng ta để combineReducers trong store
export const placesReducer = placesSlice.reducer