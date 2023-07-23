import { createAPICallers } from "apis/axios/creator/createAPICallers";

import { API_ROOT } from "utilities/constants";

export const {
  createTTSAsync
} = createAPICallers({
  baseUrl: `${API_ROOT}/v1/content`,
  callers: {
    createTTSAsync: {
      method: "POST",
      path: "/create_tts"
    }
  }
});