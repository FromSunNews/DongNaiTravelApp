import { View, Text } from 'react-native'
import React from 'react'

import style from './HorizontalPlaceCardStyle'

/**
 * by @NguyenAnhTuan1912
 * 
 * Đây là card nằm ngang, hiển thị một số thông tin cơ bản của một địa điểm nào đó. Có thể ấn vào để xem chi tiết
 * một địa điểm nào đó.
 *
 * @param {string} unknown
 * @param {boolean} unknown
 * @returns unknown.
 */
const HorizontalPlaceCard = () => {
  return (
    <View style={style.card}>
      <View style={{width: 145, height: 145, backgroundColor: "#ECECEC", borderRadius: 4}}></View>
    </View>
  )
}

export default HorizontalPlaceCard