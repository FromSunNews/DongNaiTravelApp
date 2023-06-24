import { createAPICallers } from "apis/axios/creator/createAPICallers";
import { createAPICaller } from "apis/axios/creator/createAPICaller";

import { callWithGlobalLoading } from "utilities/reduxStore";

import { API_ROOT } from "utilities/constants";

export const {
  getBlogAPI,
  getBlogsAPI,
  getBlogCommentsAPI
} = createAPICallers({
  baseUrl: `${API_ROOT}/v1/blog`,
  callers: {
    getBlogsAPI: {
      path: "/get_multiple",
      fn: async function(data, call) {
        try {
          console.log("CALLER: ", call)
          let response = await callWithGlobalLoading(async () => call(data));
          return response;
        } catch (error) {
          console.error(error.message);
        }
      }
    },
    getBlogAPI: "/get_one",
    getBlogCommentsAPI: {
      path: "/get_comments",
      method: "POST"
    }
  }
});

// let baseUrl = `${API_ROOT}/v1/blog`
// export const getBlogAPI = createAPICaller(baseUrl + "/get_one");
// export const getBlogsAPI = createAPICaller(
//   baseUrl + "/get_multiple",
//   undefined,
//   async function(data, call) {
//     try {
//       console.log("CALLER: ", call)
//       let response = await callWithGlobalLoading(async () => call(data));
//       return response;
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
// );
// export const getBlogCommentsAPI = createAPICaller(baseUrl + "/get_comments");