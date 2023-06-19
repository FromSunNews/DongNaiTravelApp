import { CreateBlogEventHandlers } from "./events/createBlog"

export const BlogSocketEventNames = {
  create: 'create:blog'
}

const getCreateBlogEventHandlers = CreateBlogEventHandlers(BlogSocketEventNames.create)

export {
  getCreateBlogEventHandlers
}