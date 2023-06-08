import { createAsyncThunk } from '@reduxjs/toolkit'
import { COMPLETE_PLACE_DETAILS_DATA_FIELDS } from 'utilities/constants'

import {
  getPlacesAPI,
  getPlaceDetailsWithPipelineAPI
} from 'request_api'

import {
  PLACE_DETAILS_DATA_FIELDS
} from 'utilities/constants'

import {
  RequestBriefPlacesInfoProps,
  RequestPlaceDetailsInfoProps
} from 'types/index.d.ts'

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
      const briefPlacesByType = state.places.briefPlaces[type];
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
      const { placeId, options } = requestPlaceDetailsInfo;
      const fields = options.canGetFull
        ? ``
        : options.canGetComplete
          ? `&fields=${COMPLETE_PLACE_DETAILS_DATA_FIELDS}`
          : `&fields=${PLACE_DETAILS_DATA_FIELDS}`
      const query = `placeId=${placeId}&lang=${options.lang}` + fields;
      const data = await getPlaceDetailsWithPipelineAPI(query);
      return [placeId, data];
    } catch (error) {
      console.error(error.message);
    }
  }
)

export const refetchBriefPlaceByTypeAsyncThunk = createAsyncThunk(
  'places/refetchBriefPlaceByType',
  async (requestBriefPlacesInfo) => {
    try {
      const { type, fields } = requestBriefPlacesInfo;
      const limit = 5;
      const skip = 0;
      const query = `limit=${limit}&skip=${skip}&filter=quality:${type}&fields=${fields}`;
      const data = await getPlacesAPI(query);
      return [type, data];
    } catch (error) {
      console.error(error.message);
    }
  }
);