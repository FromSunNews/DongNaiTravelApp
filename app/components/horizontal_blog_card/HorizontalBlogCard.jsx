import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import DateTimeUtility from 'utilities/datetime'

import Ionicons from 'react-native-vector-icons/Ionicons'

import AppText from 'components/app_text/AppText'
import RectangleButton from 'components/buttons/RectangleButton'
import CircleButton from 'components/buttons/CircleButton'

import styles from './HorizontalBlogCardStyles'
import { app_c, app_sp } from 'globals/styles'

/**
 * @typedef BlogProps
 * @property {object} user - Thông tin cơ bản của một user, là tác giả của blog.
 * @property {string} user.id - Id của user.
 * @property {string} user.name - Tên của user.
 * @property {string} user.avatar - Đường dẫn ảnh đại diện của user.
 * @property {string} name - Tên của blog.
 * @property {string} avatar - Ảnh đại diện của blog.
 * @property {number} createdAt - Thời gian blog này được tạo ra.
 * @property {number} readTime - Thời gian đọc blog.
 * @property {boolean} isLiked - Đây là một trường thời gian được thêm vào khi chuẩn bị dữ liệu.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Đây là card nằm ngang, hiển thị một số thông tin cơ bản của một blog nào đó. Có thể ấn vào để xem chi tiết
 * của blog đó. Một card sẽ chứa 3 cột. Cột đâu tiên là dành cho ảnh, cột thứ 2 là giành cho nội dung chính
 * và cột cuói cùng là giành cho nút share.
 * @param {object} props - Props của component.
 * @param {BlogProps} props.blog - Dữ liệu của blog, thông tin này chủ yếu là thông tin đã được làm gọn lại.
 * @returns 
 */
const HorizontalBlogCard = ({blog}) => {
  const navigation = useNavigation()

  const handlePressImageButton = () => {
    navigation.navigate({name: 'BlogDetailStackScreen'});
  }
  return (
    <View style={styles.card}>
      {/* Cột đâu tiên - Image Container */}
      <RectangleButton
        typeOfButton="highlight"
        overrideShape="rounded_4"
        isOnlyContent={true}
        onPress={handlePressImageButton}
        style={app_sp.me_12}
      >
        <ImageBackground style={styles.card_image_container} source={blog.avatar !== "" ? {uri: blog.avatar} : {}}>
          {/*
            blog.isRecommended &&
            <View style={styles.card_recommended_mark_container}>
              <AppText font="body6" style={{color: app_c.HEX.ext_second}}>Recommended</AppText>
            </View>
          */}
        </ImageBackground>
      </RectangleButton>

      {/* Cột thứ 2 - Main Container */}
      <View style={styles.card_main_container}>
        <View style={styles.card_content_container}>
          <View style={styles.card_user_container}>
            {
              blog.user.avatar === ""
              ? (<Ionicons name="person-circle" color={app_c.HEX.ext_second} />)
              : (<Image source={{uri: blog.user.avatar}} />)
            }<AppText font="body3" style={styles.card_text_color}>{" " + blog.user.name}</AppText>
          </View>
          <View>
            <AppText numberOfLines={2} font="h4" style={styles.card_title}>{blog.name}</AppText>
          </View>
          <View style={styles.card_information_container}>
            <View style={styles.card_information_col}>
              <AppText font="body3" style={styles.card_text_color}>
                {DateTimeUtility.getShortDateString(blog.createdAt)}
              </AppText>
            </View>
            <View style={{...styles.card_information_col, alignItems: 'flex-end'}}>
              <AppText font="body3" style={styles.card_text_color}>
                <Ionicons name='time-outline' /> {DateTimeUtility.toMinute(blog.readTime)} min
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.card_buttons_container}>
          <CircleButton
            isActive={blog.isLiked}
            style={app_sp.me_8}
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'heart' : 'heart-outline'} size={14} style={currentLabelStyle} />
            )}
          />
          <CircleButton
            style={app_sp.me_8}
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'flag' : 'flag-outline'} size={14} style={currentLabelStyle} />
            )}
          />
        </View>
      </View>

      {/* Cột thứ 3 - Share Container */}
      <View style={styles.card_share_container}>
        <CircleButton
          isOnlyContent={true}
          setIcon={(isActive, currentLabelStyle) => (
            <Ionicons name="share-outline" size={20} style={currentLabelStyle} />
          )}
        />
      </View>
    </View>
  )
}

export default HorizontalBlogCard