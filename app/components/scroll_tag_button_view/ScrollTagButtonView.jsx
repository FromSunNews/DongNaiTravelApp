import { ScrollView, Text } from 'react-native'
import React from 'react'

import CapsuleButton from '../capsule_button/CapsuleButton'

import { app_sp } from 'globals/styles'

/**
 * by @NguyenAnhTuan1912
 * 
 * ScrollButtonView sẽ chịu trách nhiệm load dữ liệu cho các Button, mà dữ liệu này sẽ theo một chủ đề nào đó.
 * 
 * @param {string} concept - Chủ đề cần để load dữ liệu. VD: `Blog`, `Place`.
 * @param {style} style - Style riêng cho Scroll TagButton View.
 * @param {boolean} isHorizontalScroll - Đây có phải là một view scroll nằm ngang hay không? Mặc định là `true`
 * @returns Trả về `ScrollView` Component có các `TouchableOpacity` Components ở trong đó.
 */
const ScrollTagButtonView = ({concept, style, isHorizontalScroll = true}) => {
  if(concept === undefined || concept === "") return <Text>Không tìm thấy concept</Text>

  return (
    <ScrollView horizontal={isHorizontalScroll} showsHorizontalScrollIndicator={false} style={{...app_sp.mv_7, ...style}}>
      {fakeData[concept].map((data, index) => {
        return (
          <CapsuleButton key={data} isActive={index === 0 ? true : false}>{data}</CapsuleButton>
        );
      })}
    </ScrollView>
  )
}

const fakeData = {
  "place": [
    "All", "Recommended", "Popular", "Most visited"
  ]
};

export default ScrollTagButtonView