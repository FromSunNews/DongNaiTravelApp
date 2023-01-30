import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

import { AppText, CapsuleButton, CircleButton } from 'components'

import style from './HorizontalPlaceCardStyle'
import { app_c } from 'globals/styles'

/**
 * by @NguyenAnhTuan1912
 * 
 * Đây là card nằm ngang, hiển thị một số thông tin cơ bản của một địa điểm nào đó. Có thể ấn vào để xem chi tiết
 * một địa điểm nào đó. Một card sẽ chứa 3 cột. Cột đâu tiên là dành cho ảnh, cột thứ 2 là giành cho nội dung chính
 * và cột cuói cùng là giành cho nút share.
 *
 * @param {string} unknown
 * @param {boolean} unknown
 * @returns unknown.
 */
const HorizontalPlaceCard = ({cate}) => {
  return (
    <View style={style.card}>
      {/* Cột đâu tiên - Image Container */}
      <ImageBackground style={style.card_image_container} source={{uri: "https://media.istockphoto.com/id/1010884322/fr/photo/esprit-l%C3%AEle-dans-le-lac-maligne-au-coucher-du-soleil-le-parc-national-jasper-alberta-canada.jpg?s=612x612&w=0&k=20&c=rloK48fYfwNT5jVKkdHkCLqQZJ3QVx-lnWvEh3NIJ7c="}}>
        <View style={style.card_capsule_container}>
          <AppText sz="sz_2" style={{color: app_c.HEX.ext_second}}>Recommended</AppText>
        </View>
      </ImageBackground>

      {/* Cột thứ 2 - Main Container */}
      <View style={style.card_main_container}>
        <View style={style.card_content_container}>
          <View style={style.cart_tag_container}>
            <AppText sz="sz_2">Walking</AppText>
          </View>
          <View>
            <AppText numberOfLines={1} sz="sz_6" style={style.card_title}>Pho di bo</AppText>
            <AppText style={style.car_subtitle} sz="sz_3">Bien Hoa - Dong Nai</AppText>
          </View>
          <View style={style.card_information_container}>
            <View style={style.card_information_col}>
              <AppText sz="sz_3">4.3</AppText>
              <AppText sz="sz_3">300</AppText>
            </View>
            <View style={style.card_information_col}>
              <AppText sz="sz_3">3.2k</AppText>
            </View>
          </View>
        </View>
        <View style={style.card_buttons_container}>
          <CircleButton></CircleButton>
          <CircleButton></CircleButton>
          <CapsuleButton isActive={false}>Visit</CapsuleButton>
        </View>
      </View>

      {/* Cột thứ 3 - Share Container */}
      <View></View>
    </View>
  )
}

export default HorizontalPlaceCard