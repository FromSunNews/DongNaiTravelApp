import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  REDUX_SLICE_NAMES
} from 'utilities/constants'

import {
  RequestBriefBlogsInfoProps,
  RequestBlogDetailsInfoProps,
  BriefBlogsReduxStateProps,
  BlogDataProps,
  BlogDetailsDataProps
} from 'types/index.d.ts'

export const fetchBriefBlogsByTypeAsyncThunk = createAsyncThunk(
  `${REDUX_SLICE_NAMES.BLOGS}/fetchBriefBlogsByTypeAsyncThunk`,
  /**
   * @param {RequestBriefBlogsInfoProps} requestBriefPlacesInfo
   */
  async (requestBriefPlacesInfo, thunkAPI) => {
    try {
      
    } catch (error) {
      
    }
  }
);

export const fetchBlogDetailsByIdAsyncThunk = createAsyncThunk(
  `${REDUX_SLICE_NAMES.BLOGS}/fetchBlogDetailsByIdAsyncThunk`,
  /**
   * @param {RequestBlogDetailsInfoProps} requestPlaceDetailsInfo 
   */
  async (requestPlaceDetailsInfo, thunkAPI) => {
    try {
      
    } catch (error) {
      
    }
  }
);