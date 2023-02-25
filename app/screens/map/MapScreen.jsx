import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import {
  Animated,
  Dimensions, 
  Image, 
  LayoutAnimation, 
  Platform, 
  Pressable, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View,
  Share,
  Keyboard
} from 'react-native'
import InputAutoComplete from 'components/input_auto_complete/InputAutoComplete'
import MapViewDirections from 'react-native-maps-directions'

import { coordinates } from 'utilities/coordinates'
import { typemapsearch } from 'utilities/typemapsearch'

import * as Location from 'expo-location'

import { markers, mapDarkStyle, mapStandardStyle, controls, typesPlace, rawImages } from 'utilities/mapdata'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import StarRating from 'components/star_rating/StarRating'
import { styles } from './MapScreenStyles'
import { useSelector } from 'react-redux'
import { selectCurrentManifold } from 'redux/manifold/ManifoldSlice'
import { app_c, app_dms, app_typo } from 'globals/styles'
import CircleButton from 'components/buttons/CircleButton'
import { BottomSheetScroll } from 'components'
import { dropDownAnimation } from 'animations/dropDownAnimation'
import { TouchableOpacityComponent } from 'react-native'
import { Linking } from 'react-native'
import { Buffer } from 'buffer'
import axios from 'axios'
import ImagePromise from 'components/image_promise/ImagePromise'
import { getPlaceDetailsAPI, getPlacesTextSearchAPI } from 'request_api'
import ReviewSectionPromise from 'components/review_section_promise/ReviewSectionPromise'

