import {
  View,
  Text,
  Pressable,
  ScrollView,
  Animated,
  Image,
  FlatList
} from 'react-native'
import React from 'react'

import {
  getPlaceDetailsWithPipelineAPI,
  getPlacesAPI
} from 'request_api'

import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import useTheme from 'customHooks/useTheme'
import {
  usePlaceDetailsState,
  usePlaceDetailsActions,
  usePlaceDetails,
  usePlaceInteractionActions,
  useBriefPlacesActions
} from 'customHooks/usePlace'
import {
  useAudio
} from 'customHooks/useAudio'

import StringUtility from 'utilities/string'
import {
  HEADER_HEIGHT,
  PLACE_DETAILS_DATA_FIELDS,
  BRIEF_PLACE_DATA_FIELDS
} from 'utilities/constants'

import BottomSheet, { BottomSheetView, BottomSheetScrollView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  AppText,
  MyFadeAnimatedView,
  MyHeader,
  RectangleButton,
  CircleButton,
  AppTabSlider,
  SimpleBarChart,
  MarkFormat,
  HorizontalPlaceCard,
  HorizontalPlaceCardSkeleton,
  ReviewSectionPromise
} from 'components'

import styles from './PlaceDetailScreenStyles'
import { app_c, app_dms, app_sp } from 'globals/styles'

import {
  PlaceDetailsDataProps
} from 'types/index.d.ts'

/**
 * __Creator__: @NguyenAnhTuan1912
 * @returns 
 */
