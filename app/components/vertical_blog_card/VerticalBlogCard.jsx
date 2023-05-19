import {
  View,
  Text,
  Image
} from 'react-native'
import React from 'react'

import ComponentUtility from 'utilities/component'
import DateTimeUtility from 'utilities/datetime'
import { useNavigation } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import AppText from 'components/app_text/AppText'
import RectangleButton from 'components/buttons/RectangleButton'
import CircleButton from 'components/buttons/CircleButton'

import styles from './VerticalBlogCardStyles'
import { app_c, app_sh, app_sp } from 'globals/styles'

import { ViewProps } from 'types/index.d'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'
import useTheme from 'customHooks/useTheme'

/**
 * @typedef BlogProps
 * @property {object} user Thông tin cơ bản của một user, là tác giả của blog.
 * @property {string} user.id Id của user.
 * @property {string} user.name Tên của user.
 * @property {string} user.avatar Đường dẫn ảnh đại diện của user.
 * @property {string} name Tên của blog.
 * @property {string} avatar Ảnh đại diện của blog.
 * @property {number} createdAt Thời gian blog này được tạo ra.
 * @property {number} readTime Thời gian đọc blog.
 * @property {boolean} isLiked Đây là một trường thời gian được thêm vào khi chuẩn bị dữ liệu.
 */

/**
 * @typedef VerticalBlogCardProps
 * @property {BlogProps} blog Thông tin ngắn của một địa điểm.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Đây là card dọc, hiển thị một số thông tin cơ bản của một blog nào đó. Có thể ấn vào để xem chi tiết
 * một blog nào đó. Card dọc này sẽ ít thông tin và "khả năng tương tác" hơn so với card ngang.
 * 
 * Có thể custom style cho component này (Container only). Chủ yếu là dùng để margin.
 * 
 * __How to add style?__
 * ```jsx
 * // Margin end cho card 
 * <VerticalBlogCard blog={blog[0]} style={app_sp.me_18} />
 * ```
 * @param {ViewProps & VerticalBlogCardProps} props Props của component.
 * @returns Thẻ dọc chứa các thông tin cơ bản của một blog.
 */
const VerticalBlogCard = ({ blog, ...props }) => {
  const containerStyle = ComponentUtility.mergeStyle([styles.card, blog.isRecommended ? {} : {}], props.style);
  //Đức useNavagation to make when onPress Image of Blog => toScreen BlogDetailScreen
  const navigation = useNavigation() 
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.homeScreen
  //theme
  const themeColor = useTheme();

  return (
    <View {...props} style={[containerStyle,{backgroundColor: themeColor.ext_primary}]}>
      {/* Image */}
      <RectangleButton
        isOnlyContent
        typeOfButton="none"
        overrideShape="rounded_4"
        onPress={()=>navigation.navigate("BlogDetailScreen")}
      >
        <Image source={{ uri: blog.avatar ? blog.avatar : undefined }} style={[styles.card_image,{backgroundColor: themeColor.ext_primary,}]} />
      </RectangleButton>
      {/* Button & Recommended tag */}
      <View style={styles.card_mid}>
        {
          blog.user.avatar === ""
          ? (<Ionicons name="person-circle" color={themeColor.ext_second} />)
          : (<Image source={{uri: blog.user.avatar}} />)
        }<AppText font="body2">{" " + blog.user.name}</AppText>
      </View>

      {/* Content */}
      <View style={styles.card_content_container}>
        <AppText numberOfLines={2} font="h4" style={app_sp.mb_6}>{blog.name}</AppText>

        {/* Sub-information */}
        <View style={styles.card_content_sub_information_container}>
          <AppText font="body2">
            {DateTimeUtility.getShortDateString(blog.createdAt)}
          </AppText>
          <AppText numberOfLines={1} font="body2">
            {DateTimeUtility.toMinute(blog.readTime)} min read
          </AppText>
        </View>
      </View>

      {/* Like button */}
      <View style={styles.card_buttons_container}>
        <RectangleButton
          isTransparent
          typeOfButton="opacity"
          style={styles.card_button}
        >
          {
            (isActive, currentLabelStyle) => (
              <AppText font="body2" style={currentLabelStyle}>
                <Ionicons name={isActive ? "heart" : "heart-outline"} style={currentLabelStyle} size={14} /> {langData.like[langCode]}
              </AppText>
            )
          }
        </RectangleButton>

        <RectangleButton
          isTransparent
          typeOfButton="opacity"
          style={styles.card_button}
        >
          {
            (isActive, currentLabelStyle) => (
              <AppText font="body2" style={currentLabelStyle}>
                <Ionicons name={isActive ? "flag" : "flag-outline"} style={currentLabelStyle} size={14} /> {langData.report[langCode]}
              </AppText>
            )
          }
        </RectangleButton>
      </View>
    </View>
  )
}

export default VerticalBlogCard