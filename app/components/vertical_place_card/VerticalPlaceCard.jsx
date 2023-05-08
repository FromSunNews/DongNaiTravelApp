import {
  View,
  Text,
  Image
} from 'react-native'
import React, {useState} from 'react'

import ComponentUtility from 'utilities/component'

import Ionicons from 'react-native-vector-icons/Ionicons'

import AppText from 'components/app_text/AppText'
import RectangleButton from 'components/buttons/RectangleButton'
import CircleButton from 'components/buttons/CircleButton'
import { useNavigation } from '@react-navigation/native'
import { BoxShadow } from 'react-native-shadow'

import styles from './VerticalPlaceCardStyles'
import { app_c, app_sh, app_sp } from 'globals/styles'

import { ViewProps } from 'types/index.d'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import { saveArticle, removeArticle } from '../../redux/warehouse/WareHouseSlice'
import { selectCurrentWareHouse } from '../../redux/warehouse/WareHouseSlice'

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

  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.homeScreen

  //saved Place 
  const placesSaved = useSelector(selectCurrentWareHouse).placesSaved
  const dispatch = useDispatch()

  const handleLikedPlace = () =>{
    if(placesSaved.find(i => i === place.id) ? true : false)
      {
        dispatch(removeArticle(place))
        console.log('đã xoá place')
      }
      else
      {
        dispatch(saveArticle(place))
        console.log('đã lưu place')
      }
  }
  console.log('placesSaved:',placesSaved)
  

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
          place.isRecommended && <AppText font="sub1" color="third">{langData.recommended[langCode]}</AppText>
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
          isActive={placesSaved.find(i => i === place.id) ? true : false}
          onPress={handleLikedPlace}
        >
          {
            (isActive, currentLabelStyle) => (
              <AppText font="body2" style={currentLabelStyle}>
                <Ionicons name={isActive ? "heart" : "heart-outline"} style={currentLabelStyle} size={14} /> {langData.like[langCode]}
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
              <Ionicons name={isActive ? "flag" : "flag-outline"} style={currentLabelStyle} size={14} /> {langData.report[langCode]}
              </AppText>
            )
          }
        </RectangleButton>
      </View>
    </View>
  )
}

export default VerticalPlaceCard