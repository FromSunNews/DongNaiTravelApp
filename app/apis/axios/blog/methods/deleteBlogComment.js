import { APIsOptionsProps } from "apis/axios/types.d.ts";

/*
  Để có thể xoá được comment thì người dùng phải đăng nhập vào tài khoản của mình
  và truyền về server một object như sau:
  {
    "blogId": "64901675241245f8f8db8ed5",
    "blogCommentId": "6493a160b658ff729fa3ab5c",
    "exactKey": "6492bf80a3af994b2f872516"
  }
*/

/**
 * Dùng để configure và lấy hàm gọi endpoint `delete_comment`
 * @param {APIsOptionsProps} options 
 * @returns 
 */
export function ConfigureDeleteBlogCommentAPI(options) {
  /**
   * Xoá một comment của một blog nào đó. Bởi vì một Blog sẽ có nhiều comment list, cho nên
   * khi xoá hay tương tác với comment sẽ hơi phức tạp tí.
   * @param {{blogId: string, blogCommentId: string, exactKey: string}} data
   */
  return async function(data) {
    try {
      // let user = options.reduxStore.getState().user.currentUser;
      let url = options.getFullRoute();
      const response = await options.axiosInstance.delete(url, data);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return undefined;
    }
  }
}