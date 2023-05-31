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

export const {
  useBriefBlogs,
  useBriefBlogsState,
  useBriefBlogsActions
} = (function() {
  const createBriefBlogActions = dispatch => ({
    /**
     * Hàm này dùng để update một brief blog.
     * @param {string} blogId Id của blog.
     * @param {string} typeOfBriefBlogs Loại blog.
     * @param {BlogDataProps} updateData Dữ liệu của blog, không cần thiết là phải đầy đủ các trường dữ liệu.
     * @param {number} blogIndex Index của blog trong mảng `data` của briefPlace, mặc định = 0.
     */
    updateBriefBlog: function(blogId, typeOfBriefBlogs, updateData, blogIndex = 0) {
      dispatch(updateBriefBlogState({blogId, typeOfBriefBlogs, updateData, blogIndex}));
    },
    /**
     * Hàm này dùng để tăng skip dữ liệu của một loại brief blog.
     * @param {string} typeOfBriefBlogs Loại blog.
     */
    inscreaseSkipBriefBlogsAmount: function(typeOfBriefBlogs) {
      dispatch(inscreaseSkipBriefBlogsAmountState(typeOfBriefBlogs));
    },
    /**
     * Hàm này dùng để giảm skip dữ liệu của một loại brief blog.
     * @param {string} typeOfBriefBlogs 
     */
    descreaseSkipBriefBlogsAmount: function(typeOfBriefBlogs) {
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
     * @param {string} type 
     * @param {string} fields 
     */
    fetchBriefBlogsByType: function(type, fields) {
      dispatch(fetchBriefBlogsByTypeAsyncThunk({ fields, type }));
    },
  })

  return {
    useBriefBlogs: function() {
      let blogs = useSelector(briefBlogsSeletor);
      let dispatch = useDispatch();

      let actions = createBriefBlogActions(dispatch);

      return {
        blogs,
        ...actions
      }
    },
    useBriefBlogsState: function() {
      let blogs = useSelector(briefBlogsSeletor);

      return blogs;
    },
    useBriefBlogsActions: function() {
      let dispatch = useDispatch();

      let actions = createBriefBlogActions(dispatch);

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
    fetchBlogDetailsById: function(blogId) {
      dispatch(fetchBlogDetailsByIdAsyncThunk({blogId}));
    },
  })

  return {
    useBlogDetails: function() {
      let blogDetails = useSelector(blogDetailsSelector);
      let dispatch = useDispatch();

      let actions = createBlogDetailsActions(dispatch);

      return {
        blogDetails,
        ...actions
      }
    },
    useBlogDetailsState: function() {
      let blogDetails = useSelector(blogDetailsSelector);

      return blogDetails;
    },
    useBlogDetailsActions: function() {
      let dispatch = useDispatch();

      let actions = createBlogDetailsActions(dispatch);

      return actions;
    },
  }
})();