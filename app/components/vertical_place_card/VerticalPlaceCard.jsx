import {
  View,
  Text,
  Image
} from 'react-native'
import React from 'react'

import ComponentUtility from 'utilities/component'

import Ionicons from 'react-native-vector-icons/Ionicons'

import AppText from 'components/app_text/AppText'
import RectangleButton from 'components/buttons/RectangleButton'
import CircleButton from 'components/buttons/CircleButton'
import { useNavigation } from '@react-navigation/native'

import styles from './VerticalPlaceCardStyles'
import { app_c, app_sh, app_sp } from 'globals/styles'

import { ViewProps } from 'types/index.d'

/**
 * @typedef PlaceProps
 * @property {string} name Tên địa điểm.
 * @property {string} avatar Ảnh đại diện cho địa điểm.
 * @property {object} location Location giống với place, nhưng nó sẽ rộng hơn, ở cấp thành phố đổ lên.
 * @property {string} location.province Tên của tỉnh.
 * @property {string} location.city Tên của thành phố.
 * @property {Array<object>} tags Các thể loại danh mục.
 * @property {number} ratingPoints Điểm rating.
 * @property {number} numberOfReviews Số lượng người dùng đã đánh giá (viết comment review).
 * @property {number} numberOfVisited Số lượng người dùng đã đến tham quan.
 * @property {boolean} isRecommended Có được đề xuất hay không?.
 * @property {boolean} isVisited Có đến đây thăm hay chưa? (Đây là một trường ghép từ User và Place, được tạo trong quá trình chuẩn bị dữ liệu).
 */

/**
 * @typedef VerticalPlaceCardProps
 * @property {PlaceProps} place Thông tin ngắn của một địa điểm.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Đây là card dọc, hiển thị một số thông tin cơ bản của một địa điểm nào đó. Có thể ấn vào để xem chi tiết
 * một địa điểm nào đó. Card dọc này sẽ ít thông tin và "khả năng tương tác" hơn so với card ngang.
 * 
 * Có thể custom style cho component này (Container only). Chủ yếu là dùng để margin.
 * 
 * __How to add style?__
 * ```jsx
 * // Margin end cho card 
 * <VerticalPlaceCard place={place[0]} style={app_sp.me_18} />
 * ```
 * @param {ViewProps & VerticalPlaceCardProps} props Props của component.
 * @returns Thẻ dọc chứa các thông tin cơ bản của một địa điểm.
 */
const VerticalPlaceCard = ({ place, ...props }) => {
  const containerStyle = ComponentUtility.mergeStyle([styles.card, place.isRecommended ? {} : {}], props.style);
  //Đức: create navigation for Image Place onPress=> toScreen DetailPlaceScreen
  const navigation = useNavigation()
  return (
    <View {...props} style={containerStyle}>
      {/* Image */}
      <RectangleButton
        isOnlyContent
        typeOfButton="none"
        overrideShape="rounded_4"
        onPress={()=>navigation.navigate("PlaceDetailScreen")}
      >
        <Image source={{ uri: place.avatar }} style={styles.card_image} />
      </RectangleButton>
      {/* Button & Recommended tag */}
      <View style={styles.card_mid}>
        {
          place.isRecommended && <AppText font="sub1" color="third">Recommended</AppText>
        }
      </View>

      {/* Content */}
      <View style={styles.card_content_container}>
        <AppText numberOfLines={1} font="h4" style={app_sp.mb_6}>{place.name}</AppText>

        {/* Sub-information */}
        <View style={styles.card_content_sub_information_container}>
          <AppText font="body2">
            <Ionicons name="star-outline" /> {place.ratingPoints}
          </AppText>
          <AppText numberOfLines={1} font="body2">
            <Ionicons name="location-outline" /> {place.location.city} - {place.location.province}
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
                <Ionicons name={isActive ? "heart" : "heart-outline"} style={currentLabelStyle} size={14} /> Like
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
                <Ionicons name={isActive ? "flag" : "flag-outline"} style={currentLabelStyle} size={14} /> Report
              </AppText>
            )
          }
        </RectangleButton>
      </View>
    </View>
  )
}

export default VerticalPlaceCard