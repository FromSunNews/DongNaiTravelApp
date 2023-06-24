import { createAPICaller } from "apis/axios/creator/createAPICaller";

import { API_ROOT } from "utilities/constants";

import authorizedAxiosInstance from 'axios/authorizedAxiosInstance'

export const deleteBlogCommentAPI = createAPICaller(
  `${API_ROOT}/v1/blog/delete_comment`,
  { method: "POST", axiosIntance: authorizedAxiosInstance }
);

export const deleteBlogAPI = createAPICaller(
  `${API_ROOT}/v1/blog/delete_one`,
  { method: "POST", axiosIntance: authorizedAxiosInstance }
);