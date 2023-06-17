import { Socket } from "socket.io-client";

import {
  createNonGlobalSocketEventHandlers
} from 'apis/socket/utils'

import {
  BlogCreateSocketEventSendMessageStatusProps
} from 'types/index.d.ts'

/**
   * Tạo message cho `create:blog` event.
   * @param {BlogCreateSocketEventSendMessageStatusProps} status Object chứa trạng thái của event tạo blog.
   * @param {any} chunk Data này có thể chứa bất kì cái gì. Nhưng khi kết thúc event thì nó sẽ trả về dữ liệu của Blog.
   * @returns
   */
export function generateMessage(message) {
  message = Object.assign({
    status: {
      isOff: false,
      isUploadDone: false
    },
    chunk: ""
  }, message)

  return message
}

/**
 * __Get Non-global Event__
 * 
 * _Sẽ có thay đổi trong tương lai_
 * 
 * Hàm này dùng để lấy ra event handlers của `create:blog`.
 * @returns
 */
export function CreateBlogEventHandlers(eventName) {
  if(!eventName) {
    console.error("Please import from `blog/index.js` instead of `blog/createBlog.js`");
    return undefined;
  }
  /**
   * Hàm này dùng để tạo và lấy 2 event handlers là `listen` và `emit` cho sự kiện Create Blog (`create:blog`)
   * @param {Socket} socket kết nối socket (object) của một người dùng thông qua `io()`.
   * @returns
   */
  return function(socket) {
    if(!socket) {
      console.error("Socket is not created! Cannot listen to event.");
      return [];
    }

    return createNonGlobalSocketEventHandlers(socket, eventName, { generateMessage });
  }
}