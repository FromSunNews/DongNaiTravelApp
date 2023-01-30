import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import {
  Animated,
  Dimensions, FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View
} from 'react-native'
import InputAutoComplete from 'components/input_auto_complete/InputAutoComplete'
import MapViewDirections from 'react-native-maps-directions'

import { MAP_API_KEY } from 'utils/constants'
import { coordinates } from 'utils/coordinates'
import { typemapsearch } from 'utils/typemapsearch'

import * as Location from 'expo-location'

import { markers, mapDarkStyle, mapStandardStyle } from 'utils/mapdata'
import Ionicons from 'react-native-vector-icons/Ionicons'

import StarRating from 'components/star_rating/StarRating'
import { MapStyles } from './MapStyles'

export default function Map() {
// Phương: https://docs.expo.dev/versions/latest/sdk/map-view/
// Phương: https://www.npmjs.com/package/react-native-google-places-autocomplete
// Phương: https://www.npmjs.com/package/react-native-maps-directions
  const { width, height } = Dimensions.get('window')
  const CARD_HEIGHT = 220
  const CARD_WIDTH = width * 0.8
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState(markers[0].coordinate)
  const [showDirections, setShowDirections] = useState(false)
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [locationCurrent, setLocationCurrent] = useState({})
  const [errorMsg, setErrorMsg] = useState(null)
  const [renderedCoords, setRenderedCoords] = useState([])
  const [tagSelected, setTagSelected] = useState(typemapsearch[0].id)

  const ASPECT_RATIO = width / height
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
      <View style={MapStyles.headerBox}>
        <Text style={MapStyles.headerText}>Map</Text>
      </View>
      <MapView
        ref={mapRef}
        style={MapStyles.map}
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
                pinColor="#112D4E"
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
              apikey={MAP_API_KEY}
              strokeColor="#287ce9"
              strokeWidth={4}
              onReady={traceRouteOnReady}
            />
          )
        }
      </MapView>
      <View style={MapStyles.seachTypeContainer}>
        <View style={MapStyles.searchContainer}>
          <InputAutoComplete
            label="Origin"
            onPlaceSelected={(details) => onPlaceSelected(details, 'origin')}
          />
          {/* <InputAutoComplete
            label="Destination"
            onPlaceSelected={(details) => onPlaceSelected(details, 'destination')}
          /> */}
          {/* <TouchableOpacity
            style={MapStyles.buttonRoute}
            onPress={traceRoute}
          >
            <Text style={MapStyles.buttonText}>Trace</Text>
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
          style={MapStyles.tagList}
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
                style={[MapStyles.tagContainer, {
                  marginRight: 10,
                  backgroundColor: tagSelected === item.id ? '#112D4E' : '#FFFFFF'
                }]}
                onPress={() => setTagSelected(item.id)}
              >
                <Text style={[MapStyles.tagText, {
                  color: tagSelected === item.id ? '#FFFFFF' : '#5F6C7C'
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
            style={MapStyles.cardScrollView}
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
              <View style={MapStyles.card} key={marker.id}>
                <Image
                  source={marker.image}
                  style={MapStyles.cardImage}
                  resizeMode="cover"
                />
                <View style={MapStyles.textContent}>
                  <Text numberOfLines={1} style={MapStyles.cardtitle}>{marker.title}</Text>
                  <StarRating ratings={marker.rating} reviews={marker.reviews} />
                  <Text
                    numberOfLines={1}
                    style={MapStyles.cardDescription}
                  >
                    {marker.description}
                  </Text>
                  <View style={MapStyles.button}>
                    <TouchableOpacity
                      onPress={() => handleExlorePress(marker.coordinate)}
                      style={[MapStyles.signIn, {
                        borderColor: '#112D4E',
                        borderWidth: 1
                      }]}
                    >
                      <Text style={[MapStyles.textSign, {
                        color: '#112D4E'
                      }]}
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