const PlaceDetailScreen = ({route, navigation}) => {
  const { placeId, typeOfBriefPlace, fromSearch } = route.params;

  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.placeDetailScreen
  const langVisit = useSelector(selectCurrentLanguage).data?.exploreScreen
  //theme
  const themeColor = useTheme();

  const { placeDetails, fetchPlaceDetails, clearPlaceDetails } = usePlaceDetails(placeId);
  const { updateBriefPlace } = useBriefPlacesActions(typeOfBriefPlace);
  const { extendedPlaceInfo, likePlace, visitPlace } = usePlaceInteractionActions(placeDetails);

  const snapPoints = React.useMemo(
    () => ['60%', `${100- (30 / app_dms.screenHeight) * 100}%`], []
  );
    
  const bottomSheetRef = React.useRef(null);
  const opacityValue = React.useRef(new Animated.Value(0)).current;

  const presentationImageUrl = placeDetails.place_photos && placeDetails.place_photos.length > 0 ? placeDetails.place_photos[0] : undefined

  const animFade = React.useCallback((toValue) => {
    Animated.timing(
      opacityValue,
      {
        toValue: toValue,
        duration: 200,
        useNativeDriver: true
      }
    ).start();
  }, [opacityValue]);

  const handleChangeBottomSheet = index => {
    if(index === 1) {
      animFade(1);
    } else {
      animFade(0);
    }
  }

  /**
     * Hàm này dùng để yêu thích / bỏ yêu thích một place, nó sẽ gửi id của place về server và tự server nó sẽ xử lý.
     */
  const handleLikeButton = () => likePlace(
    (data, state) => updateBriefPlace(placeDetails.place_id, 0, { isLiked: state }),
    (state) => updateBriefPlace(placeDetails.place_id, 0, { isLiked: state })
  )

  /**
   * Hàm này dùng để yêu thích / bỏ yêu thích một place, nó sẽ gửi id của place về server và tự server nó sẽ xử lý.
   */
  const handleVisitButton = () => visitPlace(
    (data, state) => updateBriefPlace(placeDetails.place_id, 0, { isVisited: state }),
    (state) => updateBriefPlace(placeDetails.place_id, 0, { isVisited: state })
  )
  
  React.useEffect(() => {
    navigation.setOptions({'title': placeDetails.name})
    fetchPlaceDetails(placeId, {
      canGetComplete: fromSearch,
      lang: langCode
    });
    return () => { clearPlaceDetails(placeId) }
  }, [langCode]);

  return (
    <View style={{backgroundColor: themeColor.ext_third, flex: 1}}>
      <Animated.View
        style={{
          opacity: opacityValue,
          backgroundColor: themeColor.primary,
          height: HEADER_HEIGHT,
          zIndex: 999
        }}
      />
      <Image
        source={presentationImageUrl ? {uri: presentationImageUrl} : {}}
        style={styles.pd_background_image}
      />
      <BottomSheet
        snapPoints={snapPoints}
        index={0}
        ref={bottomSheetRef}
        style={styles.pd_bottom_sheet}
        onChange={handleChangeBottomSheet}
        backgroundStyle={{
          flex: 1,
          backgroundColor: themeColor.primary
        }}
      >
        <BottomSheetScrollView
          style={[styles.pd_bottom_sheet_view, { backgroundColor: themeColor.primary }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.pd_header, app_sp.ph_18, { borderBottomColor: themeColor.fourth }]}>

            {/* Information row */}
            <View style={{...styles.pd_row, ...app_sp.mb_12}}>

              {/* Name, location of visits column */}
              <View style={[{flex: 1}, app_sp.me_12]}>
                <AppText font="h2" numberOfLines={2}>{placeDetails.name}</AppText>
                <AppText font="sub0">{placeDetails.formatted_address}</AppText>
              </View>

              {/* Ratings, number of visits column */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppText font="body2" style={app_sp.me_12}>
                  <Ionicons name='star-outline' color={themeColor.fourth} /> {placeDetails.rating}
                </AppText>
                <AppText font="body2" style={{}}>
                  <Ionicons name='eye-outline' color={themeColor.fourth} /> {placeDetails.numberOfVisited}
                </AppText>
              </View>
            </View>

            {/* Buttons container row */}
            <View style={{...styles.pd_row, ...app_sp.mb_12}}>
              <CircleButton
                isActive={extendedPlaceInfo.isLiked}
                style={app_sp.me_8}
                typeOfButton="highlight"
                setIcon={(isActive, currentLabelStyle) => (
                  <Ionicons name={isActive ? 'heart' : 'heart-outline'} size={14} style={currentLabelStyle} />
                )}
                onPress={handleLikeButton}
              />
              <CircleButton
                style={app_sp.me_8}
                typeOfButton="highlight"
                setIcon={(isActive, currentLabelStyle) => (
                  <Ionicons name={isActive ? 'map' : 'map-outline'} size={14} style={currentLabelStyle} />
                )}
              />
              <RectangleButton
                isActive={extendedPlaceInfo.isVisited}
                typeOfButton="highlight"
                overrideShape="capsule"
                onPress={handleVisitButton}
              >
                {(isActive, currentLabelStyle) => (
                  <AppText style={currentLabelStyle} font="body2">{isActive ? langVisit.visited[langCode] : langVisit.visit[langCode]}</AppText>
                )}
              </RectangleButton>
            </View>

            {/* Tags container row */}
            <View style={[styles.pd_row, app_sp.mb_12, {flexWrap: 'wrap'}]}>
              <AppText font="body2" style={app_sp.me_12}>
                <Ionicons name='pricetag-outline' /> Tags:
              </AppText>
              {
                placeDetails.types && placeDetails.types.map(
                  type => (
                    <RectangleButton
                      key={type}
                      typeOfButton="highlight"
                      overrideShape="rounded_4"
                      style={[app_sp.ph_8, app_sp.pv_0, app_sp.me_6, app_sp.mb_6]}
                    >
                      {(isActive, currentLabelStyle) => (
                        <AppText style={currentLabelStyle} font="body3">{StringUtility.toTitleCase(type)}</AppText>
                      )}
                    </RectangleButton>
                  )
                )
              }
            </View>
          </View>
          
          {/* Tabs */}
          <AppTabSlider>
            <AppTabSlider.Child
              name={langData.about[langCode]}
              component={() => <AboutSlide placeId={placeId} />}
            />
            <AppTabSlider.Child
              name={langData.review[langCode]}
              component={() => <ReviewsSlide placeId={placeId} />}
            />
          </AppTabSlider>
          
          <View style={{height: 125}}></View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

const AboutSlide = ({placeId}) => {
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.placeDetailScreen

  const placeDetails = usePlaceDetailsState(placeId);
  const { playAudioAsync, stopAudioAsync, prepareMP3Async, canPlay } = useAudio();

  const [voice, setVoice] = React.useState(false);
  const [relatedPlaces, setRelatedPlaces] = React.useState([]);
  
  const imageUrls = placeDetails.place_photos ? placeDetails.place_photos : [];
  const type = placeDetails.types ? placeDetails.types[0] : "";
  const speechMP3Url = placeDetails.content ? placeDetails.content.speech[langCode] : "";

  React.useEffect(() => {
    if(relatedPlaces.length === 0) {
      let query = `limit=${5}&skip=${0}&filter=type:${type},except_by_placeid:${placeDetails.place_id}&fields=${BRIEF_PLACE_DATA_FIELDS}`;
      getPlacesAPI(query)
      .then(data => {
        setRelatedPlaces(data);
      })
      .catch(error => console.error(error))
    }

    if(Boolean(speechMP3Url)) {
      let audioVoicePrefix = langCode === "vi" ? "VN" : langCode.toUpperCase();
      let url = voice ? speechMP3Url[`${audioVoicePrefix}_MALE_1`] : speechMP3Url[`${audioVoicePrefix}_FEMALE_1`]
      prepareMP3Async(url);
    }
  }, [speechMP3Url, voice])

  return (
    <View style={styles.pd_content_container}>
      {/* Read */}
      <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, app_sp.ph_18, app_sp.mb_12]}>
        <View>
          <AppText font="h3" style={app_sp.mb_6}>Read</AppText>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <RectangleButton
              disabled={!canPlay}
              typeOfButton='opacity'
              onPress={playAudioAsync}
              defaultColor='type_4'
              style={[app_sp.me_6]}
              overrideShape='capsule'
            >
              {
                (isActive, currentLabelStyle) => (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons style={currentLabelStyle} name="play-outline" />
                    <AppText style={currentLabelStyle}> / </AppText>
                    <Ionicons style={currentLabelStyle} name="pause-outline" />
                  </View>
                )
              }
            </RectangleButton>
            <RectangleButton
              disabled={!canPlay}
              typeOfButton='opacity'
              onPress={stopAudioAsync}
              overrideShape='capsule'
            >
              {
                (isActive, currentLabelStyle) => (
                  <Ionicons style={currentLabelStyle} name="stop-outline" />
                )
              }
            </RectangleButton>
          </View>
        </View>

        <View>
          <AppText font="h3" style={app_sp.mb_6}>Voice</AppText>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <RectangleButton
              isActive={!voice}
              disabled={!canPlay}
              typeOfButton='opacity'
              onPress={() => setVoice(false)}
              style={[app_sp.me_6]}
              overrideShape='capsule'
            >
              {
                (isActive, currentLabelStyle) => <AppText style={currentLabelStyle}>Female</AppText>
              }
            </RectangleButton>
            <RectangleButton
              isActive={voice}
              disabled={!canPlay}
              typeOfButton='opacity'
              onPress={() => setVoice(true)}
              overrideShape='capsule'
            >
              {
                (isActive, currentLabelStyle) => <AppText style={currentLabelStyle}>Male</AppText>
              }
            </RectangleButton>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={[styles.pd_content_article, app_sp.ph_18]}>
        <AppText font="h3" numberOfLines={1} style={app_sp.mb_6}>{langData.description[langCode]}</AppText>
        <AppText color="ext_second">
          {
            placeDetails.content
            ? (
              <MarkFormat text={placeDetails.content.plainTextMarkFormat[langCode]} />
            )
            : langData.descriptionMessage[langCode]
          }
        </AppText>
      </View>

      {/* Images */}
      <View style={styles.pd_content_article}>
        <AppText font="h3" numberOfLines={1} style={[app_sp.mb_6, app_sp.ph_18]}>{langData.image[langCode]}</AppText>
        <View style={styles.pd_content_image_row_container}>
          <ScrollView
            style={app_sp.mb_12}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              imageUrls.map((url, index) => {
                let actualStyle = [styles.pd_content_image_button, app_sp.me_18];
                if(index === 0) actualStyle.push(app_sp.ms_18);
                return (
                  <RectangleButton
                    isOnlyContent
                    typeOfButton="highlight"
                    overrideShape="rounded_8"
                    style={actualStyle}
                    key={url}
                  >
                    <Image
                      source={{uri: url}}
                      style={{width: '100%', aspectRatio: 1}}
                    />
                  </RectangleButton>
                )
              })
            }
          </ScrollView>
        </View>
      </View>

      {/* Related Places */}
      <View style={{
        ...styles.pd_content_article,
        flexDirection: 'row',
        justifyContent:
        'space-between',
        alignItems: 'center',
        ...app_sp.ph_18
      }}>
        <AppText font="h3" numberOfLines={1} style={app_sp.mb_6}>{langData.relatedPlaces[langCode]}</AppText>
        <CircleButton
          isTransparent
          typeOfButton="highlight"
          setIcon={(isActive, currentLabelStyle) => (
            <Ionicons style={currentLabelStyle} name="chevron-forward-outline" size={18} />
          )}
        />
      </View>
      <View style={[app_sp.ph_18]}>
        {
          relatedPlaces.length === 0
          ? 
          <View style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AppText>{langData.relatedPlacesDataMessage[langCode]}</AppText>
            <Image 
              source={require('../../assets/images/no-data.png')} 
              style={{
                height: 300,
                width: 300,
                alignSelf: 'center'
              }}/>
          </View>
          : (
            relatedPlaces.map(relatedPlace => (
              <HorizontalPlaceCard key={relatedPlace.placeId} place={relatedPlace} />
            ))
          )
        }
      </View>
    </View>
  );
}

