import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

import NumberUtility from 'utilities/number'

import AppText from 'components/app_text/AppText'
import CapsuleButton from 'components/capsule_button/CapsuleButton'
import CircleButton from 'components/circle_button/CircleButton'

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
const HorizontalPlaceCard = ({place}) => {
  return (
    <View style={style.card}>
      {/* Cột đâu tiên - Image Container */}
      <ImageBackground style={style.card_image_container} source={{uri: place.avatar}}>
        {
          place.isRecommended &&
          <View style={style.card_recommended_mark_container}>
            <AppText sz="body6" style={{color: app_c.HEX.ext_second}}>Recommended</AppText>
          </View>
        }
      </ImageBackground>

      {/* Cột thứ 2 - Main Container */}
      <View style={style.card_main_container}>
        <View style={style.card_content_container}>
          <View style={style.cart_tag_container}>
            {place.tags.map((tag, index) => <AppText sz="body7" key={tag.title}>{tag.title}{index < place.tags.length - 1 ? ", " : ""}</AppText>)}
          </View>
          <View>
            <AppText numberOfLines={1} sz="h3" style={style.card_title}>{place.name}</AppText>
            <AppText style={style.car_subtitle} sz="body6">{place.location.city} - {place.location.name}</AppText>
          </View>
          <View style={style.card_information_container}>
            <View style={style.card_information_col}>
              <AppText sz="body6">{NumberUtility.toMetricNumber(place.numberOfRatings)}</AppText>
              <AppText sz="body6">{NumberUtility.toMetricNumber(place.numberOfReviews)}</AppText>
            </View>
            <View style={style.card_information_col}>
              <AppText sz="body6">{NumberUtility.toMetricNumber(place.numberOfVisited)}</AppText>
            </View>
          </View>
        </View>
        <View style={style.card_buttons_container}>
          <CircleButton></CircleButton>
          <CircleButton></CircleButton>
          <CapsuleButton isActive={place.isVisited}>Visit</CapsuleButton>
        </View>
      </View>

      {/* Cột thứ 3 - Share Container */}
      <View></View>
    </View>
  )
}

export default HorizontalPlaceCard