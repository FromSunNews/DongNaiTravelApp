import React from 'react'
import { ScrollView, Text } from 'react-native'

import TagButton from '../tag_button/TagButton'

/**
 * by @NguyenAnhTuan1912
 * 
 * ScrollButtonView sẽ chịu trách nhiệm load dữ liệu cho các Button, mà dữ liệu này sẽ theo một chủ đề nào đó.
 * 
 * @param {string} concept - Chủ đề cần để load dữ liệu. VD: `Blog`, `Place`.
 * @param {boolean} isHorizontalScroll - Đây có phải là một view scroll nằm ngang hay không? Mặc định là `true`
 * @returns Trả về `ScrollView` Component có các `TouchableOpacity` Components ở trong đó.
 */
const ScrollTagButtonView = ({concept, isHorizontalScroll = true}) => {
  if(concept === undefined || concept === "") return <Text>Không tìm thấy concept</Text>

  return (
    <ScrollView horizontal={isHorizontalScroll} showsHorizontalScrollIndicator={false}>
      {fakeData[concept].map((data, index) => {
        return (
          <TagButton text={data} key={data} isActive={index === 0 ? true : false} />
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