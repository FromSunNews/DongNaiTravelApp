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
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Đây là card nằm ngang, hiển thị một số thông tin cơ bản của một địa điểm nào đó. Có thể ấn vào để xem chi tiết
 * một địa điểm nào đó. Một card sẽ chứa 3 cột. Cột đâu tiên là dành cho ảnh, cột thứ 2 là giành cho nội dung chính
 * và cột cuói cùng là giành cho nút share.
 * @param {object} place - Thông tin về một địa điểm của một nơi nào đó.
 * @param {string} place.name - Tên địa điểm.
 * @param {string} place.avatar - Ảnh đại diện cho địa điểm.
 * @param {object} place.location - Location giống với place, nhưng nó sẽ rộng hơn, ở cấp thành phố đổ lên.
 * @param {string} place.location.province - Tên của tỉnh.
 * @param {string} place.location.city - Tên của thành phố.
 * @param {Array<object>} place.tags - Các thể loại danh mục.
 * @param {number} place.ratingPoints - Điểm rating.
 * @param {number} place.numberOfReviews - Số lượng người dùng đã đánh giá (viết comment review).
 * @param {number} place.numberOfVisited - Số lượng người dùng đã đến tham quan.
 * @param {boolean} place.isRecommended - Có được đề xuất hay không?.
 * @param {boolean} place.isVisited - Có đến đây thăm hay chưa? (Đây là một trường ghép từ User và Place, được tạo trong quá trình chuẩn bị dữ liệu).
 * @returns unknown.
 */
const HorizontalPlaceCard = ({place}) => {
  const navigation = useNavigation()

  const handlePressImageButton = () => {
    navigation.navigate({name: 'PlaceDetailStackScreen'});
  }

  return (
    <View style={styles.card}>
      {/* Cột đâu tiên - Image Container */}
      <RectangleButton
        isOnlyContent
        typeOfButton="none"
        overrideShape="rounded_4"
        handlePressButton={handlePressImageButton}
        style={{
          ...app_sp.me_12
        }}
      >
        <ImageBackground
          style={styles.card_image_container}
          source={{uri: place.avatar}}
        >
          {
            place.isRecommended &&
            <View style={styles.card_recommended_mark_container}>
              <AppText font="body3" color="ext_second">Recommended</AppText>
            </View>
          }
        </ImageBackground>
      </RectangleButton>

      {/* Cột thứ 2 - Main Container */}
      <View style={styles.card_main_container}>
        <View style={styles.card_content_container}>
          <View style={styles.card_tag_container}>
            {place.tags.map((tag, index) => (
              <AppText font="body3" style={styles.card_text_color} key={tag.title}>{tag.title}{index < place.tags.length - 1 ? ", " : ""}</AppText>
            ))}
          </View>
          <View>
            <AppText numberOfLines={1} font="h4" style={styles.card_title}>{place.name}</AppText>
            <AppText style={styles.car_subtitle} font="body3">{place.location.city} - {place.location.province}</AppText>
          </View>
          <View style={styles.card_information_container}>
            <View style={styles.card_information_col}>
              <AppText font="body3" style={styles.card_text_color}>
                <Ionicons name='star-outline' /> {place.ratingPoints}
              </AppText>
              <AppText font="body3" style={styles.card_text_color}>
                <Ionicons name='chatbubble-outline' /> {NumberUtility.toMetricNumber(place.numberOfReviews)}
              </AppText>
            </View>
            <View style={styles.card_information_col}>
              <AppText font="body3" style={styles.card_text_color}>
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
              <AppText style={currentLabelStyle} font="body3">{isActive ? 'Visited' : 'Visit'}</AppText>
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