import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import NumberUtility from 'utilities/number'
import {
  API_ROOT,
  REDUX_SLICE_NAMES
} from 'utilities/constants'

import {
  fetchBlogDetailsByIdAsyncThunk,
  fetchBriefBlogsByTypeAsyncThunk
} from './BlogsAsyncThunks.js'

import {
  BriefBlogsReduxStateProps,
  BlogDataProps,
  BlogDetailsDataProps
} from 'types/index.d.ts'

/**
 * Hàm này dùng để tạo ra các Brief Blog khác nhau, tránh các type dùng chung với nhau.
 * @param {number} limit 
 * @param {number} skip 
 * @returns {BriefBlogsReduxStateProps}
 */
function createDefaultBriefBlog(limit = 5, skip = 0) {
  return {
    limit: limit,
    skip: skip,
    data: []
  }
}

/**
 * @type {{blogDetailsList: {[key: string]: BlogDetailsDataProps}, briefBlogs: {[key: string]: BlogDataProps}}}
 */
const initialState = {
  blogDetailsList: {},
  briefBlogs: {}
}

export const fetchBlogsAPI = createAsyncThunk(
  'blogs/fetchBlogsAPI',
  async () => {
    const request = await axios.get(`${API_ROOT}/v1/blogs`)
    return request.data
  }
)
// Phương: Khởi tạo một slice trong redux store
export const blogsSlice = createSlice({
  name: REDUX_SLICE_NAMES.BLOGS,
  initialState,
  reducers: {
    /**
     * Action này dùng để thêm một thông tin của blog vào blog details list, thường thì được thêm từ một briefblog.
     * @param state 
     * @param {{type: string, payload: BlogDetailsDataProps}} action 
     */
    addBlogDetailsState: (state, action) => {
      const blogDetails = action.payload;
      if(!state.blogDetailsList[blogDetails._id]) state.blogDetailsList[blogDetails._id] = blogDetails;
    },
    /**
     * Action này dùng để update một brief blog theo `_id`.
     * @param state 
     * @param {{type: string, payload: { blogId: string, blogIndex?: string, typeOfBriefBlogs: string, updateData: BlogDataProps }}} action 
     */
    updateBriefBlogState: (state, action) => {
      let {blogId, blogIndex, typeOfBriefBlogs, updateData} = action.payload;
      if(state.briefBlogs[typeOfBriefBlogs]) {
        let sliceOfBriefBlogs = state.briefBlogs[typeOfBriefBlogs].data.slice(blogIndex);
        let newBlogIndex = sliceOfBriefBlogs.findIndex(briefBlog => briefBlog._id === blogId);
        let blog = state.briefBlogs[typeOfBriefBlogs].data[newBlogIndex];
        if(blog) state.briefBlogs[typeOfBriefBlogs].data[newBlogIndex] = Object.assign({}, blog, updateData);
      }
    },
    /**
     * Action này dùng để tăng skip của một loại brief blogs
     * @param state 
     * @param {{type: string, payload: string}} action 
     */
    inscreaseSkipBriefBlogsAmountState: (state, action) => {
      const typeOfBriefBlogs = action.payload;
      state.briefBlogs[typeOfBriefBlogs].skip += state.briefBlogs[typeOfBriefBlogs].limit;
    },
    /**
     * Action này dùng để giảm skip của một loại brief blogs. Tránh giảm quá 0.
     * @param state 
     * @param {{type: string, payload: string}} action 
     */
    descreaseSkipBriefBlogsAmountState: (state, action) => {
      const typeOfBriefBlogs = action.payload;
      state.briefBlogs[typeOfBriefBlogs].skip = NumberUtility.descreaseByAmount(
        state.briefBlogs[typeOfBriefBlogs].skip,
        state.briefBlogs[typeOfBriefBlogs].limit
      )
    },
    /**
     * Action này dùng để clear all state của blog
     * @param state 
     * @param action 
     */
    clearAllBriefBlogsState: (state, action) => {
      state.briefBlogs = {}
    },
    /**
     * Action này dùng để clear all state của blog details
     * @param state 
     * @param action 
     */
    clearBlogDetailsState: (state, action) => {
      let blogId = action.payload;
      if(state.blogDetailsList[blogId]) {
        state.blogDetailsList[blogId] = {}
        delete state.blogDetailsList[blogId]
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBriefBlogsByTypeAsyncThunk.fulfilled, (state, action) => {
      let [typeOfBriefBlogs, briefBlogs] = action.payload;

      if(!state.briefBlogs[typeOfBriefBlogs]) {
        state.briefBlogs[typeOfBriefBlogs] = createDefaultBriefBlog();
      }

      if(briefBlogs.length === 0) {
        state.briefBlogs[typeOfBriefBlogs].skip = NumberUtility.descreaseByAmount(
          state.briefBlogs[typeOfBriefBlogs].skip,
          state.briefBlogs[typeOfBriefBlogs].limit
        )
      }
      state.briefBlogs[typeOfBriefBlogs].data.push(...briefBlogs);
    }),

    builder.addCase(fetchBlogDetailsByIdAsyncThunk.fulfilled, (state, action) => {
      let [blogId, blogDetails] = action.payload;

      state.blogDetailsList[blogId] = Object.assign({}, state.blogDetailsList[blogId], blogDetails)
    })
  }
})

export const { 
  addBlogDetailsState,
  updateBriefBlogState,
  inscreaseSkipBriefBlogsAmountState,
  descreaseSkipBriefBlogsAmountState,
  clearAllBriefBlogsState,
  clearBlogDetailsState,

  // Phương
} = blogsSlice.actions

/**
 * Select tất cả thông tin của briefblogs theo type.
 * @param state 
 * @param {string} typeOfBriefBlogs 
 * @returns {BriefBlogsReduxStateProps}
 */
export const briefBlogsSeletor = (state, typeOfBriefBlogs) => {
  // if(!state[REDUX_SLICE_NAMES.BLOGS].briefBlogs[typeOfBriefBlogs]) return undefined;
  return state[REDUX_SLICE_NAMES.BLOGS].briefBlogs[typeOfBriefBlogs];
}

/**
 * Select blog details hiện tại.
 * @param state 
 * @returns {BriefBlogsReduxStateProps}
 */
export const blogDetailsSelector = (state, blogId) => {
  return state[REDUX_SLICE_NAMES.BLOGS].blogDetailsList[blogId];
}

export const blogsReducer = blogsSlice.reducer