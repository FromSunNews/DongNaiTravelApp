import React from 'react'
import {
  ViewProps
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import {
  useBlogDetailsState,
  useBlogDetailsActions,
  useBlogDetails,
  useBriefBlogsActions,
  useBlogInteractionActions
} from 'customHooks/useBlog'

import { 
  WithBlogCardWrappedComponentProps
} from 'types/index.d.ts'

/**
 * @typedef BlogCardProps
 * @property {BlogDataProps} blog Thông tin về một địa điểm của một nơi nào đó.
 * @property {string} typeOfBriefBlog Type của brief blogs.
 * @property {number} blogIndex Index của blog trong data của briefBlog. Cái này dùng để tìm blog cho nhanh, khỏi dùng vòng lặp.
 */

/**
 * #### HOC
 * 
 * Đây là một Higher order component, chứa các logic cơ bản của một Blog Card bao gồm:
 * - Yêu thích một địa điểm
 * - Đã ghé thăm một địa điểm
 * @param {(props: WithBlogCardWrappedComponentProps) => JSX.Element} Component Component này sẽ dùng các logic trong `withBlogCard`.
 * @example
 * ...
 * import { withBlogCard } from 'hocs/withBlogCard'
 * 
 * function HorizontalBlogCard({...}) {...}
 * 
 * export default withBlogCard(HorizontalBlogCard)
 * 
 * // OR
 * import { withBlogCard } from 'hocs/withBlogCard'
 * 
 * function VerticalBlogCard({...}) {...}
 * 
 * export default withBlogCard(VerticalBlogCard)
 * ...
 */
export function withBlogCard(WrappedComponent) {
  /**
   * Component này sẽ nhận một component khác và bọc nó lại, đồng thời function này sẽ truyền logic lại cho
   * component được bọc đó (WrappedComponent).
   * @param {ViewProps & BlogCardProps} props Props của component.
   */
  return function({ blog, blogIndex, typeOfBriefBlog, ...props }) {
    const { addBlogDetails } = useBlogDetailsActions();
    const { updateBriefBlog } = useBriefBlogsActions(typeOfBriefBlog);
    const { extendedBlogInfo, likeBlog } = useBlogInteractionActions(blog);
    const navigation = useNavigation();
  
    /**
     * Hàm này dùng để mở một blog details.
     */
    const handlePressImageButton = () => {
      addBlogDetails(blog);
      navigation.push('BlogDetailScreen', {
        blogId: blog._id,
        typeOfBriefBlog: typeOfBriefBlog
      });
    }
  
    /**
     * Hàm này dùng để yêu thích / bỏ yêu thích một blog, nó sẽ gửi id của blog về server và tự server nó sẽ xử lý.
     */
    const handleLikeButton = () => likeBlog(
      (data, state) => updateBriefBlog(blog.blog_id, blogIndex, { isLiked: state }),
      (state) => updateBriefBlog(blog.blog_id, blogIndex, { isLiked: state })
    )

    return (
      <WrappedComponent
        {...props}
        blog={blog}
        blogIndex={blogIndex}
        typeOfBriefBlog={typeOfBriefBlog}
        extendedBlogInfo={extendedBlogInfo}
        addBlogDetails={addBlogDetails}
        updateBriefBlog={updateBriefBlog}
        handlePressImageButton={handlePressImageButton}
        handleLikeButton={handleLikeButton}
      />
    )
  }
}