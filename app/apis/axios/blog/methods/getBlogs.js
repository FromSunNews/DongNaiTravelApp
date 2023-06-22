import { APIsOptions } from 'apis/axios/class/APIsOptions';

/**
 * Dùng để configure và lấy hàm gọi endpoint `get_multiple`
 * @param {APIsOptions} options 
 * @returns 
 */
export function ConfigureGetBlogsAPI(options) {
  /**
   * Dùng để lấy nhiều blog.
   * @param {string} query Params để lấy dữ liệu nhiều blog.
   * @returns 
   */
  return async function(query) {
    try {
      let user = options.reduxStore.getState().user.currentUser;
      if(user) query += `&userId=${user._id}`;
      let url = `${options.getFullRoute()}?${query}`
      const response = await options.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }
}