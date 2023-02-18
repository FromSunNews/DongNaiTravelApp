import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
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
  View
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
import ReviewCard from 'components/review_section_promise/ReviewSectionPromise'
import ImagePromise from 'components/image_promise/ImagePromise'

export default function Map() {
// Phương: https://docs.expo.dev/versions/latest/sdk/map-view/
// Phương: https://www.npmjs.com/package/react-native-google-places-autocomplete
// Phương: https://www.npmjs.com/package/react-native-maps-directions

  const map_api_key = useSelector(selectCurrentManifold).privateKeys.map_api_key

  const CARD_HEIGHT = 220
  const CARD_WIDTH = app_dms.screenWidth * 0.8
  const SPACING_FOR_CARD_INSET = app_dms.screenWidth * 0.1 - 10

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState(null)
  const [showDirections, setShowDirections] = useState(false)
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)

  const [locationCurrent, setLocationCurrent] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [tagSelected, setTagSelected] = useState(typemapsearch[0].id)

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)
  const [placeDetails, setPlaceDetails] = useState(null)

  const [isFocusedInput, setIsFocusedInput] = useState(false)
  const inputRef = useRef(null)
  
  let endIndexImg = 1

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
  const interpolations = markers.map((marker, index) => {
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
    })()
    
  }, [])

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      // animate 30% away from landing on the next item
      let index = Math.floor(value / CARD_WIDTH + 0.3)

      if (index >= markers.length) {
        index = markers.length - 1
      }
      if (index <= 0) {
        index = 0
      }

      clearTimeout(regionTimeout)
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          setMapIndex(index)
          setDestination(markers[index].coordinate)
          const { coordinate } = markers[index]
          moveToMap(coordinate)
        }
      }, 10)
    })
  }, [CARD_WIDTH, mapAnimation, mapIndex])

  useEffect(() => {
    if (placeDetails) {
      setIsOpenBottomSheet(true)
    } else
      setIsOpenBottomSheet(false)
  }, [placeDetails])

  const moveToMap = async (position, zoom) => {
    mapRef.current?.animateCamera({
      center: {
        ...position
      },
      pitch: 0,
      heading: 0,
      zoom: zoom
    }, 1000)
  }

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true)
      mapRef.current?.fitToCoordinates(
        [origin, destination],
        {
          edgePadding: {
            top: 70,
            right: 70,
            bottom: 70,
            left: 70
          }
        }
      )
    }
  }
  
  const onPlaceSelected = (details, flag) => {
    const set = (flag === 'origin') ? setOrigin : setDestination
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0
    }
    set(position)
    setPlaceDetails(details)
    moveToMap(position, 16)
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

  const handleExlorePress = (coordinate) => {
    setShowDirections(true)
    mapRef.current?.fitToCoordinates(
      [locationCurrent, coordinate],
      {
        edgePadding: {
          top: 180,
          right: 70,
          bottom: 150,
          left: 70
        }
      }
    )
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
        paddingAdjustmentBehavior='automatic'
      >
        {/* Show my result when I search location */}
        {destination && <Marker coordinate={destination}/>}

        {/* {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          }
          if (index === mapIndex) {
            return (
              <Animated.View
                key={marker.id}
                style={[scaleStyle, {
                  elevation: 10
                }]}
              >
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  onPress={(e) => handleMarkerPress(e)}
                />
              </Animated.View>
            )
          }
          return (
            <Animated.View
              key={marker.id}
              style={[scaleStyle, {
                elevation: 10
              }]}
            >
              <Marker
                key={index}
                coordinate={marker.coordinate}
                onPress={(e) => handleMarkerPress(e)}
                pinColor={app_c.HEX.fourth}
              />
            </Animated.View>
          )

        })} */}

        {/* {
          (showDirections && origin && destination) && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={map_api_key}
              strokeColor={app_c.HEX.third}
              strokeWidth={5}
              onReady={traceRouteOnReady}
              language='vi'
              mode='DRIVING'
              // precision='high'
              // timePrecision='now'
            />
          )
        } */}
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
            onPlaceSelected={(details) => onPlaceSelected(details, 'destination')}
            isFocusedInput={isFocusedInput}
            handleFocus={(condition) => setIsFocusedInput(condition)}
            inputRef={inputRef}
            map_api_key={map_api_key}
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
      <View
        style={styles.besideBtn}
      >
        {
          locationCurrent &&
          <TouchableOpacity
            style={[styles.circleBtn, {
              backgroundColor: app_c.HEX.primary,
            }]}
            onPress={() => moveToMap(locationCurrent, 18)}
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
          >
            <MaterialCommunityIcons 
              name='directions' 
              size={25} 
              color={app_c.HEX.primary}
            />
          </TouchableOpacity>
        }

        
      </View>
      
      {/* Phuong: direction */}
      {/* {
        !showDirections
        && (
          <Animated.ScrollView
            ref={cardScrollViewRef}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={styles.cardScrollView}
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
            {markers.map((marker) => (
              <View style={styles.card} key={marker.id}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                  <StarRating ratings={marker.rating} reviews={marker.reviews} />
                  <Text
                    numberOfLines={1}
                    style={styles.cardDescription}
                  >
                    {marker.description}
                  </Text>
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => handleExlorePress(marker.coordinate)}
                      style={styles.signIn}
                    >
                      <Text style={styles.textSign}
                      >
                        Explore Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        )
      } */}
      
      <BottomSheetScroll
        openTermCondition={isOpenBottomSheet}
        closeTermCondition={() => setIsOpenBottomSheet(false)}
        snapPoints={['20%', '40%', '85%']}
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
                  ratings={placeDetails.rating} 
                  reviews={placeDetails.user_ratings_total} 
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
                    }]}>{placeDetails.current_opening_hours.open_now ? 'Đã mở cửa' : 'Đã đóng cửa'}</Text>
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
                        placeDetails.current_opening_hours.weekday_text.map((weekdayText, index) => {
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
              <Text style={[styles.formattedAddress, { marginTop: 5}]}>Địa chỉ: {placeDetails.formatted_address}</Text>
            }

            {
              placeDetails?.formatted_phone_number &&
              <Text style={styles.formattedAddress}>Số điện thoại: {placeDetails.formatted_phone_number}</Text>
            }

            {
              placeDetails?.website &&
              <Text style={styles.formattedAddress}>Website: {placeDetails.website}</Text>
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
                  onPress={() => Linking.openURL(placeDetails.website)}
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
                onPress={() => {
                  
                }}
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
              placeDetails?.photos &&
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
                  placeDetails?.photos.map((photo, index) => {
                    if (index === 0)
                      endIndexImg += 2
                    else
                      endIndexImg += 3
                    if (placeDetails?.photos[endIndexImg-2]?.photo_reference)
                    return (
                      <View 
                        key={index}
                        style={styles.containerImg}
                      >
                        <ImagePromise
                          photoReference={placeDetails?.photos[endIndexImg-2]?.photo_reference}
                          styleImage={styles.imgBigger}
                          map_api_key={map_api_key}
                        />
                        {
                          placeDetails?.photos[endIndexImg-1]?.photo_reference &&
                          <View style={[styles.containerImgSmaller, {
                            marginRight: 10
                          }]}> 
                            {
                              placeDetails?.photos[endIndexImg-1]?.photo_reference ?
                              <ImagePromise
                                photoReference={placeDetails?.photos[endIndexImg-1]?.photo_reference}
                                styleImage={[styles.imgSmaller, {
                                  marginBottom: 5
                                }]}
                                map_api_key={map_api_key}
                              /> :
                              <View style={styles.imgEmply}/>
                            }
                            {
                              placeDetails?.photos[endIndexImg]?.photo_reference ?
                              <ImagePromise
                                photoReference={placeDetails?.photos[endIndexImg]?.photo_reference}
                                styleImage={[styles.imgSmaller, {
                                  marginTop: 5
                                }]}
                                map_api_key={map_api_key}
                              /> :
                              <View style={styles.imgEmplyGray}/>
                            }
                          </View>
                        }
                      </View>
                    )
                  })
                }
              </ScrollView>
            }

            <Text style={styles.headerReview}>Đánh giá và xếp hạng</Text>

            {
              placeDetails?.reviews &&
              placeDetails?.reviews.map((review, index) => (
                <ReviewCard
                  review={review}
                  key={index}
                />
              ))
            }
          </View>
        }
      />
    </>
  )
}