export default function Map() {
// Phương: https://docs.expo.dev/versions/latest/sdk/map-view/
// Phương: https://www.npmjs.com/package/react-native-google-places-autocomplete
// Phương: https://www.npmjs.com/package/react-native-maps-directions

  const map_api_key = useSelector(selectCurrentManifold).privateKeys?.map_api_key

  const CARD_HEIGHT = 240
  const CARD_WIDTH = app_dms.screenWidth * 0.8
  const SPACING_FOR_CARD_INSET = app_dms.screenWidth * 0.1 - 10

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState(null)
  const [showDirections, setShowDirections] = useState(false)
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)

  const [isModeScrollOn, setIsModeScrollOn] = useState(false)

  const [locationCurrent, setLocationCurrent] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [tagSelected, setTagSelected] = useState(typemapsearch[0].id)

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)
  const [isShowScrollCardPlace, setIsShowScrollCardPlace] = useState(false)

  const [placeDetails, setPlaceDetails] = useState(null)
  const [placesTextSearch, setPlacesTextSearch] = useState(null)

  const [arrImgBase64, setArrImgBase64] = useState([])

  const [isFocusedInput, setIsFocusedInput] = useState(false)
  const [isShowBackIcon, setIsShowBackIcon] = useState(false)
  const [previousTextSearch, setPreviousTextSearch] = useState('')
  
  const inputRef = useRef(null)
  
  const [currentCoorArr, setCurrentCoorArr] = useState(null)
  const [arrPlaceToFitCoor, setArrPlaceToFitCoor] = useState(null)


  const [isToggleOpenHours, setIsToggleOpenHours] = useState(false)
  const animationDropdown = useRef(new Animated.Value(0)).current
  const handleToggleOpenHoursAnimation = () => {
    const config = {
      duration: 500,
      toValue: isToggleOpenHours ? 0 : 1,
      useNativeDriver: true
    }
    Animated.timing(animationDropdown, config).start()
    LayoutAnimation.configureNext(dropDownAnimation)
    setIsToggleOpenHours(!isToggleOpenHours)
  }

  const arrowTranform = animationDropdown.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg', '-180deg']
  })

  const ASPECT_RATIO = app_dms.screenWidth / app_dms.screenHeight
  const LATITUDE_DELTA = 0.3
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  const INITIAL_POSITION = {
    latitude: 10.9160571,
    longitude: 106.8323861,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }

  const mapRef = useRef(null)
  const cardScrollViewRef = useRef(null)

  const [mapIndex, setMapIndex] = useState(0)
  // eslint-disable-next-line prefer-const
  let mapAnimation = new Animated.Value(0)
  // const interpolations = () => {
  //   if (placesTextSearch) {
  //     placesTextSearch?.map((place, index) => {
  //       const inputRange = [
  //         (index - 1) * CARD_WIDTH,
  //         index * CARD_WIDTH,
  //         ((index + 1) * CARD_WIDTH),
  //       ]
    
  //       const scale = mapAnimation.interpolate({
  //         inputRange,
  //         outputRange: [1, 2, 1],
  //         extrapolate: 'clamp'
  //       })
    
  //       return { scale }
  //     })
  //   }
  // }

  const interpolations = placesTextSearch?.map((place, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ]

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 2, 1],
      extrapolate: 'clamp'
    })

    return { scale }
  })
  
  useEffect(() => {
    if (placesTextSearch) {
      const edgePadding = {
        top: 70,
        right: 70,
        bottom: 260,
        left: 70
      }

      handleFitCoors(arrPlaceToFitCoor, edgePadding, true)
    }
  }, [isOpenBottomSheet])

  useEffect(() => {
    // Phuong: get permission's user about current location 
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      const userLocation = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        accuracy: Location.Accuracy.High,
      })
      console.log('🚀 ~ file: Map.js:81 ~ userLocation', userLocation)
      const position = {
        latitude: userLocation.coords.latitude || 0,
        longitude: userLocation.coords.longitude || 0
      }
      setOrigin(position)
      setLocationCurrent(position)
      moveToMap(position, 18, 0)
    })()

    const arrCoor = coordinates.geometries[0].coordinates[0][0]
    let arrLatLng = []
    arrCoor.map(coor => {
      let latlngObj = {
        latitude: coor[1],
        longitude: coor[0]
      }
      arrLatLng.push(latlngObj)
    })
    setCurrentCoorArr(arrLatLng)
  }, [])

  useEffect(() => {
    if (placesTextSearch) {
      mapAnimation.addListener(({ value }) => {
        // animate 30% away from landing on the next item
        let index = Math.floor(value / CARD_WIDTH + 0.3)
  
        if (index >= placesTextSearch.length) {
          index = placesTextSearch.length - 1
        }
        if (index <= 0) {
          index = 0
        }
  
        clearTimeout(regionTimeout)
        const regionTimeout = setTimeout(() => {
          if (mapIndex !== index) {
            setMapIndex(index)
            const coordinate = {
              latitude: placesTextSearch[index].geometry.location.lat,
              longitude: placesTextSearch[index].geometry.location.lng,
            }
            
            setIsModeScrollOn(true)
            moveToMap(coordinate, 12, 90)
          }
        }, 100)
      })
    }
  }, [CARD_WIDTH, mapAnimation, mapIndex])

  const moveToMap = async (position, zoom, pitch) => {
    mapRef.current?.animateCamera({
      center: {
        ...position
      },
      heading: 0,
      pitch: pitch,
      zoom: zoom
    }, 1000)
  }

  const handleFitCoors = (arrPlace ,edgePadding, haveAnimate) => {
    mapRef.current?.fitToCoordinates(
      arrPlace,
      { edgePadding: edgePadding },
      haveAnimate
    )
  }
  
  const onPlaceSelected = (details, flag) => {
    const set = (flag === 'origin') ? setOrigin : setDestination
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0
    }
    set(position)
    setIsOpenBottomSheet(true)
    setArrImgBase64([])
    setPlaceDetails(details)
    inputRef.current?.setAddressText(details?.name)
    setIsModeScrollOn(false)
    // moveToMap(position, 16)

    const arrPlace = [
      {
        latitude: details.geometry.viewport.northeast.lat,
        longitude: details.geometry.viewport.northeast.lng,
      },
      {
        latitude: details.geometry.viewport.southwest.lat,
        longitude: details.geometry.viewport.southwest.lng,
      }
    ]
    const edgePadding = {
      top: 0,
      right: 70,
      bottom: 180,
      left: 70
    }
    handleFitCoors(arrPlace, edgePadding , true)
  }

  const traceRouteOnReady = (args) => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance)
      setDuration(args.duration)
    }
  }

  const handleMarkerPress = (mapEventData) => {
    console.log('mapEventData', mapEventData)
    // eslint-disable-next-line no-underscore-dangle
    const markerID = mapEventData._targetInst.return.key

    let x = (markerID * CARD_WIDTH) + (markerID * 20)
    if (Platform.OS === 'ios') {
      x -= SPACING_FOR_CARD_INSET
    }

    cardScrollViewRef.current.scrollTo({ x, y: 0, animated: true })
  }

  const handleRoutePress = (locationDes) => {
    setShowDirections(true)
    setDestination(locationDes)
    setIsModeScrollOn(false)
    setIsShowScrollCardPlace(false)
    setIsOpenBottomSheet(false)
    
    const arrPlace = [locationCurrent, locationDes]
    const edgePadding = {
      top: 70,
      right: 70,
      bottom: 180,
      left: 70
    }
    handleFitCoors(arrPlace, edgePadding , true)
  }

  const handleGetPlaceDetails = (placeId) => {
    // console.log("🚀 ~ file: MapScreen.jsx:273 ~ handleGetPlaceDetails ~ e", e.nativeEvent.placeId)
    const data = {
      placeId: placeId
    }
    // console.log("🚀 ~ file: MapScreen.jsx:277 ~ handleGetPlaceDetails ~ data", data)
    getPlaceDetailsAPI(data).then((placeDetails) => {
      // console.log("🚀 ~ file: MapScreen.jsx:279 ~ getPlaceDetailsAPI ~ placeDetails", placeDetails)
      placeDetails.isTranformData = true
      onPlaceSelected(placeDetails, 'destination')
    })
  }

  const handleGetPlacesSearchText = (addressText) => {
    const data = {
      query: addressText,
      location: locationCurrent
    }
    getPlacesTextSearchAPI(data).then((placesTextSearch) => {
      // Đặt giá trị cho placesTextSearch
      setPlacesTextSearch(placesTextSearch)
      // Ẩn thằng bottomSheet đi
      setIsOpenBottomSheet(false)
      // Show thằng scroll card 
      setIsShowScrollCardPlace(true)
      // Show thằng back icon 
      setIsShowBackIcon(true)
      // Đặt kết quả tìm kiếm là addressText 
      setPreviousTextSearch(addressText)
      // Nơi đến bằng null
      setDestination(null)
      // Xóa PlaceDetails nếu như trước đó có 1 điểm đã đucợ chọn trc
      setPlaceDetails(null)
      // Không focus vào thnagừ search bar nữa
      
      inputRef.current?.blur()

      //  tổng hợp các arrPlace
      let arrPlace = []
      placesTextSearch.map(place => {
        const placeObj = {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        }
        arrPlace.push(placeObj)
      })

      const edgePadding = {
        top: 70,
        right: 70,
        bottom: 260,
        left: 70
      }

      handleFitCoors(arrPlace, edgePadding, true)
      setArrPlaceToFitCoor(arrPlace)
    })
  }

  const handleShareButton = async () => {
    if (Platform.OS === "android") {
      Share.share({
        message: `Hãy khám phá ${placeDetails?.name} cùng mình nha!`, // supporting android
        url: arrImgBase64[0], // not supporting
        title: 'DongNaiTravelApp',
      })
        .then((result) => console.log(result))
        .catch((errorMsg) => console.log(errorMsg))
      return
    } else if (Platform.OS === "ios") {
      Share.share({
         message:`Hãy khám phá ${placeDetails?.name} cùng mình nha!`,
         url: arrImgBase64[0],
         title: 'DongNaiTravelApp', // not supporting
       })
      
       .then((result) => console.log(result))
        .catch((errorMsg) => console.log(errorMsg))
      return
    }
  }

  return (
    <>
      {/* <View style={styles.headerBox}>
        <Text style={styles.headerText}>Map</Text>
      </View> */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        showsUserLocation={locationCurrent ? true : false}
        followsUserLocation
        onPoiClick={e => {
          handleGetPlaceDetails(e.nativeEvent.placeId)
        }}
        mapPadding={{
          top: 0,
          right: 0,
          bottom: isModeScrollOn ? 160 : 0,
          left: 0
        }}
      >
        {/* Show my result when I search location */}
        {(placeDetails && !placesTextSearch) ? <Marker coordinate={destination} /> : null}

        <Polyline
          coordinates={currentCoorArr}
          strokeWidth={1}
          strokeColor="#F85454"
        />
        
        {/* Arr marker show on map view */}
        {
          placesTextSearch ? 
          placesTextSearch.map((place, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            }
            const coordinate = {
              latitude: place.geometry.location.lat,
              longitude:  place.geometry.location.lng,
            }
            if (index === mapIndex) {
              return (
                <Animated.View
                  key={place.place_id}
                  style={[scaleStyle, {
                    elevation: 10
                  }]}
                >
                  <Marker
                    key={index}
                    coordinate={coordinate}
                    onPress={(e) => handleMarkerPress(e)}
                  />
                </Animated.View>
              )
            } else 
              return (
                <Animated.View
                  key={place.id}
                  style={[scaleStyle, {
                    elevation: 10
                  }]}
                >
                  <Marker
                    key={index}
                    coordinate={coordinate}
                    onPress={(e) => handleMarkerPress(e)}
                    pinColor={app_c.HEX.fourth}
                  />
                </Animated.View>
              )
          }) : 
          null
        }

        {
          (showDirections && origin && destination) ?
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={map_api_key}
            strokeColor={app_c.HEX.third}
            strokeWidth={4}
            onReady={traceRouteOnReady}
            language='vi'
            mode='DRIVING'
            precision='high'
            timePrecision='now'
          /> : null
        }
      </MapView>

      {/* Phuong: click outside inputautocomplete */}
      {
        isFocusedInput &&
          <Pressable
          style={styles.overlayBtn}
          onPress={() =>{
            setIsFocusedInput(false)
            inputRef.current?.blur()
          }}
        />
      }

      {/* Phuong: Tag list */}
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={40}
        style={styles.tagList}
        // Phương: Only Ios
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 25
        }}
        // Phương: For android
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 25 : 0
        }}
      >
        {
          typemapsearch.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.tagContainer, {
                backgroundColor: tagSelected === item.id ? app_c.HEX.fourth : app_c.HEX.primary
              }]}
              onPress={() => setTagSelected(item.id)}
            >
              <Text style={[styles.tagText, {
                color: tagSelected === item.id ? app_c.HEX.primary : app_c.HEX.fourth
              }]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>

      {/* Phuong: Search bar */}
      <View style={styles.seachTypeContainer}>
        <View style={styles.searchContainer}>
          <InputAutoComplete
            onPlaceSelected={(details) => {
              Keyboard.dismiss()
              onPlaceSelected(details, 'destination')
            }}
            isFocusedInput={isFocusedInput}
            handleFocus={(condition) => setIsFocusedInput(condition)}
            inputRef={inputRef}
            map_api_key={map_api_key}
            handleGetAddressText={(addressText) => {
              Keyboard.dismiss()
              handleGetPlacesSearchText(addressText)
            }}
            isShowBackIcon={isShowBackIcon}
            handlePressBackIcon={() => {
              if (isOpenBottomSheet) {
                setIsOpenBottomSheet(false)
                inputRef.current?.setAddressText(previousTextSearch)
                setPlacesTextSearch(null)
                setDestination(null)
              } else {
                setIsShowScrollCardPlace(false)
                setIsShowBackIcon(false)
                setPlacesTextSearch(null)
                setDestination(null)
                inputRef.current?.clear()
              }
            }}
          />
          {/* <TouchableOpacity
            style={styles.buttonRoute}
            onPress={traceRoute}
          >
            <Text style={styles.buttonText}>Trace</Text>
          </TouchableOpacity>
          {distance && duration ? (
            <View>
              <Text>Distance: {distance.toFixed(2)}</Text>
              <Text>Duration: {Math.ceil(duration)} min</Text>
            </View>
          ) : null} */}
        </View>
      </View>
      
      {/* Phuong: Button beside */}
      {
        (!isShowScrollCardPlace && !isOpenBottomSheet) ?
        <View
          style={styles.besideBtn}
        >
          {
            locationCurrent &&
            <TouchableOpacity
              style={[styles.circleBtn, {
                backgroundColor: app_c.HEX.primary,
              }]}
              onPress={() => moveToMap(locationCurrent, 18, 0)}
            >
              <FontAwesome5 
                name='location-arrow' 
                size={20} 
                color={app_c.HEX.third}
              />
            </TouchableOpacity>
          }

          {
            locationCurrent &&
            <TouchableOpacity
              style={[styles.circleBtn, {
                backgroundColor: app_c.HEX.third,
                marginTop: 10
              }]}
              onPress={() => {
                console.log('isShowScrollCardPlace', isShowScrollCardPlace)
                console.log('isOpenBottomSheet', isOpenBottomSheet)
                setIsShowScrollCardPlace(true)
              }}
            >
              <MaterialCommunityIcons 
                name='directions' 
                size={25} 
                color={app_c.HEX.primary}
              />
            </TouchableOpacity>
          }
        </View> : null
      }
      
      {/* Phuong: Scroll cards place */}
      {
        isShowScrollCardPlace ? 
        <Animated.ScrollView
          ref={cardScrollViewRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={[styles.cardScrollView, { opacity: isOpenBottomSheet ? 0 : 1, bottom: isOpenBottomSheet ? -110 : 110}]}
          contentInset={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 25
          }}
          contentContainerStyle={{
            paddingRight: Platform.OS === 'android' ? 25 : 0
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  }
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          {placesTextSearch.map((place) => (
            <View style={styles.card} key={place.place_id}>
              {
                place.photos ? 
                <ImagePromise
                  isTranformData={true}
                  photoReference={place?.photos[0]}
                  styleImage={styles.cardImage}
                  map_api_key={map_api_key}
                /> :
                <View 
                  style={styles.cardNoImage}
                >
                  <Text style={styles.noImageText}>No image</Text>
                </View>
              }
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{place.name}</Text>
                <StarRating 
                  ratings={place.rating} 
                  reviews={place.user_ratings_total} 
                  textRatingStyle={{...app_typo.fonts.body6}} 
                  textReviewStyle={{...app_typo.fonts.body6}}
                />
                <Text
                  numberOfLines={1}
                  style={styles.cardDescription}
                >
                  {place.editorial_summary ? place.editorial_summary : place.formatted_address}
                </Text>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      handleGetPlaceDetails(place.place_id)
                    }}
                    style={styles.scrollPlaceBtn}
                  >
                    <Text style={styles.textSign}>Tổng quan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRoutePress({
                      latitude: place.geometry.location.lat,
                      longitude: place.geometry.location.lng
                    })}
                    style={styles.scrollPlaceBtn}
                  >
                    <Text style={styles.textSign}>Đường đi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView> : null
      }
      
      <BottomSheetScroll
        openTermCondition={isOpenBottomSheet}
        closeTermCondition={() => {
          // console.log('closeTermCondition called')
          // if (!placesTextSearch) {
          //   inputRef?.current.clear()
          //   setPlaceDetails(null)
          // }
          setIsOpenBottomSheet(false)
        }}
        snapPoints={['20%', '40%', '100%']}
        haveBtn={false}
        haveOverlay={false}
        bottomView={{
          paddingHorizontal: 0,
          paddingBottom: 120,
        }}
        childView={
          <View>
            <Text style={styles.headerBottomSheet}>{placeDetails?.name}</Text>

            <View style={styles.contentContainer}>

              <View style={styles.typeTimeContainer}>
                {
                  placeDetails?.types.length > 0 &&
                  placeDetails?.types.map((type, index) => {
                    if (typesPlace[type])
                      return (
                        <View key={index} style={styles.textTypeContainer}>
                          <Text style={styles.textType}>{typesPlace[type].vi}</Text>
                        </View>
                      )
                  })
                }

                {/* Phuong: Này để làm sau hoặc có thể không làm */}
                {/* <View style={styles.timeContainer}>
                  <FontAwesome5 
                    name='walking' 
                    size={20} 
                    color={app_c.HEX.ext_second}
                  />
                  <Text style={styles.textTimeDirection}>6 phút</Text>
                </View> */}
              </View>

              {
                (placeDetails?.rating && placeDetails?.user_ratings_total) &&
                <StarRating 
                  ratings={placeDetails?.rating} 
                  reviews={placeDetails?.user_ratings_total} 
                  containerStyle={styles.starRating}
                  textRatingStyle={{color: app_c.HEX.ext_second, ...app_typo.fonts.body5}}
                  textReviewStyle={{color: app_c.HEX.ext_second, ...app_typo.fonts.body5}}
                />
              }

              {
                placeDetails?.current_opening_hours &&
                <View style={styles.dropDownContainer}>
                  <Pressable style={styles.statusTimeContainer} onPress={() => handleToggleOpenHoursAnimation()}>
                    <Text style={[styles.textStatus, {
                      color: '#C93F37'
                    }]}>{placeDetails?.current_opening_hours.open_now ? 'Đang mở cửa' : 'Đang đóng cửa'}</Text>
                    <Entypo 
                      name='dot-single' 
                      size={20} 
                      color={app_c.HEX.ext_second}
                    />
                    <Text style={styles.textTimeOpen}>Lịch mở cửa</Text>
                    <Animated.View style={{transform: [{rotateZ: arrowTranform}]}}>
                      <MaterialIcons 
                        name='keyboard-arrow-down' 
                        size={20} 
                        color={app_c.HEX.ext_second}
                      />
                    </Animated.View>
                  </Pressable>
                  {
                    isToggleOpenHours &&
                    <View style={styles.openHoursContainer}>
                      {
                        placeDetails?.current_opening_hours.weekday_text.map((weekdayText, index) => {
                          const arrWeekdayText = weekdayText.split(': ')
                          return (
                            <View key={index} style={styles.weekdayTextContainer}>
                              <View style={styles.weekdayTextCell}>
                                <Text style={styles.weekdayText}>{arrWeekdayText[0]}</Text>
                              </View>
                              <View style={styles.weekdayTextCell}>
                                <Text style={styles.weekdayText}>{arrWeekdayText[1]}</Text>
                              </View>
                              <View style={styles.spaceForWeekdayText}/>
                            </View>
                          )
                        })
                      }
                    </View>
                  }
                </View>
              }
            </View>
            
            {
              placeDetails?.formatted_address &&
              <Text style={[styles.formattedAddress, { marginTop: 5}]}>Địa chỉ: {placeDetails?.formatted_address}</Text>
            }

            {
              placeDetails?.formatted_phone_number &&
              <Text style={styles.formattedAddress}>Số điện thoại: {placeDetails?.formatted_phone_number}</Text>
            }

            {
              placeDetails?.website &&
              <Text style={styles.formattedAddress}>Website: {placeDetails?.website}</Text>
            }
            
            <ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              height={40}
              style={styles.controlListContainer}
              // Phương: Only Ios
              contentInset={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 25
              }}
              // Phương: For android
              contentContainerStyle={{
                paddingRight: Platform.OS === 'android' ? 25 : 0
              }}
            >
              <TouchableOpacity
                style={styles.controlContainer}
                onPress={() => {
                  // navigate to blog or explore screen
                }}
              >
                <FontAwesome5 
                  name='book-open' 
                  size={20} 
                  color={app_c.HEX.third}
                />
                <Text style={[styles.controlText, {
                  color: app_c.HEX.third
                }]}
                >Xem chi tiết</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlContainer}
                onPress={() => {
                  
                }}
              >
                <FontAwesome5 
                  name='directions' 
                  size={20} 
                  color={app_c.HEX.third}
                />
                <Text style={[styles.controlText, {
                  color: app_c.HEX.third
                }]}
                >Đường đi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlContainer}
                onPress={() => {
                  
                }}
              >
                <FontAwesome5 
                  name='location-arrow' 
                  size={20} 
                  color={app_c.HEX.third}
                />
                <Text style={[styles.controlText, {
                  color: app_c.HEX.third
                }]}
                >Bắt đầu</Text>
              </TouchableOpacity>

              {
                placeDetails?.website &&
                <TouchableOpacity
                  style={styles.controlContainer}
                  onPress={() => Linking.openURL(placeDetails?.website)}
                >
                  <FontAwesome5 
                    name='globe-americas' 
                    size={20} 
                    color={app_c.HEX.third}
                  />
                  <Text style={[styles.controlText, {
                    color: app_c.HEX.third
                  }]}
                  >Trang web</Text>
                </TouchableOpacity>
              }

              {
                placeDetails?.formatted_phone_number &&
                <TouchableOpacity
                  style={styles.controlContainer}
                  onPress={() => Linking.openURL(`tel:${placeDetails?.formatted_phone_number}`)}
                >
                  <FontAwesome5 
                    name='phone-alt' 
                    size={20} 
                    color={app_c.HEX.third}
                  />
                  <Text style={[styles.controlText, {
                    color: app_c.HEX.third
                  }]}
                  >Gọi</Text>
                </TouchableOpacity>
              }

              <TouchableOpacity
                style={styles.controlContainer}
                onPress={() => {
                  const arrCoor = coordinates.geometries[0].coordinates[0][0]
                  // console.log("🚀 ~ file: MapScreen.jsx:776 ~ Map ~ arrCoor", arrCoor)
                  let arrLatLng = []
                  arrCoor.map(coor => {
                    // console.log("🚀 ~ file: MapScreen.jsx:778 ~ Map ~ coor", coor)
                    let latlngObj = {
                      latitude: coor[1],
                      longitude: coor[0]
                    }
                    arrLatLng.push(latlngObj)
                  })
                  // console.log("cor", arrLatLng)
                }}
              >
                <FontAwesome5 
                  name='bookmark' 
                  size={20} 
                  color={app_c.HEX.third}
                />
                <Text style={[styles.controlText, {
                  color: app_c.HEX.third
                }]}
                >Lưu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlContainer}
                onPress={() => handleShareButton()}
              >
                <FontAwesome5 
                  name='share' 
                  size={20} 
                  color={app_c.HEX.third}
                />
                <Text style={[styles.controlText, {
                  color: app_c.HEX.third
                }]}
                >Chia sẻ</Text>
              </TouchableOpacity>
            </ScrollView>

            {
              placeDetails?.photos ?
              <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={320}
                style={styles.imgListContainer}
                // Phương: Only Ios
                contentInset={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 25
                }}
                // Phương: For android
                contentContainerStyle={{
                  paddingRight: Platform.OS === 'android' ? 25 : 0
                }}
              >
                {
                  placeDetails.photos.map((photo, index) => {
                    console.log('photo render')
                    const length = placeDetails?.photos.length
                    const stopLoopIndex = length % 3 === 0 ?  (length / 3) : (length /3) + 1
                    if (index < stopLoopIndex ) {
                      let endIndexImg = ((index + 1) * 3) - 1
                      if (placeDetails?.photos[0]?.photo_reference) {
                        if (placeDetails?.photos[endIndexImg-2]?.photo_reference)
                        return (
                          <View 
                            key={index}
                            style={styles.containerImg}
                          >
                            <ImagePromise
                              isTranformData={false}
                              photoReference={placeDetails?.photos[endIndexImg-2]?.photo_reference}
                              styleImage={styles.imgBigger}
                              map_api_key={map_api_key}
                              pushArrImgBase64={index ===0 ? (data) => setArrImgBase64([...arrImgBase64, data]) : null}
                            />
                            {
                              placeDetails?.photos[endIndexImg-1]?.photo_reference ?
                              <View style={[styles.containerImgSmaller, {
                                marginRight: 10
                              }]}> 
                                {
                                  placeDetails?.photos[endIndexImg-1]?.photo_reference ?
                                  <ImagePromise
                                    isTranformData={false}
                                    photoReference={placeDetails?.photos[endIndexImg-1]?.photo_reference}
                                    styleImage={[styles.imgSmaller, {
                                      marginBottom: 5
                                    }]}
                                    map_api_key={map_api_key}
                                    // pushArrImgBase64={(data) => setArrImgBase64([...arrImgBase64, data])}
                                  /> :
                                  <View style={styles.imgEmply}/>
                                }
                                {
                                  placeDetails?.photos[endIndexImg]?.photo_reference ?
                                  <ImagePromise
                                    isTranformData={false}
                                    photoReference={placeDetails?.photos[endIndexImg]?.photo_reference}
                                    styleImage={[styles.imgSmaller, {
                                      marginTop: 5
                                    }]}
                                    map_api_key={map_api_key}
                                    // pushArrImgBase64={(data) => setArrImgBase64([...arrImgBase64, data])}
                                  /> :
                                  <View style={styles.imgEmplyGray}/>
                                }
                              </View> : null
                            }
                          </View>
                        )
                      } else {
                        if (placeDetails?.photos[endIndexImg-2])
                        return (
                          <View 
                            key={index}
                            style={styles.containerImg}
                          >
                            <ImagePromise
                              isTranformData={true}
                              photoReference={placeDetails?.photos[endIndexImg-2]}
                              styleImage={styles.imgBigger}
                              map_api_key={map_api_key}
                              pushArrImgBase64={index ===0 ? (data) => setArrImgBase64([...arrImgBase64, data]) : null}
                            />
                            {
                              placeDetails?.photos[endIndexImg-1] &&
                              <View style={[styles.containerImgSmaller, {
                                marginRight: 10
                              }]}> 
                                {
                                  placeDetails?.photos[endIndexImg-1] ?
                                  <ImagePromise
                                    isTranformData={true}
                                    photoReference={placeDetails?.photos[endIndexImg-1]}
                                    styleImage={[styles.imgSmaller, {
                                      marginBottom: 5
                                    }]}
                                    map_api_key={map_api_key}
                                    // pushArrImgBase64={(data) => setArrImgBase64([...arrImgBase64, data])}
                                  /> :
                                  <View style={styles.imgEmply}/>
                                }
                                {
                                  placeDetails?.photos[endIndexImg] ?
                                  <ImagePromise
                                    isTranformData={true}
                                    photoReference={placeDetails?.photos[endIndexImg]}
                                    styleImage={[styles.imgSmaller, {
                                      marginTop: 5
                                    }]}
                                    map_api_key={map_api_key}
                                    // pushArrImgBase64={(data) => setArrImgBase64([...arrImgBase64, data])}
                                  /> :
                                  <View style={styles.imgEmplyGray}/>
                                }
                              </View>
                            }
                          </View>
                        )
                      }
                    }
                  })
                }
              </ScrollView> : 
              null
            }

            {
              placeDetails?.reviews ?
              <Text style={styles.headerReview}>Đánh giá và xếp hạng</Text> : null
            }

            {
              (placeDetails?.reviews) ?
              placeDetails?.reviews.map((review, index) => {
                return (
                  <ReviewSectionPromise
                    review={review}
                    key={index}
                    isTranformData={placeDetails?.isTranformData ? true : false}
                  />
                )
              }) : null
            }
          </View>
        }
      />
    </>
  )
}