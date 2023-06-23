import { APIsOptionsProps } from "apis/axios/types.d.ts";

/**
 * @typedef GetBlogsAPIQueryProps
 * @property {string} blogId
 * @property {string} fields
 */

/**
 * Dùng để configure và lấy hàm gọi endpoint `get_one`
 * @param {APIsOptionsProps} options
 * @returns
 */
export function ConfigureGetBlogAPI(options) {
  /**
   * Dùng để lấy một blog.
   * @param {GetBlogsAPIQueryProps} query Params để lấy dữ liệu một blog.
   * @returns
   */
  return async function(query) {
    try {
      let queryString = options.getQueryString(query);
      let url = `${options.getFullRoute()}${queryString}`;
      const response = await options.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }
}