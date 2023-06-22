import { APIsOptions } from 'apis/axios/class/APIsOptions';

/*
  Để có thể xoá được blg thì người dùng phải đăng nhập vào tài khoản của mình
  và truyền về server một object như sau:
  {
    "blogId": "649188321c16aa37fea72801"
  }
*/

/**
 * Dùng để configure và lấy hàm gọi endpoint `delete_one`
 * @param {APIsOptions} options 
 * @returns 
 */
export function ConfigureDeleteBlogAPI(options) {
  /**
   * Dùng để xoá đi một blog, nhận vào `_id` của blog cần xoá.
   * @param {string} blogId là `_id` của blog cần xoá.
   */
  return async function(blogId) {
    try {
      // let user = options.reduxStore.getState().user.currentUser;
      let url = options.getFullRoute();
      const response = await options.axiosInstance.delete(url, {blogId});
      return response.data;
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }
}