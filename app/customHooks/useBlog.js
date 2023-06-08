import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import {
  updateUserByCaseAPI
} from 'request_api'

import {
  addBlogDetailsState,
  updateBriefBlogState,
  increaseSkipBriefBlogsAmountState,
  decreaseSkipBriefBlogsAmountState,
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
  UPDATE_USER_CASES
} from 'utilities/constants'

import {
  BlogDataProps
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
     * @param {number} blogIndex Index của blog trong mảng `data` của briefBlog, mặc định = 0.
     */
    updateBriefBlog: function(blogId, updateData, blogIndex = 0) {
      dispatch(updateBriefBlogState({blogId, typeOfBriefBlogs, updateData, blogIndex}));
    },
    /**
     * Hàm này dùng để tăng skip dữ liệu của một loại brief blog.
     */
    increaseSkip: function() {
      dispatch(increaseSkipBriefBlogsAmountState(typeOfBriefBlogs));
    },
    /**
     * Hàm này dùng để giảm skip dữ liệu của một loại brief blog.
     */
    decreaseSkip: function() {
      dispatch(decreaseSkipBriefBlogsAmountState(typeOfBriefBlogs));
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
     * @param {BlogDataProps} blog Dữ liệu chi tiết của blog (có thể không)
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

/**
 * Hook này tạo ra các functions cho việc tương tác với Blog, còn ý tưởng như nào thì ae sang đọc file
 * `useBlog`, t cũng có để ở đó rồi.
 * @param {BlogDataProps} blog Dữ liệu của blog.
 * @returns
 * @example
 * ...
 * import { useBlogInteractionAPI } from 'customHooks/useBlog'
 * 
 * function MyComponent({blog, blogIndex}) {
 *   // Ta có likeBlog là 1 interact action
 *   let { extendedBlogInfo, likeBlog } = useBlogInteractionAPI(blog);
 * 
 *   let handleLikeButton = () => likeBlog(
 *     // Hàm này sẽ được gọi khi 
 *     (data, state) => updateBlogDetail(blog.blog_id, blogIndex, { isLiked: state }),
 *     (state) => updateBlogDetail(blog.blog_id, blogIndex, { isLiked: state })
 *   )
 * }
 * ...
 */
export function useBlogInteractionActions(blog) {
  const [extendedBlogInfo, setExtendedBlogInfo] = React.useState({
    isLiked: blog.isLiked ? true : false
  });

  const createToggleInteractionActionsFunc = React.useCallback(
    /**
     * @param {"isLiked"} toggleInteraction
     * @param {string} updateCaseWhenActive 
     * @param {string} updateCaseWhenInActive 
     * @returns 
     */
    (toggleInteraction, updateCaseWhenActive, updateCaseWhenInActive) => {
      /**
       * @param {(data: any, state: boolean) => {}} callWhenAPIResolve Callback gọi khi API resolve
       * @param {(state: boolean) => {}} callWhenAPIReject Callback gọi khi API reject
       */
      return function(callWhenAPIResolve, callWhenAPIReject) {
        setExtendedBlogInfo(prevState => {
          let state = true;
          let updateCase = updateCaseWhenActive;
          if(prevState[toggleInteraction]) {
            state = false;
            updateCase = updateCaseWhenInActive;
          }
          let data = {
            updateCase: updateCase,
            updateData: blog._id
          }
          updateUserByCaseAPI(data)
          .then(data => {
            // Update lên store.
            if(callWhenAPIResolve) callWhenAPIResolve(data, state)
          })
          .catch(error => {
            if(callWhenAPIReject) callWhenAPIReject(!state)
            setExtendedBlogInfo(prevState => ({...prevState, [toggleInteraction]: !state}))
            console.error(error.message)
          })
          return {...prevState, [toggleInteraction]: state}
        })
      }
  }, [])

  /**
   * Hàm này dùng để yêu thích một blog, nó sẽ gửi id của blog về server và tự server nó sẽ xử lý.
   */
  const { likeBlog } = React.useMemo(() => ({
    /**
     * Hàm này dùng để yêu thích/bỏ yêu thích một địa điểm nào đó. Nhận vào hai tham số là
     * `callWhenAPIResolve` và `callWhenAPIReject`
     */
    likeBlog: createToggleInteractionActionsFunc("isLiked", UPDATE_USER_CASES["addEle:savedBlogs"], UPDATE_USER_CASES["removeEle:savedBlogs"]),
  }), [])

  React.useEffect(() => {
    // console.log("Isliked from blog: ", Boolean(blog.isLiked));
    if(Boolean(blog.isLiked) !== extendedBlogInfo.isLiked) {
      setExtendedBlogInfo(prevState => ({...prevState, isLiked: Boolean(blog.isLiked)}))
    }
  }, [blog.isLiked, blog.isVisited]);

  return {
    extendedBlogInfo,
    likeBlog
  }
}