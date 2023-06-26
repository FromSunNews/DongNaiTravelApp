import { APICallersCreatorOptions } from 'apis/axios/class/APIsOptions'

import { createAPICaller } from "./createAPICaller";

import {
  CreateAPICallersOptions,
  CreateAPICallersCaller,
  APICallers
} from 'apis/axios/types.d.ts';

let NotInOverrideOptions = ["callers", "baseUrl", "fn", "path"];

/**
 * Dùng Axios.
 * 
 * Hàm này để tạo ra các APIs, rút gọn lại quá trình tạo API cho app, đồng thời dễ quản lí hơn. Bao gồm các
 * thông số để cài đặt như là:
 * - `baseUrl`: là phần cố định của URL được dùng để xây dựng một URL hoàn chỉnh. Yêu cầu phải có.
 * - `method`: phương thức chung cho các apis khi được tạo. Mặc định là phương thức 'GET'.
 * - `headers`: là phần headers chung cho các apis. Mặc định là `headers` của axios.
 * - `axiosInstance`: là instance dùng để thực hiện việc gọi apis cùng với `method`. instance này là chung
 * cho các apis. Mặc định là `axios` của axios.
 * - `callers`: object chứa các object `CreateAPICallersCaller` hoặc là string theo dạng key-value.
 * dùng để setup các api.
 * @template CallerOptions
 * @param {CreateAPICallersOptions<CallerOptions>} options các options này sẽ được setup chung cho toàn bộ các apis.
 * @returns {APICallers<CallerOptions>}
 * 
 * @example
 * ```js
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
            let response = await callWithGlobalLoading(async () => call(data));
            return response;
          } catch (error) {
            console.error(error.message);
          }
        }
      },
      getBlogAPI: "/get_one",
      getBlogCommentsAPI: "/get_comments",
      delelteBlog: {
        path: "/delete_one",
        method: "DELETE"
      }
    }
  });
 * ```
 */
export function createAPICallers(options) {
  try {
    if(!options.baseUrl)
      throw new Error("Base URL is required.");
    if(!options.callers)
      throw new Error("Callers object is required. It's used to build apis.");
    if(Array.isArray(options.callers))
      throw new Error("Callers object is invalid. This object must be {[key: string]: CreateAPICallersCaller | string}");

    let apiOptions = new APICallersCreatorOptions(options);
    let apiCallers = {};

    for(let caller in apiOptions.callers) {
      if(Array.isArray(apiOptions.callers[caller]))
        throw new Error(`API Caller (${caller}) cannot be an Array.`);
      if(typeof apiOptions.callers[caller] === "function")
        throw new Error(`API Caller (${caller}) cannot be an Function.`);

      let url;

      if(typeof apiOptions.callers[caller] === "string") {
        url = apiOptions.getFullURL(apiOptions.callers[caller]);
        apiCallers[caller] = createAPICaller(url, {
          method: apiOptions.method,
          headers: apiOptions.headers,
          axiosInstance: apiOptions.axiosInstance
        });
        continue;
      }

      if(!apiOptions.callers[caller].path)
        throw new Error(`Path of (${caller}) is required.`);

      let callerOptions = Object.assign({}, apiOptions, apiOptions.callers[caller]);
      let callBack = apiOptions.callers[caller].fn;

      url = apiOptions.getFullURL(callerOptions.path);

      for(let notOption of NotInOverrideOptions) delete callerOptions[notOption];

      apiCallers[caller] = createAPICaller(url, callerOptions, callBack);
    }

    return apiCallers;
  } catch (error) {
    console.error("[Error] Create APIs: ", error.message);
    return undefined;
  }
}