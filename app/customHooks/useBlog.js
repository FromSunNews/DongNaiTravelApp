import { useDispatch, useSelector } from "react-redux";

import {
  addBlogDetailsState,
  updateBriefBlogState,
  inscreaseSkipBriefBlogsAmountState,
  descreaseSkipBriefBlogsAmountState,
  clearAllBriefBlogsState,
  clearBlogDetailsState,
  blogDetailsSelector,
  briefBlogsSeletor
} from 'redux/blogs/BlogsSlice'

import {
  fetchBlogDetailsByIdAsyncThunk,
  fetchBriefBlogsByTypeAsyncThunk
} from 'redux/blogs/BlogsAsyncThunks'

import {
  BlogDetailsDataProps
} from 'types/index.d.ts'

export const {
  useBriefBlogs,
  useBriefBlogsState,
  useBriefBlogsActions
} = (function() {
  const createBriefBlogActions = (dispatch, typeOfBriefBlogs)  => ({
    /**
     * Hàm này dùng để update một brief blog.
     * @param {string} blogId Id của blog.
     * @param {string} typeOfBriefBlogs Loại blog.
     * @param {BlogDataProps} updateData Dữ liệu của blog, không cần thiết là phải đầy đủ các trường dữ liệu.
     * @param {number} blogIndex Index của blog trong mảng `data` của briefPlace, mặc định = 0.
     */
    updateBriefBlog: function(blogId, updateData, blogIndex = 0) {
      dispatch(updateBriefBlogState({blogId, typeOfBriefBlogs, updateData, blogIndex}));
    },
    /**
     * Hàm này dùng để tăng skip dữ liệu của một loại brief blog.
     */
    inscreaseSkip: function() {
      dispatch(inscreaseSkipBriefBlogsAmountState(typeOfBriefBlogs));
    },
    /**
     * Hàm này dùng để giảm skip dữ liệu của một loại brief blog.
     */
    descreaseSkip: function() {
      dispatch(descreaseSkipBriefBlogsAmountState(typeOfBriefBlogs));
    },
    /**
     * Hàm này dùng để clear dữ liệu của brief blog.
     */
    clearAllBriefBlogs: function() {
      dispatch(clearAllBriefBlogsState);
    },
    /**
     * Hàm này dùng để lấy dữ liệu của brief blog.
     * @param {string} fields 
     */
    fetchBriefBlogsByType: function(fields) {
      dispatch(fetchBriefBlogsByTypeAsyncThunk({ fields, type: typeOfBriefBlogs }));
    },
  })

  return {
    useBriefBlogs: function(typeOfBriefBlogs) {
      let blogs = useSelector(state => briefBlogsSeletor(state, typeOfBriefBlogs));
      let dispatch = useDispatch();

      let actions = createBriefBlogActions(dispatch, typeOfBriefBlogs);

      return {
        blogs,
        ...actions
      }
    },
    useBriefBlogsState: function(typeOfBriefBlogs) {
      let blogs = useSelector(state => briefBlogsSeletor(state, typeOfBriefBlogs));

      return blogs;
    },
    useBriefBlogsActions: function(typeOfBriefBlogs) {
      let dispatch = useDispatch();

      let actions = createBriefBlogActions(dispatch, typeOfBriefBlogs);

      return actions;
    },
  }
})();

export const {
  useBlogDetails,
  useBlogDetailsState,
  useBlogDetailsActions
} = (function() {
  const createBlogDetailsActions = dispatch => ({
    clearBlogDetails: function(blogId) {
      dispatch(clearBlogDetailsState(blogId));
    },
    /**
     * Hàm này dùng để lấy dữ liệu của blog tuỳ theo `options`
     * @param {string} blogId Id của blog details
     * @param {{canGetFull: boolean | undefined}} options Options cho dữ liệu trả về của blog.
     */
    fetchBlogDetailsById: function(blogId, options) {
      dispatch(fetchBlogDetailsByIdAsyncThunk({blogId, options}));
    },
    /**
     * Hàm này dùng để thêm dữ liệu chi tiết của một blog.
     * @param {BlogDetailsDataProps} blog Dữ liệu chi tiết của blog (có thể không)
     */
    addBlogDetails: function(blog) {
      dispatch(addBlogDetailsState(blog))
    }
  })

  return {
    useBlogDetails: function(blogId) {
      let blogDetails = useSelector(state => blogDetailsSelector(state, blogId));
      let dispatch = useDispatch();

      let actions = createBlogDetailsActions(dispatch);

      return {
        blogDetails,
        ...actions
      }
    },
    useBlogDetailsState: function(blogId) {
      let blogDetails = useSelector(state => blogDetailsSelector(state, blogId));

      return blogDetails;
    },
    useBlogDetailsActions: function() {
      let dispatch = useDispatch();

      let actions = createBlogDetailsActions(dispatch);

      return actions;
    },
  }
})();