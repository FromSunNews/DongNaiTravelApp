import { APIsOptionsProps } from "apis/axios/types.d.ts";

/**
 * Dùng để configure và lấy hàm gọi endpoint `get_comments`
 * @param {APIsOptionsProps} options 
 * @returns
 */
export function ConfigureGetBlogCommentsAPI(options) {
  /**
   * Lấy nhiều comment của một blog. Bởi vì các comment này được lưu ở trong
   * Blog Comment List, cho nên dữ liệu trả về sẽ khác so với thông thường.
   * @param {{skip: number, limit: number, blogId: string}} query
   * @returns {Promise<Array<{_id: string, comment: any[]}>>}
   */
  return async function(query) {
    try {
      // let user = options.reduxStore.getState().user.currentUser;
      let queryString = options.getQueryString(query);
      // if(user) queryString += `&userId=${user._id}`;
      let url = `${options.getFullRoute()}${queryString}`
      const response = await options.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }
}