import { AxiosInstance } from "axios"
import { Store } from "@reduxjs/toolkit"
import FunctionsUtility from "utilities/functions";

import { APIsOptionsProps } from "../types";

let reg = /(?:^\/){0,1}(.+)/

export class APIsOptions {
  /**
   * @type {AxiosInstance}
   */
  axiosInstance
  /**
   * @type {Store}
   */
  reduxStore
  /**
   * @type {string}
   */
  apiRoot
  /**
   * @type {string}
   */
  endpoint
  /**
   * @type {string}
   */
  routeName
  /**
   * @type {string}
   */
  apiVersion

  /**
   * @param {APIsOptionsProps} options
   */
  constructor(options) {
    this.apiRoot = options.apiRoot ? options.apiRoot : API_ROOT;
    this.axiosInstance = options.axiosInstance ? options.axiosInstance : axios;
    this.reduxStore = options.reduxStore ? options.reduxStore : injectStore();
    this.endpoint = (options.endpoint).match(reg)[1];
    this.routeName = (options.routeName).match(reg)[1];
    this.apiVersion = (options.apiVersion ? options.apiVersion : 'v1').match(reg)[1];

    FunctionsUtility.autoBind(this);
  }

  /**
   * Dùng để tạo ra một route hoàn chỉnh, có cấu trúc là
   * `ApiRoot/ApiVersion/RouteName/EndPoint`
   * @param {boolean} hasVersion 
   */
  getFullRoute(hasVersion) {
    let fullRoutes = [this.apiRoot, this.apiVersion, this.routeName, this.endpoint]
    if(!hasVersion) fullRoutes.splice(1, 1);
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
      return ""
    }
  }
}