import { ScrollView, Text } from 'react-native'
import React from 'react'

import CapsuleButton from '../capsule_button/CapsuleButton'

import { app_sp } from 'globals/styles'

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * ScrollButtonView sẽ chịu trách nhiệm load dữ liệu cho các Button, mà dữ liệu này sẽ theo một chủ đề nào đó.
 * @param {object} props - Props của component.
 * @param {string} props.concept - Chủ đề cần để load dữ liệu. VD: `Blog`, `Place`.
 * @param {StyleProp<ViewStyle>} props.style - Style riêng cho Scroll TagButton View.
 * @param {boolean} props.isHorizontalScroll - Đây có phải là một view scroll nằm ngang hay không? Mặc định là `true`
 * @returns Trả về `ScrollView` Component có các `TouchableOpacity` Components ở trong đó.
 */
const TagScrollView = ({
  concept,
  style,
  isHorizontalScroll = true
}) => {
  if(concept === undefined || concept === "") return <Text>Không tìm thấy concept</Text>

  let lengthOfTags = fakeData[concept].length;

  return (
    <ScrollView
      horizontal={isHorizontalScroll}
      showsHorizontalScrollIndicator={false}
      style={{...style}}
    >
      {fakeData[concept].map((data, index) => {
        return (
          index > (lengthOfTags - 1)
          ? <CapsuleButton key={data} isActive={index === 0 ? true : false}>{data}</CapsuleButton>
          : <CapsuleButton key={data} style={app_sp.me_12} isActive={index === 0 ? true : false}>{data}</CapsuleButton>
        );
      })}
    </ScrollView>
  )
}

const fakeData = {
  "place": [
    "All", "Recommended", "Popular", "Most visited", "Most Ratings"
  ]
};

export default TagScrollView