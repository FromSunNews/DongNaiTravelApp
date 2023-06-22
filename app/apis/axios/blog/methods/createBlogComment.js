import { APIsOptions } from 'apis/axios/class/APIsOptions';

/*
  Để comment một blog thì người dùng phải đăng nhập từ trước. Và truyền về
  cho server một object như sau:
  {
    "blogId": "64901675241245f8f8db8ed5",
    "comment": {
      "authorId": "645c46fb0e012b9f8a6b31b4",
      "text": "Đây là comment cuối cùng để test"
    }
  }
*/

/**
 * @typedef CreateBlogCommentRequestBodyProps
 * @property {string} blogId
 * @property {object} comment
 * @property {string} comment.authorId
 * @property {string} comment.text
 */

/**
 * Dùng để configure và lấy hàm gọi endpoint `get_comments`
 * @param {APIsOptions} options 
 * @returns 
 */
export function ConfigureCreateBlogCommentAPI(options) {
  /**
   * Tạo ra một comment cho một blog và gửi nó về cho server. Comment này phải đầy đủ dữ liệu trong `data`.
   * Nếu như thiếu đi bất kì một dữ liệu nào đó thì sẽ trả về lỗi.
   * @param {CreateBlogCommentRequestBodyProps} data dữ liệu bao gồm `blogId` và một object `comment` có 2 thuộc tính là `authorId` và `text`
   */
  return async function(data) {
    try {
      // let user = options.reduxStore.getState().user.currentUser;
      let url = options.getFullRoute();
      const response = await options.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }
}