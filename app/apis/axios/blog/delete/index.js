import { createAPICaller } from "apis/axios/creator/createAPICaller";

import authorizedAxiosInstance from 'axios/authorizedAxiosInstance'

import { injectedStore } from "utilities/reduxStore";
import { API_ROOT } from "utilities/constants";


export const deleteBlogCommentAPI = createAPICaller(
  `${API_ROOT}/v1/blog/delete_comment`,
  { method: "DELETE", axiosIntance: authorizedAxiosInstance },
  async function(data, call) {
    try {
      let accessToken = injectedStore.getState().user.currentUser.accessToken;
      data.accessToken = accessToken;
      console.log("Data: ", data);
      return call(data);
    } catch (error) {
      console.error(error.message);
      return Promise.reject(undefined);
    }
  }
);

export const deleteBlogAPI = createAPICaller(
  `${API_ROOT}/v1/blog/delete_one`,
  { method: "DELETE", axiosIntance: authorizedAxiosInstance }
);