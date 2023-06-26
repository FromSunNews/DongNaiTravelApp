import axios, { AxiosHeaders, AxiosResponse, AxiosRequestConfig } from 'axios';

import {
  APIOptionsProps
} from 'apis/axios/types.d.ts'

/**
 * Bởi vì `options` của `createAPICaller` là `APIOptions`, nên sẽ có một số thuộc tính sau
 * - `headers`
 * - `axiosInstance`
 * - `baseUrl`
 * - `method`
 */
const InitialValueOptions = [
  {name: "headers", initialValue: {}},
  {name: "axiosInstance", initialValue: axios},
  {name: "method", initialValue: "GET"}
];

/**
 * Hàm này dùng sẽ kiểm tra API options. Nếu như thuộc tính nào thiếu thì sẽ
 * tạo mặc định
 * @param {APIOptionsProps} options API options cần được validate.
 */
function validateOptions(options) {
  if(!options) options = {};
  for(let initialValueOption of InitialValueOptions) {
    if(!options[initialValueOption.name]) options[initialValueOption.name] = initialValueOption.initialValue;
  }
  return options;
}

/**
 * Hàm này dùng để tạo ra một function để gọi api. Với mục đích là làm tối giản việc setup api và
 * quản lý api dễ hơn. Nhận 3 tham số
 * - `url`: toàn bộ url để request.
 * - `options`: là `APIOptions`.
 * - `callBack`: dùng để tiếp cận và xử lý việc gọi api. Hàm này sẽ nhận hai tham số
 *   - `data`: là dữ liệu người dùng truyền vào.
 *   - `call`: chính là hàm gọi api.
 * @param {string} url 
 * @param {APIOptionsProps} options options cho apis.
 * @param {(data: any, call: (data: any) => Promise<AxiosResponse>) => Promise<AxiosResponse | any>} callBack hàm này dùng để ghi đè api.
 * 
 * @example
 * ```js
  let baseUrl = `${API_ROOT}/v1/blog`
  export const getBlogAPI = createAPICaller(baseUrl + "/get_one");
  export const getBlogsAPI = createAPICaller(
    baseUrl + "/get_multiple",
    undefined,
    async function(data, call) {
      try {
        let response = await callWithGlobalLoading(async () => call(data));
        return response;
      } catch (error) {
        console.error(error.message);
      }
    }
  );
  export const getBlogCommentsAPI = createAPICaller(baseUrl + "/get_comments");
 * ```
 */
export function createAPICaller(url, options, callBack) {
  try {
    if(!url) throw new Error("URL is required.");

    options = validateOptions(options);

    let call = function(data, headers) {
      try {
        headers = headers ? Object.assign(options.headers, headers) : options.headers;
        console.log("Query: ", data);
        return options
          .axiosInstance
          .get(url, {
            headers: headers,
            params: data
          });
      } catch (error) {
        console.error(error.message);
      }
    };
    
    if(options.method !== "GET") {
      call = function(data, headers) {
        headers = headers ? Object.assign(options.headers, headers) : options.headers;
        return options.axiosInstance[options.method.toLowerCase()](
          url,
          data,
          {
            headers: headers
          }
        )
      }
    }

    console.log("OPTIONS: ", options);
    console.log("CALLER: ", call);

    /**
     * Request dữ liệu từ server. Khi tạo api caller với
     * @param {string | {[key: string]: any}} data dữ liệu cần chuyển tới server, có thể là một string (nếu method = "GET").
     * @param {AxiosHeaders} headers headers ghi đè cho api call.
     */
    return function(data, headers) {
      try {
        if(typeof data === "string" && options.method === "GET")
          throw new Error("Only use `data` as string with METHOD:GET.");
        return callBack ? callBack(data, call) : call(data, headers);
      } catch (error) {
        return Promise.reject(undefined);
      }
    };
  } catch (error) {
    console.error("[Error] Create API: ", error.message);
    return undefined;
  }
}