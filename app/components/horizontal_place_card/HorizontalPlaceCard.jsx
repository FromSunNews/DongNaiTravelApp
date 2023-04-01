import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import NumberUtility from 'utilities/number'

import Ionicons from 'react-native-vector-icons/Ionicons'

import AppText from '../app_text/AppText'
import RectangleButton from '../buttons/RectangleButton'
import CircleButton from '../buttons/CircleButton'

import styles from './HorizontalPlaceCardStyles'
import { app_c, app_sh, app_sp } from 'globals/styles'

/*
  Các thông tin về một place có thể thay đổi.
*/

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
 * 
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Đây là card nằm ngang, hiển thị một số thông tin cơ bản của một địa điểm nào đó. Có thể ấn vào để xem chi tiết
 * một địa điểm nào đó. Một card sẽ chứa 3 cột. Cột đâu tiên là dành cho ảnh, cột thứ 2 là giành cho nội dung chính
 * và cột cuói cùng là giành cho nút share.
 * @param {object} props - Props của component.
 * @param {PlaceProps} props.place - Thông tin về một địa điểm của một nơi nào đó.
 * @returns Thẻ ngang chứa các thông tin cơ bản của một địa điểm.
 */
const HorizontalPlaceCard = ({place}) => {
  const navigation = useNavigation()

  const handlePressImageButton = () => {
    navigation.navigate({name: 'PlaceDetailScreen'});
  }

  return (
    <View style={styles.card}>
      {/* Cột đâu tiên - Image Container */}
      <RectangleButton
        isOnlyContent
        typeOfButton="none"
        overrideShape="rounded_4"
        onPress={handlePressImageButton}
        style={app_sp.me_12}
      >
        <ImageBackground
          style={styles.card_image_container}
          source={{uri: place.avatar}}
        >
          {
            place.isRecommended &&
            <View style={styles.card_recommended_mark_container}>
              <AppText font="body2" color="ext_second">Recommended</AppText>
            </View>
          }
        </ImageBackground>
      </RectangleButton>

      {/* Cột thứ 2 - Main Container */}
      <View style={styles.card_main_container}>
        <View style={styles.card_content_container}>
          <View style={styles.card_tag_container}>
            {place.tags.map((tag, index) => (
              <AppText font="body2" style={styles.card_text_color} key={tag.title}>{tag.title}{index < place.tags.length - 1 ? ", " : ""}</AppText>
            ))}
          </View>
          <View>
            <AppText numberOfLines={1} font="h3" style={styles.card_title}>{place.name}</AppText>
            <AppText style={styles.car_subtitle} font="body2">{place.location.city} - {place.location.province}</AppText>
          </View>
          <View style={styles.card_information_container}>
            <View style={styles.card_information_col}>
              <AppText font="body2" style={styles.card_text_color}>
                <Ionicons name='star-outline' /> {place.ratingPoints}
              </AppText>
              <AppText font="body2" style={styles.card_text_color}>
                <Ionicons name='chatbubble-outline' /> {NumberUtility.toMetricNumber(place.numberOfReviews)}
              </AppText>
            </View>
            <View style={styles.card_information_col}>
              <AppText font="body2" style={styles.card_text_color}>
                <Ionicons name='eye-outline' /> {NumberUtility.toMetricNumber(place.numberOfVisited)}
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.card_buttons_container}>
          <CircleButton
            style={app_sp.me_8}
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'heart' : 'heart-outline'} size={14} style={currentLabelStyle} />
            )}
          />
          <CircleButton
            style={app_sp.me_8}
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'map' : 'map-outline'} size={14} style={currentLabelStyle} />
            )}
          />
          <RectangleButton
            isActive={place.isVisited}
            typeOfButton="highlight"
            overrideShape="capsule"
          >
            {(isActive, currentLabelStyle) => (
              <AppText style={currentLabelStyle} font="body2">{isActive ? 'Visited' : 'Visit'}</AppText>
            )}
          </RectangleButton>
        </View>
      </View>

      {/* Cột thứ 3 - Share Container */}
      <View style={styles.card_share_container}>
        <CircleButton
          isOnlyContent={true}
          setIcon={(isActive, currentLabelStyle) => (
            <Ionicons name="share-outline" size={20} style={currentLabelStyle} />
          )}
        />
      </View>
    </View>
  )
}

export default HorizontalPlaceCard