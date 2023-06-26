import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getBlogAPI,
  getBlogsAPI
} from 'apis/axios/blog/get'

import {
  REDUX_SLICE_NAMES,
  BLOG_DETAILS_DATA_FIELDS,
  BRIEF_BLOG_DATA_FIELDS
} from 'utilities/constants'

import {
  briefBlogsSeletor
} from './BlogsSlice'

import {
  RequestBriefBlogsInfoProps,
  RequestBlogDetailsInfoProps,
  BriefBlogsReduxStateProps,
  BlogDataProps,
  BlogDetailsDataProps
} from 'types/index.d.ts'

export const fetchBriefBlogsByTypeAsyncThunk = createAsyncThunk(
  `${REDUX_SLICE_NAMES.BLOGS}/fetchBriefBlogsByType`,
  /**
   * @param {RequestBriefBlogsInfoProps} requestBriefBlogsInfo
   */
  async (requestBriefBlogsInfo, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { type, fields } = requestBriefBlogsInfo;
      const briefBlogsByType = briefBlogsSeletor(state, type);
      const limit = briefBlogsByType ? briefBlogsByType.limit : 5;
      const skip = briefBlogsByType ? briefBlogsByType.skip : 0;
      const query = {
        limit: limit,
        skip: skip,
        filter: `quality:${type}`,
        fields: fields,
        userId: state.user.currentUser._id
      };
      const response = await getBlogsAPI(query);
      return [type, response.data];
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const fetchBlogDetailsByIdAsyncThunk = createAsyncThunk(
  `${REDUX_SLICE_NAMES.BLOGS}/fetchBlogDetailsById`,
  /**
   * @param {RequestBlogDetailsInfoProps} requestBlogDetailsInfo 
   */
  async (requestBlogDetailsInfo, thunkAPI) => {
    try {
      const { blogId, options } = requestBlogDetailsInfo;
      const query = {
        blogId: blogId,
        fields: options.canGetFull ? "" : BLOG_DETAILS_DATA_FIELDS
      };
      const response = await getBlogAPI(query);
      return [blogId, response.data];
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const refetchBriefBlogsByTypeAsyncThunk = createAsyncThunk(
  `${REDUX_SLICE_NAMES.BLOGS}/refetchBriefBlogsByType`,
  /**
   * @param {RequestBriefBlogsInfoProps} requestBriefBlogsInfo
   */
  async (requestBriefBlogsInfo, thunkAPI) => {
    try {
      const { type, fields } = requestBriefBlogsInfo;
      const state = thunkAPI.getState();
      const limit = 5;
      const skip = 0;
      const query = {
        limit: limit,
        skip: skip,
        filter: `quality:${type}`,
        fields: fields,
        userId: state.user.currentUser._id
      };
      const response = await getBlogsAPI(query);
      return [type, response.data];
    } catch (error) {
      console.error(error.message);
    }
  }
);