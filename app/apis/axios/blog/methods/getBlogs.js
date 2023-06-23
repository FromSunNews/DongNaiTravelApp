import { APIsOptionsProps } from "apis/axios/types.d.ts";

/**
 * @typedef GetBlogsAPIQueryProps
 * @property {number} limit
 * @property {number} skip
 * @property {string} filter
 * @property {string} fields
 * @property {string} userId
 */

/**
 * Dùng để configure và lấy hàm gọi endpoint `get_multiple`
 * @param {APIsOptionsProps} options 
 * @returns 
 */
export function ConfigureGetBlogsAPI(options) {
  /**
   * Dùng để lấy nhiều blog.
   * @param {GetBlogsAPIQueryProps} query Params để lấy dữ liệu nhiều blog.
   * @returns 
   */
  return async function(query) {
    try {
      let queryString = options.getQueryString(query);
      let url = `${options.getFullRoute()}${queryString}`;
      console.log(`GET: ${options.routeName}/${options.endpoint}'s url: `, url);
      const response = await options.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }
}