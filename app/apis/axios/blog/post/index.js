import { createAPICallers } from "apis/axios/creator/createAPICallers";

import { API_ROOT } from "utilities/constants";

export const {
  createBlogCommentAPI
} = createAPICallers({
  baseUrl: `${API_ROOT}/v1/blog`,
  method: "POST",
  callers: {
    createBlogCommentAPI: "/create_comment"
  }
})