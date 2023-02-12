import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import {
  Animated,
  Dimensions, 
  Image, 
  Platform, 
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

import { markers, mapDarkStyle, mapStandardStyle } from 'utilities/mapdata'
import Ionicons from 'react-native-vector-icons/Ionicons'

import StarRating from 'components/star_rating/StarRating'
import { styles } from './MapScreenStyles'
import { useSelector } from 'react-redux'
import { selectCurrentManifold } from 'redux/manifold/ManifoldSlice'
import { app_c, app_dms } from 'globals/styles'

export default function Map() {
// Phương: https://docs.expo.dev/versions/latest/sdk/map-view/
// Phương: https://www.npmjs.com/package/react-native-google-places-autocomplete
// Phương: https://www.npmjs.com/package/react-native-maps-directions

  const map_api_key = useSelector(selectCurrentManifold).privateKeys.map_api_key

  const CARD_HEIGHT = 220
  const CARD_WIDTH = app_dms.screenWidth * 0.8
  const SPACING_FOR_CARD_INSET = app_dms.screenWidth * 0.1 - 10

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState(markers[0].coordinate)
  const [showDirections, setShowDirections] = useState(false)
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [locationCurrent, setLocationCurrent] = useState({})
  const [errorMsg, setErrorMsg] = useState(null)
  const [renderedCoords, setRenderedCoords] = useState([])
  const [tagSelected, setTagSelected] = useState(typemapsearch[0].id)

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
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      const userLocation = await Location.getCurrentPositionAsync({})
      console.log('🚀 ~ file: Map.js:81 ~ userLocation', userLocation)
      const position = {
        latitude: userLocation.coords.latitude || 0,
        longitude: userLocation.coords.longitude || 0
      }
      setOrigin(position)
      setLocationCurrent(position)
    // showPositionCurrent(position)
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

  const permissionMap = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    const userLocation = await Location.getCurrentPositionAsync({})
    setLocationCurrent(userLocation)
    // showPositionCurrent(userLocation)
  }

  const showPositionCurrent = (position) => {
    moveToMap(position)
  }

  const moveToMap = async (position) => {
    const camera = await mapRef.current?.getCamera()
    if (camera) {
      camera.center = {
        ...position,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068
      }
      mapRef.current?.animateCamera(camera, { duration: 350 })
    }
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
    moveToMap(position)
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
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Map</Text>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        showsUserLocation
        followsUserLocation
      >
        <Polyline
          coordinates={coordinates}
          strokeWidth={5}
          strokeColor="red"
          lineCap="butt"
          lineJoin="bevel"
        />
        {markers.map((marker, index) => {
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

        })}
        {/* {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />} */}
        {
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
        }
      </MapView>
      <View style={styles.seachTypeContainer}>
        <View style={styles.searchContainer}>
          <InputAutoComplete
            onPlaceSelected={(details) => onPlaceSelected(details, 'origin')}
            map_api_key={map_api_key}
          />
          {/* <InputAutoComplete
            label="Destination"
            onPlaceSelected={(details) => onPlaceSelected(details, 'destination')}
          /> */}
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
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={30}
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
      </View>
      {
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
      }
    </>
  )
}