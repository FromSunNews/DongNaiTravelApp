import { ConfigureGetBlogAPI } from 'apis/axios/blog/methods/getBlog'
import { ConfigureGetBlogsAPI } from 'apis/axios/blog/methods/getBlogs'
import { ConfigureGetBlogCommentsAPI } from './methods/getBlogComments'
import { ConfigureCreateBlogCommentAPI } from './methods/createBlogComment'

import authorizedAxiosInstance from 'axios/authorizedAxiosInstance'

import {
  injectStore
} from 'utilities/reduxStore'

import {
  API_ROOT
} from 'utilities/constants'

import {
  createNewAPIsOptions
} from 'apis/axios/utils'

let routeName = 'blog'

export const getBlogAPI = ConfigureGetBlogAPI(
  createNewAPIsOptions({
    routeName,
    endpoint: '/get_one'
  })
);
export const getBlogsAPI = ConfigureGetBlogsAPI(
  createNewAPIsOptions({
    routeName,
    endpoint: '/get_multiple'
  })
);
export const getBlogCommentsAPI = ConfigureGetBlogCommentsAPI(
  createNewAPIsOptions({
    routeName,
    endpoint: '/get_comments'
  })
)
export const createBlogCommentAPI = ConfigureCreateBlogCommentAPI(
  createNewAPIsOptions({
    routeName,
    endpoint: '/create_comment',
    axiosInstance: authorizedAxiosInstance
  })
)