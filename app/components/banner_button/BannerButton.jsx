import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

import AppText from '../app_text/AppText'

import style from './BannerButtonStyle'
import { app_c } from 'globals/styles'

/**
 * by @NguyenAnhTuan1912 (tạm thời chưa có icon)
 * 
 * Banner Button là một nút có ảnh là background, trong đó thì chủ yếu dùng để hiển thị những nơi đặc biệt.
 * @param {string} children - là slogan, quote các thứ của banner.
 * @param {string} imageUrl - đường dẫn ảnh làm background cho button.
 * @returns Trả về `TouchableOpacity` Component có chữ, ảnh, icon và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const BannerButton = ({children, imageUrl}) => {
  return (
    <TouchableOpacity style={style.in_active}>
      <ImageBackground source={{url: `${imageUrl}`}} resizeMode="cover" style={style.image}>
        <View style={style.lbl_container}>
          <AppText sz="sz_6" style={{color: app_c.HEX.ext_second}} numberOfLines={2}>{children}</AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default BannerButton