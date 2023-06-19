import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

import NumberUtility from 'utilities/number'
import StringUtility from 'utilities/string'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { withPlaceCard } from 'hocs/withPlaceCard'
import AppText from '../app_text/AppText'
import RectangleButton from '../buttons/RectangleButton'
import CircleButton from '../buttons/CircleButton'

import styles from './HorizontalPlaceCardStyles'
import { app_sp } from 'globals/styles'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import {
  PlaceDataProps,
  WithPlaceCardWrappedComponentProps
} from 'types/index.d.ts'
import { useNavigation } from '@react-navigation/native'

/**
 * @typedef HorizontalPlaceCardProps
 * @property {PlaceDataProps} place Thông tin về một địa điểm của một nơi nào đó.
 * @property {string} typeOfBriefPlace Type của brief places.
 * @property {number} placeIndex Index của place trong data của briefPlace. Cái này dùng để tìm place cho nhanh, khỏi dùng vòng lặp.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Đây là card nằm ngang, hiển thị một số thông tin cơ bản của một địa điểm nào đó. Có thể ấn vào để xem chi tiết
 * một địa điểm nào đó. Một card sẽ chứa 3 cột. Cột đâu tiên là dành cho ảnh, cột thứ 2 là giành cho nội dung chính
 * và cột cuói cùng là giành cho nút share.
 * @param {WithPlaceCardWrappedComponentProps} props Props của component.
 * @returns Thẻ ngang chứa các thông tin cơ bản của một địa điểm.
 */
const HorizontalPlaceCard = ({
  place,
  placeIndex,
  typeOfBriefPlace,
  extendedPlaceInfo,
  addPlaceDetails,
  updateBriefPlace,
  getTextContentInHTMLTag,
  handlePressImageButton,
  handleLikeButton,
  ...props
}) => {
  const navigation = useNavigation()
  const langCode = useSelector(selectCurrentLanguage).languageCode 
  const langData = useSelector(selectCurrentLanguage).data?.exploreScreen

  let [city, province] = getTextContentInHTMLTag(place.adr_address);
  let presentationImage = place && place.place_photos ? {uri: place.place_photos[0]} : {}

  console.log("User favorites total: ", place.user_favorites_total);

  return React.useMemo(() => (
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
          source={presentationImage}
        >
          {
            place.isRecommended &&
            <View style={styles.card_recommended_mark_container}>
              <AppText font="body2" color="ext_second">{langData.place_card_recommended[langCode]}</AppText>
            </View>
          }
        </ImageBackground>
      </RectangleButton>

      {/* Cột thứ 2 - Main Container */}
      <View style={styles.card_main_container}>
        <View style={styles.card_content_container}>
          <View style={styles.card_tag_container}>
            <AppText
              font="body2"
              style={styles.card_text_color}
              numberOfLines={1}
            >
              {place.types.map((type, index) => (
                StringUtility.toTitleCase(type)
              )).join(", ")}
            </AppText>
          </View>
          <View>
            <AppText numberOfLines={1} font="h3" style={styles.card_title}>{place.name}</AppText>
            <AppText style={styles.car_subtitle} font="body2">{StringUtility.toTitleCase(city)}{province && " - "}{StringUtility.toTitleCase(province)}</AppText>
          </View>
          <View style={styles.card_information_container}>
            <View style={styles.card_information_col}>
              <AppText font="body2" style={styles.card_text_color}>
                <Ionicons name='star-outline' /> {place.rating}
              </AppText>
              <AppText font="body2" style={styles.card_text_color}>
                <Ionicons name='chatbubble-outline' /> {NumberUtility.toMetricNumber(place.user_ratings_total)}
              </AppText>
            </View>
            <View style={styles.card_information_col}>
              <AppText font="body2" style={styles.card_text_color}>
                <Ionicons name='heart-outline' /> {NumberUtility.toMetricNumber(place.user_favorites_total)}
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.card_buttons_container}>
          <CircleButton
            isActive={extendedPlaceInfo.isLiked}
            style={app_sp.me_8}
            typeOfButton="highlight"
            onPress={handleLikeButton}
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'heart' : 'heart-outline'} size={14} style={currentLabelStyle} />
            )}
          />
          <CircleButton
            style={app_sp.me_8}
            typeOfButton="highlight"
            onPress={() => navigation.navigate('MapScreen', { place_id: place.place_id })}
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'map' : 'map-outline'} size={14} style={currentLabelStyle} />
            )}
          />
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
  ), [extendedPlaceInfo.isLiked, place.rating, place.user_favorites_total, place.user_ratings_total]);
}

export default withPlaceCard(HorizontalPlaceCard)