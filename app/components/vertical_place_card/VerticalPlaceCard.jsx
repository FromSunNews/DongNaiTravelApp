import {
  View,
  Text,
  Image,
  ViewProps
} from 'react-native'
import React from 'react'

import {
  updateUserByCaseAPI
} from 'request_api'

import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import {
  usePlaceDetailsActions,
  useBriefPlacesActions
} from 'customHooks/usePlace'

import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import ComponentUtility from 'utilities/component'
import StringUtility from 'utilities/string'
import {
  UPDATE_USER_CASES
} from 'utilities/constants'

import Ionicons from 'react-native-vector-icons/Ionicons'

import AppText from 'components/app_text/AppText'
import RectangleButton from 'components/buttons/RectangleButton'
import CircleButton from 'components/buttons/CircleButton'

import styles from './VerticalPlaceCardStyles'
import { app_c, app_sh, app_sp } from 'globals/styles'

import { PlaceDataProps } from 'types/index.d.ts'
import useTheme from 'customHooks/useTheme'

/**
 * @typedef VerticalPlaceCardProps
 * @property {PlaceDataProps} place Thông tin về một địa điểm của một nơi nào đó.
 * @property {string} typeOfBriefPlace Type của brief places.
 * @property {number} placeIndex Index của place trong data của briefPlace. Cái này dùng để tìm place cho nhanh, khỏi dùng vòng lặp.
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
const VerticalPlaceCard = ({ place, placeIndex, typeOfBriefPlace, ...props }) => {
  const containerStyle = ComponentUtility.mergeStyle([styles.card, place.isRecommended ? {} : {}], props.style);
  const { addPlaceDetails } = usePlaceDetailsActions();
  const { updateBriefPlace } = useBriefPlacesActions(typeOfBriefPlace);
  const navigation = useNavigation();

  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.homeScreen
  //theme
  const themeColor = useTheme();

  const [extendedPlaceInfo, setExtendedPlaceInfo] = React.useState({
    isLiked: place.isLiked ? true : false,
    isVisited: place.isVisited ? true : false
  });

  const getTextContentInHTMLTag = React.useCallback(
    StringUtility.createTextContentInHTMLTagGetter("<span class=\"(locality|region)\">", "<\/span>")
  , []);

  let [city, province] = getTextContentInHTMLTag(place.adr_address);

  const handlePressImageButton = () => {
    addPlaceDetails(place);
    navigation.push('PlaceDetailScreen', {
      placeId: place.place_id
    });
  }

  const handleLikeButton = () => {
    setExtendedPlaceInfo(prevState => {
      let isLiked = true;
      let updateCase = UPDATE_USER_CASES['addEle:savedPlaces'];
      if(prevState.isLiked) {
        isLiked = false;
        updateCase = UPDATE_USER_CASES['removeEle:savedPlaces'];
      }
      let data = {
        updateCase: updateCase,
        updateData: place.place_id
      }
      updateUserByCaseAPI(data)
      .then(user => {
        // Update lên store.
        updateBriefPlace(place.place_id, placeIndex, { isLiked: isLiked })
      })
      .catch(error => {
        setExtendedPlaceInfo(prevState => ({...prevState, isLiked: !isLiked}))
        console.error(error.message)
      })
      return {...prevState, isLiked: isLiked}
    })
  }

  React.useEffect(() => {
    // console.log("Isliked from place: ", Boolean(place.isLiked));
    
    if(Boolean(place.isLiked) !== extendedPlaceInfo.isLiked) {
      setExtendedPlaceInfo(prevState => ({...prevState, isLiked: Boolean(place.isLiked)}))
    }
  }, [place.isLiked, place.isVisited]);

  return React.useMemo(() => (
    <View {...props} style={[containerStyle,{backgroundColor: themeColor.ext_primary,}]}>
      {/* Image */}
      <RectangleButton
        isOnlyContent
        typeOfButton="none"
        overrideShape="rounded_4"
        onPress={handlePressImageButton}
      >
        <Image source={place.place_photos.length > 0 ? {uri: place.place_photos[0].photos[0]} : {}} style={[styles.card_image,{backgroundColor: themeColor.ext_primary,}]} />
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
            <Ionicons name="star-outline" /> {place.rating}
          </AppText>
          <AppText numberOfLines={1} font="body2">
            <Ionicons name="location-outline" /> {StringUtility.toTitleCase(city)}{province && " - "}{StringUtility.toTitleCase(province)}
          </AppText>
        </View>
      </View>

      {/* Like button */}
      <View style={styles.card_buttons_container}>
        <RectangleButton
          isActive={extendedPlaceInfo.isLiked}
          isTransparent
          typeOfButton="opacity"
          style={styles.card_button}
          onPress={handleLikeButton}
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
  ), [extendedPlaceInfo.isLiked, extendedPlaceInfo.isVisited, place.rating, place.numberOfVisited, place.user_ratings_total,themeColor])
}

export default VerticalPlaceCard