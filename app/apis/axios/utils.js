import axios, { AxiosInstance } from "axios";

import { APIsOptions } from "./class/APIsOptions";

import { API_ROOT } from "utilities/constants";

import { APIsOptionsProps } from "./types.d.ts";

/**
 * Hàm này dùng để tạo ra các hàm dùng để gọi APIs từ server. Nó sẽ nhận vào 2 tham số
 * - specialtyInstances: là các instance của những object cần trong quá trình gọi api, trong đó
 * thì `axios` instance sẽ là mặc định, nếu như muốn bind instance đã được cấu hình của axios thì
 * chỉ cần thêm instance đó vào.
 * - apis: là một object chứa các hàm gọi APIs đã được define từ trước.
 * 
 * Trả về một object mà thất cả method của nó đã đã được bind với instance của `axios`
 * @param {{[key: string]: (args) => Promise<any>}} apis 
 * @param {{[key: string]: any}}  specialtyInstances 
 * @returns 
 */
export function bindSpecialtyObject(apis, specialtyInstances) {
  try {
    if(Array.isArray(apis) || !(typeof apis === "object"))
      throw new Error("apis must be an object (not array, or function or anything else)");
    
    if(Array.isArray(specialtyInstances) || !(typeof apis === "object"))
      throw new Error("Specialty objects must be listed in an object.")

    specialtyInstances = Object.assign(
      {
        axiosInstance: axios
      },
      specialtyInstances
    )

    for(let funcName in apis) {
      if(typeof apis[funcName] !== "function")
        throw new Error("It's seem your apis' structure is incorrect. apis only contains props as functions.");
      apis[funcName] = apis[funcName].bind(specialtyInstances);
    }

    return apis;
  } catch(error) {
    console.error(error.message)
    return {}
  }
}

/**
 * Chuyển query từ object về string.
 * @param {{[key: string]: any}} query 
 * @returns 
 */
export function getQueryString(query) {
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
    console.error(error.message)
    return ""
  }
}

/**
 * Dùng để tạo mới một `options` cho các hàm apis. Các object trong options của apis
 * không được clone ra mà phải giữ nguyên, bởi vì các object này sẽ được dùng chung trong toàn
 * app.
 * 
 * Gồm các options như là:
 * - apiRoot: là url name của api.
 * - axiosInstance: là instance của axios, mặc định là `axios` (import từ package axios).
 * - reduxStore: là instance của store của redux (store này đã được configure).
 * - endpoint: là điểm cuối của api, cái này thì nó chỉ rõ cho mình biết là api này làm nhiệm vụ gì.
 * - routeName: là tên của route như là `blog, map, user`.
 * - apiVersion: là version của api.
 * @param {APIsOptionsProps} options
 * @returns {APIsOptions}
 */
export function createNewAPIsOptions(options) {
  try {
    if(!options.endpoint || !options.routeName)
      throw new Error("Route or Route's name is empty!");

    options.apiRoot = options.apiRoot ? options.apiRoot : API_ROOT;
    options.axiosInstance = options.axiosInstance ? options.axiosInstance : axios;

    let newOptions = new APIsOptions(options);
    return newOptions;
  } catch (error) {
    console.error('Error (createNewAPIsOptions func): ', error.message);
    return {}
  }
}