const ReviewsSlide = ({placeId}) => {
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.placeDetailScreen
  
  const placeDetails = usePlaceDetailsState(placeId);

  const [reviews, setReviews] = React.useState(null);
  
  const dataSet = React.useMemo(() => ([
      {
        index: '5',
        value: 987
      },
      {
        index: '4',
        value: 235
      },
      {
        index: '3',
        value: 289
      },
      {
        index: '2',
        value: 1039
      },
      {
        index: '1',
        value: 3078
      }
    ]
  ), [])

  React.useEffect(() => {
    setTimeout(() => {
      setReviews(placeDetails.reviews)
    }, 500);
  }, []);

  return (
    <View style={[styles.pd_content_container, app_sp.ph_18]}>
      {/* Review rating information */}
      <View>
        <AppText font="h3" style={app_sp.mb_12}>{langData.review_texth3[langCode]}</AppText>
        
        {/* Rating statistic */}
        <View style={styles.pd_content_rr_stats_container}>
          <View style={styles.pd_content_rr_rating_point_container}>
            <AppText font="h0">4.6</AppText>
            <AppText font="body3">out of 5</AppText>
          </View>

          {/* Line Chart */}
          <View style={styles.pd_content_rr_chart_container}>
            <View style={app_sp.mb_12}>
              <SimpleBarChart dataSet={dataSet} />
            </View>
            <AppText font="body3" style={{textAlign: 'right'}}>5.6k ratings & reviews</AppText>
          </View>
        </View>
      </View>

      {/* Reviews */}
      <View style={app_sp.mt_12}>
        {
          reviews
          ? (
            reviews.map(review => (
              <ReviewSectionPromise key={review.time} review={review} />
            ))
          ) :
          (
            <AppText>This place haven't reviewed yet.</AppText>
          )
        }
      </View>
      <View style={{height: 50}}></View>
    </View>
  );
}

export default PlaceDetailScreen