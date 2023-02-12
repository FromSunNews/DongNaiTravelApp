import { ScrollView, Text } from 'react-native'
import React from 'react'

import RectangleButton from '../buttons/RectangleButton'

import { app_sp } from 'globals/styles'

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * ScrollButtonView sẽ chịu trách nhiệm load dữ liệu cho các Button, mà dữ liệu này sẽ theo một chủ đề nào đó.
 * @param {object} props - Props của component.
 * @param {'places' | 'blogs'} [props.concept=places] - Chủ đề cần để load dữ liệu. VD: `Blog`, `Place`.
 * @param {StyleProp<ViewStyle>} props.style - Style riêng cho Scroll TagButton View.
 * @param {boolean} props.isHorizontalScroll - Đây có phải là một view scroll nằm ngang hay không? Mặc định là `true`
 * @returns Trả về `ScrollView` Component có các `TouchableOpacity` Components ở trong đó.
 */
const TagScrollView = ({
  concept = 'places',
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
          ? <RectangleButton key={data} overrideShape="capsule" typeOfButton="highlight" isActive={index === 0 ? true : false}>{data}</RectangleButton>
          : <RectangleButton key={data} overrideShape="capsule" typeOfButton="highlight" style={app_sp.me_12} isActive={index === 0 ? true : false}>{data}</RectangleButton>
        );
      })}
    </ScrollView>
  )
}

const fakeData = {
  "places": [
    "All", "Recommended", "Popular", "Most visited", "Most Ratings"
  ],
  "blogs": []
};

export default TagScrollView