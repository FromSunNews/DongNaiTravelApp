import axios, { AxiosInstance, AxiosHeaders } from "axios"

import FunctionsUtility from "utilities/functions";

import {
  APIOptionsProps,
  CreateAPICallersOptions,
  CreateAPICallersCaller
} from "apis/axios/types.d.ts";

let reg = /(?:^\/){0,1}(.+)/

/**
 * Class này dùng để tạo ra các API options. Đồng thời sẽ có vài phương thức
 * để thao tác với các thuộc tính.
 * 
 * Các instance của `APIsOptions` chứa các thuộc tính mặc định, còn tuỳ vào các hàm tạo api(s)
 * thì sẽ có thêm thuộc tính khác. Các thuộc tính đấy là
 * - `axiosInstance`
 * - `baseUrl`
 * - `headers`
 * - `method`
 */
export class APIsOptions {
  /**
   * @type {AxiosInstance}
   */
  axiosInstance = axios;
  /**
   * @type {AxiosHeaders}
   */
  headers = {};
  /**
   * @type {string}
   */
  method = "GET";

  /**
   * @param {APIOptionsProps} initialOptions
   */
  constructor(initialOptions) {
    for(let prop in this) {
      if(initialOptions[prop]) {
        this[prop] = initialOptions[prop];
      }
    };
    
    FunctionsUtility.autoBind(this, {
      protoProps: Object.getOwnPropertyNames(Object.getPrototypeOf(this))
    });
  }

  /**
   * Dùng để tạo ra một URL hoàn chỉnh `baseUrl` và `path`
   * @param {string} path
   */
  getFullURL(path) {
    path = path.match(reg)[1];
    let fullRoutes = [this.baseUrl, path]
    return fullRoutes.join("/");
  }

  /**
   * Dùng để tạo query ở dạng options từ object query.
   * @param {{[key: string]: any}} query 
   * @returns 
   */
  getQueryString(query) {
    try {
      if(Array.isArray(query) || !(typeof query === "object"))
        throw new Error("query must be listed in an object.")
  
      let queryInString = "?"
      for(let paramName in query) {
        queryInString += paramName + "=" + query[paramName].toString()
        queryInString += "&"
      }
      return queryInString.substring(0, queryInString.length - 1);
    } catch (error) {
      console.log(error.message)
      return "";
    }
  }
}

export class APICallersCreatorOptions extends APIsOptions {
  /**
   * @type {CreateAPICallersCaller}
   */
  callers = {};
  /**
   * @type {string}
   */
  baseUrl = "";

  /**
   * @param {CreateAPICallersOptions} initialOptions
   */
  constructor(initialOptions) {
    super(initialOptions);

    for(let prop in this) {
      if(initialOptions[prop]) {
        this[prop] = initialOptions[prop];
      }
    };
  }
}