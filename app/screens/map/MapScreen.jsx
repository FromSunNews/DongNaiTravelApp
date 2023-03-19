import React, { useEffect, useMemo, useRef, useState, memo } from 'react'

// Related to redux
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentManifold, updateNotif } from 'redux/manifold/ManifoldSlice'
import { selectCurrentFilter } from 'redux/filter/FilterSlice'

// Related to component of react native
import {
  Animated,
  LayoutAnimation, 
  Platform, 
  Pressable, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View,
  Share,
  Keyboard,
  Linking,
  ActivityIndicator
} from 'react-native'

// Related to react navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Related to Expo
import * as Location from 'expo-location'

// Related to map
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

// Related to raw datas
import { coordinates } from 'utilities/coordinates'
import { typemapsearch } from 'utilities/typemapsearch'
import { typesPlace, typeModeTransport } from 'utilities/mapdata'
import { FilterConstants } from 'utilities/constants'

// Related to APis
import { getRouteDirectionAPI, getMorePlacesTextSearchAPI, getPlaceDetailsAPI, getPlacesTextSearchAPI } from 'request_api'

// Related to debounce
import { debounce } from 'lodash'

// Related to Styles
import { styles } from './MapScreenStyles'
import { app_c, app_dms, app_sh, app_shdw, app_typo } from 'globals/styles'

// Related to components
import { BottomSheetScroll } from 'components'
import ImagePromise from 'components/image_promise/ImagePromise'
import ReviewSectionPromise from 'components/review_section_promise/ReviewSectionPromise'
import Filter from 'components/filter/Filter'
import BottomSheetExample from 'components/bottom_sheet/BottomSheetExample'
import Category from 'components/categories/Category'
import InputAutoComplete from 'components/input_auto_complete/InputAutoComplete'
import StarRating from 'components/star_rating/StarRating'

// Related to Icons
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'

// Related to component notification
import { useToast } from 'react-native-toast-notifications'

// Related to Animation
import { dropDownAnimation } from 'animations/dropDownAnimation'
import * as Animatable from 'react-native-animatable'

import { socketIoInstance } from '../../../App'
import { selectCurrentUser, selectTemporaryUserId } from 'redux/user/UserSlice'

const Map = () => {
// Phương: https://docs.expo.dev/versions/latest/sdk/map-view/
// Phương: https://www.npmjs.com/package/react-native-google-places-autocomplete
// Phương: https://www.npmjs.com/package/react-native-maps-directions

  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()
  const toast = useToast()
  const user = useSelector(selectCurrentUser)
  const temporaryUserId = useSelector(selectTemporaryUserId)

  const map_api_key = useSelector(selectCurrentManifold).privateKeys?.map_api_key
  const ors_api_key = useSelector(selectCurrentManifold).privateKeys?.ors_api_key[0]

  const dispatch = useDispatch()
  const currentFilter = useSelector(selectCurrentFilter)

  const CARD_HEIGHT = 240
  const CARD_WIDTH = app_dms.screenWidth * 0.8
  const SPACING_FOR_CARD_INSET = app_dms.screenWidth * 0.1 - 10

  const [origin, setOrigin] = useState('')
  const [textOrigin, setTextOrigin] = useState('')
  const [textSearchOrigin, setTextSearchOrigin] = useState('')
  

  const [destination, setDestination] = useState(null)
  const [textDestination, setTextDestination] = useState('')
  const [textSearchDestination, setTextSearchDestination] = useState('')

  const [showDirections, setShowDirections] = useState(false)

  const [arrPlaceInput, setArrPlaceInput] = useState([])

  const [distance, setDistance] = useState(0)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [directionMode, setDirectionMode] = useState('DRIVING')
  const [tagModeSelected, setTagModeSelected] = useState('1')
  

  const [isModeScrollOn, setIsModeScrollOn] = useState(false)

  const [locationCurrent, setLocationCurrent] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [tagSelected, setTagSelected] = useState(typemapsearch[0].id)

  const [isOpenBottomSheetFilter, setIsOpenBottomSheetFilter] = useState(false)

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)
  const [isShowScrollCardPlace, setIsShowScrollCardPlace] = useState(false)

  const [placeDetails, setPlaceDetails] = useState(null)
  const [placeDetailsClone, setPlaceDetailsClone] = useState(null)
  const [placesTextSearch, setPlacesTextSearch] = useState(null)

  const [placesTextSearchClone, setPlacesTextSearchClone] = useState(null)

  const [arrImgBase64, setArrImgBase64] = useState([])

  const [isFocusedInput, setIsFocusedInput] = useState(false)
  const [isFocusedOriInput, setIsFocusedOriInput] = useState(false)
  const [isFocusedDesInput, setIsFocusedDesInput] = useState(false)
  const [isShowBackIcon, setIsShowBackIcon] = useState(false)
  const [previousTextSearch, setPreviousTextSearch] = useState('')
  
  const inputRef = useRef(null)
  const oriInputRef = useRef(null)
  const desInputRef = useRef(null)

  const bottomSheetExampleRef = useRef(null)
  
  const [currentCoorArr, setCurrentCoorArr] = useState([])
  const [coorArrDirection, setCoorArrDirection] = useState([])
  const [directionsPolyLine, setDirectionsPolyLine] = useState([])
  const [selectedPolyLine, setSelectedPolyLine] = useState(0)
  
  const [arrPlaceToFitCoor, setArrPlaceToFitCoor] = useState([])

  const [isShowOptionRoute, setIsShowOptionRoute] = useState(false)
  const [oriRouteInfo, setOriRouteInfo] = useState(null)
  const [desRouteInfo, setDesRouteInfo] = useState(null)

  const [nextPageToken, setNextPageToken] = useState(null)

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

  // số giây giữa các lần cập nhật vị trí
  const UPDATE_INTERVAL = 3 
  // khoảng cách ~m tối thiểu giữa hai vị trí mới để cập nhật
  const DISTANCE_THRESHOLD = 2 
  // hàm để cập nhật vị trí
  let trackingUserLocation
  const [isTrackingUserMode, setIsTrackingUserMode] = useState(false)


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
        accuracy: Location.Accuracy.BestForNavigation
      })

      const position = {
        latitude: userLocation.coords.latitude || 0,
        longitude: userLocation.coords.longitude || 0
      }
      setOrigin(position)
      setLocationCurrent(position)
      setArrPlaceInput([
        {
          description: 'My location',
          geometry: { location: { lat: userLocation.coords.latitude, lng: userLocation.coords.longitude } },
        }
      ])
      setTextOrigin('My location')
    })()

    //  Này để thêm mảng để hiện lên polyline (đường biên giới)
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

    // Lắng nghe sự kiện từ server
    socketIoInstance.on('s_tracking_user_location_current', (data) => {
      if (data.isCallNewApi) {
        const coordinates = data.coorArrDirection.features[0].geometry.coordinates
        const summary = data.coorArrDirection.features[0].properties.summary
        const bbox = data.coorArrDirection.features[0].bbox
        const arrDirection = coordinates.map(([longitude, latitude]) => ({ latitude, longitude }))
        setCoorArrDirection(arrDirection)

        // const edgePadding = {
        //   top: 300,
        //   right: 70,
        //   bottom: 130,
        //   left: 70
        // }
  
        // handleFitCoors(arrDirection, edgePadding, true)
        
        setDistance(summary.distance / 1000) // ~ km
        const minuttesTranformYet = summary.duration // ~ minutes

        const days = Math.floor(minuttesTranformYet / 1440)
        const hours =  Math.floor((minuttesTranformYet - (days * 1440)) / 60)
        const minutes = Math.floor(minuttesTranformYet - (days * 1440) - (hours * 60))
        const seconds = Math.floor((minuttesTranformYet - (days * 1440) - (hours * 60) - minutes) * 60)

        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
      } else {
        setCoorArrDirection(data.coorArrDirection)
      }
    })
  }, [])

  const handleGetDirections = async (start, end, typeOri, typeDes, startCoor, endCoor) => {
    console.log("MapScreen.jsx:258 ~ getDirections ~ call api")
      // data = {
      //   oriAddress: 'abc' || null,
      //   desAddress: 'abc' || null,
      //   oriPlaceId: sdgkl_27e921 || null,
      //   desPlaceId: sdgkl_27e921 || null,
      //   oriCoor: {
      //      longitude: 10.214290,
      //      latitude: 100.1283824
      // } || null,
      //   desCoor: {
      //      longitude: 10.214290,
      //      latitude: 100.1283824
      // } || null,
      //   modeORS: 'driving-car',
      //   modeGCP: 'driving',
      //   typeOri: 'place_id' || 'address' || 'coordinate',
      //   typeDes: 'place_id' || 'address' || 'coordinate',
      // }
      
      await getRouteDirectionAPI({
        oriAddress: typeOri === 'address' ? start : null,
        desAddress: typeDes === 'address' ? end : null,
        oriPlaceId: typeOri === 'place_id' ? start : null,
        desPlaceId: typeDes === 'place_id' ? end : null,
        oriCoor: startCoor,
        desCoor: endCoor,
        modeORS: 'driving-car',
        modeGCP: 'driving',
        typeOri: typeOri,
        typeDes: typeDes
      }).then(data => {
        console.log("🚀 ~ file: MapScreen.jsx:314 ~ handleGetDirections ~ data:", data.callFrom)
        
        if (data.callFrom === 'GCP') {
          // directionsPolyLine: [
          //   {
          //     duration: number,
          //     distance: number,
          //     overview_polyline: [
          //       {
          //         latitude: number,
          //         longitude: number
          //       },...+900characters
          //     ],
          //     steps: [
          //       {
          //         duration: number,
          //         distance: number,
          //         html_instructions: string,
          //         instructions: string,
          //         polyline: [
          //           {
          //             latitude: number,
          //             longitude: number
          //           },...+900characters
          //         ]

          //       },...+900characters
          //     ]
          //   },
          // ]
          let dataToUpdate = []
          data?.data?.routes?.map(route => {
            const steps = []
            route.legs[0].steps.map(step => {
              const childStep = {
                duration: step.distance,
                distance: step.duration,
                html_instructions: step.html_instructions,
                instructions: null,
                start_location: {
                  latitude: step.start_location.lat,
                  longitude: step.start_location.lng
                },
                end_location: {
                  latitude: step.start_location.lat,
                  longitude: step.start_location.lng
                },
                polyline: step.polyline.points
              }
              steps.push(childStep)
            })
            let childDataToUpdate = {
              duration: route.legs[0].duration.value,
              distance: route.legs[0].distance.value,
              overview_polyline: route.overview_polyline.points,
              steps: steps
            }
            dataToUpdate.push(childDataToUpdate)
          })

          const edgePadding = {
            top: 300,
            right: 70,
            bottom: 130,
            left: 70
          }
          
          setDirectionsPolyLine(dataToUpdate)
          // Cho nó focus vào 
          console.log("dataToUpdate[0].overview_polyline.points:", dataToUpdate[0].overview_polyline)

          handleFitCoors(dataToUpdate[0].overview_polyline, edgePadding, true)
          // Hiển thị ngày giờ và khoảng cách
          handleDatetimeAndDistance(dataToUpdate[0].distance, dataToUpdate[0].duration)
        } else if (data.callFrom === 'ORS') {
          let dataToUpdate = []
          data?.data?.features?.map(feature => {
            const steps = []
            feature.properties.segments[0].steps.map(step => {
              const childStep = {
                duration: step.distance,
                distance: step.duration,
                html_instructions: null,
                instructions: step.instruction,
                start_location: step.start_location,
                end_location: step.end_location,
                polyline: step.polyline
              }
              steps.push(childStep)
            })
            let childDataToUpdate = {
              duration: feature.properties.segments[0].duration,
              distance: feature.properties.segments[0].distance,
              overview_polyline: feature.geometry.coordinates,
              steps: steps
            }
            dataToUpdate.push(childDataToUpdate)
          })

          const edgePadding = {
            top: 300,
            right: 70,
            bottom: 130,
            left: 70
          }
          setDirectionsPolyLine(dataToUpdate)
          // Cho nó focus vào 
          handleFitCoors(dataToUpdate[0].overview_polyline.points, edgePadding, true)
          // Hiển thị ngày giờ và khoảng cách
          handleDatetimeAndDistance(dataToUpdate[0].distance, dataToUpdate[0].duration)
        }
      })
  }

  const handleDatetimeAndDistance = (distance, duration) => {
    setDistance(distance / 1000) // ~ km
    const secondsTranformYet = duration // ~ second

    const days = Math.floor(secondsTranformYet / 86400)
    const hours =  Math.floor((secondsTranformYet - (days * 86400)) / 3600)
    const minutes = Math.floor((secondsTranformYet - (days * 86400) - (hours * 3600)) / 60)
    const seconds = Math.floor((secondsTranformYet - (days * 86400) - (hours * 3600) - (minutes* 60)))

    setDays(days)
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
  }

  // const handleAnimationPolyline = (coordinates) => {
  //   console.log("🚀 ~ file: MapScreen.jsx:328 ~ handleAnimationPolyline ~ coordinates:", coordinates.length)
  //   let counter = 0
  //   setIsAnimating(true)
  //   const steps = Math.floor(coordinates.length / 30)
  //   console.log("🚀 ~ file: MapScreen.jsx:332 ~ handleAnimationPolyline ~ steps:", steps)
  //   const intervalId = setInterval(() => {
  //     if (counter < coordinates.length) {
  //       const coordinatesToAdd = []
  //       for (let index = 1; index <= steps; index++) {
  //         if(coordinates[counter+index])
  //           coordinatesToAdd.push(coordinates[counter+index])
  //       }
  //       setCoorArrDirectionAnimation(prevCoords => [...prevCoords, ...coordinatesToAdd])
  //       counter+=steps
  //     } else {
  //       clearInterval(intervalId)
  //       setIsAnimating(false)
  //     }
  //   }, 1) // thêm mỗi tọa độ trong mảng sau mỗi 0.2 giây

  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }
  const handleStartTrackingUserLocation = async () => {
    // Chỉ bật khi mà người dùng bắt đầu tracking thôi 
      setIsTrackingUserMode(true)
      trackingUserLocation = await Location.watchPositionAsync({
        enableHighAccuracy: true,
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: UPDATE_INTERVAL * 1000,
        distanceInterval: DISTANCE_THRESHOLD,
      }, (userLocation) => {
        console.log("🚀 ~ file: MapScreen.jsx:294 ~ handleStartTrackingUserLocation ~ userLocation:", userLocation)
        const position = {
          latitude: userLocation.coords.latitude || 0,
          longitude: userLocation.coords.longitude || 0
        }
        setOrigin(position)
        setLocationCurrent(position)
        setArrPlaceInput([
          {
            description: 'My location',
            geometry: { location: { lat: userLocation.coords.latitude, lng: userLocation.coords.longitude } },
          }
        ])
      })
  }

  const handleRemoveTrackingUserLocation = () => trackingUserLocation.remove()

  useEffect(() => {
    if (isTrackingUserMode) {
      socketIoInstance.emit('c_tracking_user_location_current', {
        currentUserId: user ? user._id : temporaryUserId,
        location: origin,
        coorArrDirection: coorArrDirection,
        profile: 'driving-car',
        destination: destination
      })
    }
  }, [origin])

  const [isShowRefreshCard, setIsShowRefreshCard] = useState(false)
  const mapRef = useRef(null)
  const cardScrollViewRef = useRef(null)
  
  const loadMoreCardDebouncer = useMemo(() => debounce(
    () => { handleLoadingMoreCard()}, 500),
    [handleLoadingMoreCard, nextPageToken, placesTextSearch], 
  )

  const [mapIndex, setMapIndex] = useState(0)
  let loadingRefreshCard = false
  // eslint-disable-next-line prefer-const
  let mapAnimation = new Animated.Value(-27.3333)

  const handleLoadingMoreCard = () => {
    console.log("🚀 ~ file: MapScreen.jsx:231 ~ handleLoadingMoreCard ~ nextPageToken:", nextPageToken)
    if (nextPageToken && !loadingRefreshCard) {
      loadingRefreshCard = true
      let data = {
        query: inputRef.current.getAddressText(),
        sortBy: currentFilter.sortBy,
        radius: currentFilter.radius,
        location: currentFilter.location || locationCurrent,
        pagetoken: nextPageToken
      }
  
      if (currentFilter.priceLevels[0] !== 0 || currentFilter.priceLevels[1] !== 5) {
        data = {
          ...data,
          minprice: currentFilter.priceLevels[0].toString(),
          maxprice: currentFilter.priceLevels[1].toString()
        }
      }
  
      if (currentFilter.category !== FilterConstants.categories.ALL_CATEGORIES) {
        data = {
          ...data,
          type: currentFilter.category
        }
      }
      console.log("callapi")
      console.log("🚀 ~ file: MapScreen.jsx:240 ~ handleLoadingMoreCard ~ data:", data)

      
      getMorePlacesTextSearchAPI(data).then((dataReturn) => {
        console.log("duwx lieeuj trar về")
  
        if (dataReturn.nextPageToken){
          console.log("Có nextPageToken")
          setNextPageToken(dataReturn.nextPageToken)
        } else {
          console.log(" k Có nextPageToken")
          setNextPageToken(null)
        }

        if (dataReturn.arrPlace) {
          setPlacesTextSearch([
            ...placesTextSearch,
            ...dataReturn.arrPlace
          ])
          console.log("Có dataReturn.arrPlace")
        } else {
          console.log("K Có dataReturn.arrPlace")

        }
        setIsShowRefreshCard(false)
        loadingRefreshCard = false
      }).catch(err => {
        setIsShowRefreshCard(false)
        loadingRefreshCard = false
      })
  
      
    } else {
      setIsShowRefreshCard(false)
      loadingRefreshCard = false
      toast.show("There's nowhere to load more!")
    }
  }
  
  useEffect(() => {
    if (placesTextSearch) {
      mapAnimation.addListener(({ value }) => {
        // console.log("🚀 ~ file: MapScreen.jsx:279 ~ mapAnimation.addListener ~ value:", value)
        // animate 30% away from landing on the next item
        let index = Math.floor((value / (CARD_WIDTH + 20)) + 0.3)
  
        if (value >= (placesTextSearch.length - 1) * 320 && !loadingRefreshCard) {
          setIsShowRefreshCard(true)
          loadMoreCardDebouncer()
        }
        

        if (index >= placesTextSearch.length) {
          index = placesTextSearch.length - 1
          // tại đây loading more 
          console.log("Loading more")
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
            moveToMap(coordinate, 16, 90)

          }
        }, 350)
      })
    }
  })

  useEffect(() => {
    if (isShowScrollCardPlace)
      cardScrollViewRef.current.scrollTo({ x: -27.3333, y: 0, animated: true })
  }, [isShowScrollCardPlace])

  useEffect(() => {
    return () => {
      loadMoreCardDebouncer.cancel()
    }
  }, [])

  const moveToMap = async (position, zoom, pitch) => {
    mapRef.current?.animateCamera({
      center: {
        ...position
      },
      heading: 0,
      pitch: pitch,
      zoom: zoom
    }, 500)
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
    setIsShowBackIcon(true)
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

  const handleMarkerPress = (mapEventData) => {
    // console.log('mapEventData', mapEventData)
    // eslint-disable-next-line no-underscore-dangle
    const markerID = mapEventData._targetInst.return.key
    console.log("🚀 ~ file: MapScreen.jsx:340 ~ handleMarkerPress ~ markerID:", markerID)

    let x = (markerID * CARD_WIDTH) + (markerID * 20)
    if (Platform.OS === 'ios') {
      x -= SPACING_FOR_CARD_INSET
    }
    
    setMapIndex(markerID)
    cardScrollViewRef.current.scrollTo({ x, y: 0, animated: false })
  }

  const handleRoutePress = (locationDes, desPlaceId) => {
    setShowDirections(true)
    setDestination(locationDes)
    setIsModeScrollOn(false)
    // Clone lại
    setPlaceDetailsClone(placeDetails)
    setIsOpenBottomSheet(false)
    // TH định vị chauw bắt kịp
    if (!origin) {
      setIsShowOptionRoute(true)
    } else {
      handleGetDirections(origin, desPlaceId, 'coordinate', 'place_id', origin, locationDes)
    }
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
    let data = {
      query: addressText,
      sortBy: currentFilter.sortBy,
      radius: currentFilter.radius,
      location: currentFilter.location || locationCurrent,
    }

    if (currentFilter.priceLevels[0] !== 0 || currentFilter.priceLevels[1] !== 5) {
      data = {
        ...data,
        minprice: currentFilter.priceLevels[0].toString(),
        maxprice: currentFilter.priceLevels[1].toString()
      }
    }

    if (currentFilter.category !== FilterConstants.categories.ALL_CATEGORIES) {
      data = {
        ...data,
        type: currentFilter.category
      }
    }
    console.log("🚀 ~ file: MapScreen.jsx:397 ~ getPlacesTextSearchAPI ~ data:", data)

    getPlacesTextSearchAPI(data).then((dataReturn) => {
      if (dataReturn.nextPageToken) {
        console.log("Có nextPageToken", dataReturn.nextPageToken)
        setNextPageToken(dataReturn.nextPageToken)
      }
      else {
        console.log("K Có nextPageToken")
        setNextPageToken(null)
      }

      if (dataReturn.arrPlace) {
        // Đặt giá trị cho placesTextSearch
        setPlacesTextSearch(dataReturn.arrPlace)
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
        dataReturn.arrPlace.map(place => {
          const placeObj = {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          }
          arrPlace.push(placeObj)
        })
  
        const edgePadding = {
          top: 130,
          right: 70,
          bottom: 150,
          left: 70
        }
  
        handleFitCoors(arrPlace, edgePadding, true)
        setArrPlaceToFitCoor(arrPlace)
      } else {
        dispatch(updateNotif({
          appearNotificationBottomSheet: true,
          ontentNotificationBottomSheet: 'Do not have any result for your search!'
        }))
      }
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
          if (!showDirections) {
            handleGetPlaceDetails(e.nativeEvent.placeId)
          }
        }}
        mapPadding={{
          top: 0,
          right: 0,
          bottom: isModeScrollOn ? 160 : 0,
          left: 0
        }}
      >
        {
        (origin && showDirections && (textDestination === 'My location' || textOrigin !== 'My location')) ? 
        <Marker 
          coordinate={origin}
          anchor={{
            x: 0.5,
            y: 0.5
          }}
        >
          <View style={{
            backgroundColor: app_c.HEX.primary,
            borderRadius: '50%',
            height: 25,
            width: 25,
          }}>
            <Ionicons
              name="navigate-circle"
              size={25}
              color={app_c.HEX.third}
              style={{ position: 'absolute', top: -1}}
            />
          </View>
          
        </Marker> : null
        }

        {/* Show my result when I search location */}
        {destination ? <Marker coordinate={destination} /> : null}

        <Polyline
          coordinates={currentCoorArr}
          strokeWidth={1}
          strokeColor="#F85454"
        />
        
        {/* Polyline chính + phụ */}
        {
          (directionsPolyLine && showDirections && origin && destination ) ? 
            directionsPolyLine.map((directionPolyLine, index) => {
              return (
                <Polyline
                  key={`polyline-${index}`}
                  coordinates={directionPolyLine.overview_polyline} 
                  strokeWidth={6} 
                  strokeColor={selectedPolyLine === index ? app_c.HEX.third : app_c.HEX.ext_second}
                  tappable={true}
                  onPress={() => {
                    console.log('call poly line')
                    // Đặt lại index
                    setSelectedPolyLine(index)
                    // chỉnh ngày giờ và km
                    handleDatetimeAndDistance(directionPolyLine.distance, directionPolyLine.duration)
                  }}
                  style={{ zIndex: selectedPolyLine === index ? 1 : 0}}
                /> 
              )
            }) : null
        }

        
        {/* Arr marker show on map view */}
        {
          (placesTextSearch && !showDirections && !isOpenBottomSheet) ? 
          placesTextSearch.map((place, index) => {
            const coordinate = {
              latitude: place.geometry.location.lat,
              longitude:  place.geometry.location.lng,
            }
            if (index === mapIndex) {
              return (
                <Marker
                  key={index}
                  coordinate={coordinate}
                  onPress={(e) => handleMarkerPress(e)}
                />
              )
            } else 
              return (
                <Marker
                  key={index}
                  coordinate={coordinate}
                  onPress={(e) => handleMarkerPress(e)}
                  pinColor={app_c.HEX.ext_second}
                  style={{transform: [{scaleX: 0.5}]}}
                />
              )
          }) : 
          null
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
            placeholder='Where do you want to go?'
            isShowBackIcon={isShowBackIcon}
            isHaveRightButton={true}
            handlePressFilter={() => setIsOpenBottomSheetFilter(true)}
            handlePressBackIcon={() => {
              // TH1: Khi user click vào 1 địa điểm ngay từ đầu
              if (!placesTextSearch && placeDetails) {
                setIsShowBackIcon(false)
                setIsOpenBottomSheet(false)
                setPlaceDetails(null)
                setDestination(null)
                setPlacesTextSearch(null)
                inputRef.current?.clear()
              }
              // TH2: Khi user click vào tìm kiếm nhiều địa điểm ngay từ đầu
              else if (placesTextSearch && !placeDetails) {
                setIsShowBackIcon(false)
                setIsShowScrollCardPlace(false)
                setPlacesTextSearch(null)
                setPlaceDetails(null)
                setDestination(null)
                inputRef.current?.clear()
              }
              // TH3: Khi người dùng search nheièu địa điểm và tìm trên bản đồ 1 địa điểm khác
              else if (placesTextSearch && placeDetails) {
                setIsOpenBottomSheet(false)
                setPlaceDetails(null)
                setDestination(null)
                inputRef.current?.setAddressText(previousTextSearch)
              }
              setDirectionsPolyLine([])
              setSelectedPolyLine(0)
            }}
          />
        </View>
      </View>

      {/* Route's infomation */}
     {
      showDirections &&
      <>
        <View style={styles.containerRouteInfo}>
          <TouchableOpacity 
            onPress={() => {
              if (!placeDetails && !placesTextSearch) {
                if (origin && destination && isShowOptionRoute) {
                  setIsShowOptionRoute(false)
                } else {
                  setShowDirections(false)
                  setIsShowOptionRoute(false)
                  setDestination(null)
                  setTextDestination('')
                }
              } else {
                if (isShowOptionRoute) {
                  setIsShowOptionRoute(false)
                } else {
                  // TH1: Nếu user click từ bottom sheet hoặc user click từ bottom sheet từ scrool card
                  if ((placeDetails && !placesTextSearch) || (placeDetails && placesTextSearch)) {
                    setShowDirections(false)
                    setIsOpenBottomSheet(true)
                    const arrPlace = [
                      {
                        latitude: placeDetailsClone.geometry.viewport.northeast.lat,
                        longitude: placeDetailsClone.geometry.viewport.northeast.lng,
                      },
                      {
                        latitude: placeDetailsClone.geometry.viewport.southwest.lat,
                        longitude: placeDetailsClone.geometry.viewport.southwest.lng,
                      }
                    ]
                    const edgePadding = {
                      top: 0,
                      right: 70,
                      bottom: 180,
                      left: 70
                    }
                    handleFitCoors(arrPlace, edgePadding , true)
                    setDestination({
                      latitude: placeDetailsClone?.geometry.location.lat,
                      longitude: placeDetailsClone?.geometry.location.lng
                    })
                    // Mình phải set lại những tt trước đó trong bottom sheet
                    setPlaceDetails(placeDetailsClone)
                  } else if (!placeDetails && placesTextSearch) {
                    // TH2: Nếu user click từ scrool card
                    setShowDirections(false)
                    const edgePadding = {
                      top: 130,
                      right: 70,
                      bottom: 150,
                      left: 70
                    }
                    handleFitCoors(arrPlaceToFitCoor, edgePadding, true)
                    setDestination(null)
                  }
                  // Đặt lại giá trị
                  setTextOrigin('My location')
                  setOrigin(locationCurrent)
                  
                }
              }
            }}
            style={styles.backbtn}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={18}
              color={app_c.HEX.ext_second}
              style={styles.iconBack}
            />
          </TouchableOpacity>
          <Text style={styles.headerRouteInfo}>Your route's infomation</Text>
          {
            !isShowOptionRoute ? 
              <View style={styles.frameRouteInfo}>
                <View style={styles.leftContainerFrame}>
                  <TouchableOpacity 
                    onPress={() => {
                      const temp = origin
                      setOrigin(destination)
                      setDestination(temp)

                      const temp2 = textOrigin
                      setTextOrigin(textDestination)
                      setTextDestination(temp2)
                    }}
                    style={styles.changeOriDes}
                  >
                    <Octicons
                      name='arrow-switch' 
                      size={15} 
                      color={app_c.HEX.ext_second}
                      style={{transform: [{ rotate: '90deg'}]}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setIsShowOptionRoute(true)
                    console.log(placeDetails?.name)
                  }}>
                    <Text numberOfLines={2} style={styles.originText}>{textOrigin}</Text>
                  </TouchableOpacity>
                  <Text style={styles.toText}>to</Text>
                  <TouchableOpacity onPress={() => setIsShowOptionRoute(true)}>
                    <Text numberOfLines={2} style={styles.detinationText}>{textDestination}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rightContainerFrame}>
                  <View style={styles.rightContainerFrameInto}>
                    <View style={styles.routeInfoTimeContainer}>
                      <View style={styles.routeInfoUnixTime}>
                        <Text style={styles.routeInfoNumberTime}>{days === 0 ? '-' : days}</Text>
                        <Text style={styles.routeInfoTextTime}>{days > 1 ? 'days' : 'day'}</Text>
                      </View>
                      <View style={styles.routeInfoUnixTime}>
                        <Text style={styles.routeInfoNumberTime}>{hours === 0 ? '-' : hours}</Text>
                        <Text style={styles.routeInfoTextTime}>{hours > 1 ? 'hours' : 'hour'}</Text>
                      </View>
                      <View style={styles.routeInfoUnixTime}>
                        <Text style={styles.routeInfoNumberTime}>{minutes === 0 ? '-' : minutes}</Text>
                        <Text style={styles.routeInfoTextTime}>{minutes > 1 ? 'mins' : 'min'}</Text>
                      </View>
                    </View>
                    <View style={styles.routeInfoTranportContainer}>
                      <Text style={styles.routeInfoTranport}>{directionMode === 'DRIVING' ? 'Drive' : (directionMode === 'BICYCLING' ? 'Bicycle' : (directionMode === 'WALKING' ? 'Walk' : 'Transit'))}</Text>
                      <Text style={styles.routeInfoTextTranport}>by</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    onPress={handleStartTrackingUserLocation}
                    style={styles.btnStart}
                  >
                      <Text style={styles.textStart}>Start</Text>
                      <FontAwesome5 
                        name='location-arrow' 
                        size={14} 
                        color={app_c.HEX.primary}
                      />
                    </TouchableOpacity>
                </View>
              </View> :
            <View style={styles.optionalContainer}>
              <View style={styles.iconOriDesContainer}>
                <Ionicons
                  name="navigate-circle"
                  size={20}
                  color={app_c.HEX.third}
                />
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={20}
                  color={app_c.HEX.ext_second}
                  style={{
                    marginVertical: 5
                  }}
                />
                <Ionicons
                  name='location' 
                  size={20} 
                  color='#eb4141'
                />
              </View>
              <View style={styles.oriDesContainer}>
                <TouchableOpacity 
                  onPress={() => {
                    console.log("🚀 ~ file: MapScreen.jsx:1066 ~ Map ~ textOrigin:", textOrigin)
                    console.log("🚀 ~ file: MapScreen.jsx:887 ~ Map ~ oriRouteInfo:", oriRouteInfo)
                    // console.log("🚀 ~ file: MapScreen.jsx:899 ~ Map ~ desRouteInfo:", desRouteInfo)

                    let start, end, startCoor, endCoor, typeOri, typeDes
                    
                    if (desInputRef.current.getAddressText().trim() !== '' && oriInputRef.current.getAddressText().trim() !== '') {
                      setDirectionsPolyLine([])
                      setSelectedPolyLine(0)
                      if (oriInputRef.current.getAddressText().trim() !== textOrigin && oriRouteInfo) {
                        if (oriRouteInfo?.description === 'My location') {
                          setTextOrigin(oriRouteInfo?.description)
                          console.log("🚀 ~ file: MapScreen.jsx:1069 ~ Map ~ locationCurrent:", locationCurrent)
                          start = locationCurrent
                          typeOri = 'coordinate'
                          startCoor = locationCurrent
                        } else {
                          setTextOrigin(oriRouteInfo?.name)
                          setOrigin({
                            latitude: oriRouteInfo?.geometry.location.lat,
                            longitude: oriRouteInfo?.geometry.location.lng
                          })
                          // lúc này chắc chắn trong oriRouteInfo là người dùng đã chọn từ phần gọi ý cho nên lấy ra place_id từ đó 
                          start = oriRouteInfo?.place_id
                          startCoor = {
                            latitude: oriRouteInfo?.geometry.location.lat,
                            longitude: oriRouteInfo?.geometry.location.lng
                          }
                          typeOri = 'place_id'
                        }
                      } else if (oriInputRef.current.getAddressText().trim() === textOrigin && !oriRouteInfo) {
                        start = locationCurrent
                        typeOri = 'coordinate'
                        startCoor = locationCurrent
                      } 

                      if (desInputRef.current.getAddressText().trim() !== textDestination && desRouteInfo) {
                        if (desRouteInfo?.description === 'My location') {
                          setTextDestination(desRouteInfo?.description)
                          end = locationCurrent
                          typeDes = 'coordinate'
                          endCoor = locationCurrent
                        } else {
                          setTextDestination(desRouteInfo?.name)
                          setDestination({
                            latitude: desRouteInfo?.geometry.location.lat,
                            longitude: desRouteInfo?.geometry.location.lng
                          })
                          end = desRouteInfo?.place_id
                          endCoor = {
                            latitude: desRouteInfo?.geometry.location.lat,
                            longitude: desRouteInfo?.geometry.location.lng
                          }
                          typeDes = 'place_id'
                        }
                      }
                      setIsShowOptionRoute(false)
                      console.log("🚀 ~ file: MapScreen.jsx:899 ~ Map ~ startCoor:", startCoor)
                      console.log("🚀 ~ file: MapScreen.jsx:899 ~ Map ~ typeOri:", typeOri)
                      console.log("🚀 ~ file: MapScreen.jsx:899 ~ Map ~ endCoor:", endCoor)
                      console.log("🚀 ~ file: MapScreen.jsx:899 ~ Map ~ typeDes:", typeDes)

                      handleGetDirections(start, end, typeOri, typeDes, startCoor, endCoor)
                    }
                  }}
                  style={styles.routeBtn}
                >
                  <Text style={styles.routeBtnText}>Route</Text>
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0}}>
                  <InputAutoComplete
                    placeholder='Choose a destination place'
                    onPlaceSelected={(details) => {
                      setDesRouteInfo(details)
                    }}
                    isFocusedInput={isFocusedDesInput}
                    handleFocus={(condition) => setIsFocusedDesInput(condition)}
                    inputRef={desInputRef}
                    map_api_key={map_api_key}
                    predefinedPlaces={arrPlaceInput}
                    // handleGetAddressText={(addressText) => {
                    //   Keyboard.dismiss()
                    //   handleGetPlacesSearchText(addressText)
                    // }}
                    isHaveLeftButton={false}
                    textInputStyle={styles.textInput}
                    listViewStyle={styles.listView}
                    loaddingText={() =>  desInputRef.current?.setAddressText(textDestination)}
                  />
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0}}>
                  <InputAutoComplete
                    placeholder='Choose an origin place'
                    onPlaceSelected={(details) => {
                      setOriRouteInfo(details)
                    }}
                    isFocusedInput={isFocusedOriInput}
                    handleFocus={(condition) => setIsFocusedOriInput(condition)}
                    inputRef={oriInputRef}
                    map_api_key={map_api_key}
                    predefinedPlaces={arrPlaceInput}
                    // handleGetAddressText={(addressText) => {
                    //   Keyboard.dismiss()
                    //   handleGetPlacesSearchText(addressText)
                    // }}
                    isHaveLeftButton={false}
                    textInputStyle={styles.textInput}
                    listViewStyle={styles.listView}
                    predefinedPlacesDescriptionStyle={styles.predefinedPlacesDescription}
                    loaddingText={() =>  oriInputRef.current?.setAddressText(textOrigin)}
                  />
                </View>
                
              </View>
              <TouchableOpacity 
              onPress={() => {
                const currentOriText = oriInputRef.current.getAddressText() 
                const currentDesText = desInputRef.current.getAddressText() 

                oriInputRef.current.setAddressText(currentDesText)
                desInputRef.current.setAddressText(currentOriText)
                
                if (!oriRouteInfo || !desRouteInfo) {
                  if (currentOriText === 'My location') {
                    setOriRouteInfo(desRouteInfo)
                    setDesRouteInfo(arrPlaceInput[0])
                  } else if (currentDesText === 'My location') {
                    setDesRouteInfo(oriRouteInfo)
                    setOriRouteInfo(arrPlaceInput[0])
                  } else {
                    const temp = oriRouteInfo
                    setOriRouteInfo(desRouteInfo)
                    setDesRouteInfo(temp)
                  }
                } else {
                  const temp = oriRouteInfo
                  setOriRouteInfo(desRouteInfo)
                  setDesRouteInfo(temp)
                }

              }}
              style={{ padding: 5, paddingLeft: 0}}>
                <Octicons
                  name='arrow-switch' 
                  size={22} 
                  color={app_c.HEX.ext_second}
                  style={{transform: [{ rotate: '90deg'}], marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>
          }
        </View>
        {
          !isShowOptionRoute &&
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={40}
            style={styles.tagListTrans}
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
              typeModeTransport.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.tagContainerTrans, {
                    backgroundColor: tagModeSelected === item.id ? app_c.HEX.fourth : app_c.HEX.primary
                  }]}
                  onPress={() => {
                    setDirectionMode(item.mode)
                    setTagModeSelected(item.id)
                  }}
                >
                  <FontAwesome5
                    name={item.icon} 
                    size={18} 
                    color={tagModeSelected === item.id ? app_c.HEX.primary : app_c.HEX.ext_second}
                    style={{paddingLeft: 15}}
                  />
                  <Text style={[styles.tagTextTrans, {
                    color: tagModeSelected === item.id ? app_c.HEX.primary : app_c.HEX.ext_second
                  }]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        }
      </>
     }
      
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
                setShowDirections(true)
                setIsShowOptionRoute(true)
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
          snapToStart={false}
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={[styles.cardScrollView, { opacity: (isOpenBottomSheet || showDirections) ? 0 : 1, bottom: (isOpenBottomSheet || showDirections) ? -400 : 110}]}
          contentInset={{
            top: 0,   
            left:SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
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
          {placesTextSearch.map((place, index) => {
            return (
              <View style={styles.card} key={`${place.place_id}-place-${index}`}>
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
                      onPress={() => {
                        setTextDestination(place?.name)
                        // setPlaceDetails(place)
                        handleRoutePress({
                          latitude: place.geometry.location.lat,
                          longitude: place.geometry.location.lng
                        }, place?.place_id)
                      }}
                      style={styles.scrollPlaceBtn}
                    >
                      <Text style={styles.textSign}>Đường đi</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })}
          {
            isShowRefreshCard &&
            <View style={styles.refreshContainer}>
              <ActivityIndicator size="small" color={app_c.HEX.fourth}/>
            </View>
          }
        </Animated.ScrollView> : null
      }

          {/* <Animated.ScrollView
            ref={cardScrollViewRef}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={[styles.cardScrollView, {bottom: 120, paddingHorizontal: 0}]}
            contentInset={{
              top: 0,   
              left:SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET
            }}
            contentContainerStyle={{
              paddingRight: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
            }}
            // onScroll={Animated.event(
            //   [
            //     {
            //       nativeEvent: {
            //         contentOffset: {
            //           x: mapAnimation,
            //         }
            //       },
            //     },
            //   ],
            //   { useNativeDriver: true }
            // )}
          >
            {markers.map((marker) => {
              return (
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
                        style={[styles.signIn, {
                          borderColor: '#112D4E',
                          borderWidth: 1
                        }]}
                      >
                        <Text style={[styles.textSign, {
                          color: '#112D4E'
                        }]}
                        >
                          Explore Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })}
          </Animated.ScrollView>  */}
      
      <BottomSheetScroll
        openTermCondition={isOpenBottomSheet}
        closeTermCondition={() => {
          // TH1: Khi user click vào 1 địa điểm ngay từ đầu
          if (!placesTextSearch && placeDetails) {
            setIsShowBackIcon(false)
            setPlaceDetails(null)
            setDestination(null)
            setPlacesTextSearch(null)
            inputRef.current?.clear()
          }
          // TH2: Khi người dùng search nheièu địa điểm và tìm trên bản đồ 1 địa điểm khác
          else if (placesTextSearch && placeDetails) {
            setPlaceDetails(null)
            setDestination(null)
            inputRef.current?.setAddressText(previousTextSearch)

            // const edgePadding = {
            //   top: 70,
            //   right: 70,
            //   bottom: 260,
            //   left: 70
            // }
            // handleFitCoors(arrPlaceToFitCoor, edgePadding, true)
          }
          
          setIsOpenBottomSheet(false)
        }}
        snapPoints={['20%', '40%', '100%']}
        haveBtn={false}
        haveOverlay={false}
        bottomView={{
          paddingHorizontal: 0,
          paddingBottom: 120,
        }}
        haveHeader={true}
        childHeader={
          <Text style={styles.headerBottomSheet}>{placeDetails?.name}</Text>
        }
        childView={
          <View>
            <View style={styles.contentContainer}>
              <View style={styles.typeTimeContainer}>
                {
                  placeDetails?.types.length > 0 &&
                  placeDetails?.types.map((type, index) => {
                    const typePlace = typesPlace.find(typePlace => typePlace.id === type)
                    if (typePlace)
                      return (
                        <View key={index} style={styles.textTypeContainer}>
                          <Text style={styles.textType}>{typePlace[typePlace.id].vi}</Text>
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
                  setTextDestination(placeDetails?.name)
                  handleRoutePress({
                    latitude: placeDetails.geometry.location.lat,
                    longitude: placeDetails.geometry.location.lng
                  }, placeDetails?.place_id)
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
                  right: 35
                }}
                // Phương: For android
                contentContainerStyle={{
                  paddingRight: Platform.OS === 'android' ? 25 : 0
                }}
              >
                {
                  placeDetails.photos.map((photo, index) => {
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

      <BottomSheetExample
        bottomSheetExampleRef={bottomSheetExampleRef}
        openTermCondition={isOpenBottomSheetFilter}
        closeTermCondition={() => {
          setIsOpenBottomSheetFilter(false)
        }}
        snapPoints={['20%', '40%', '100%']}
        labelBtn='Save'
        handleLabelBtn={() => null}
        haveBtn={true}
        haveOverlay={true}
        haveHeader={true}
        childView={
          <NavigationContainer independent={true}>
            <Stack.Navigator 
              initialRouteName='FilterScreen'
            >
              <Stack.Screen
                name='FilterScreen'
                options={{ header: () => null }}
              >
                {() => 
                <Filter
                  closeTermCondition={() => {
                    setIsOpenBottomSheetFilter(false)
                  }}
                  bottomSheetExampleRef={bottomSheetExampleRef}
                  locationCurrent={locationCurrent}
                  map_api_key={map_api_key}
                  arrPlaceInput={arrPlaceInput}
                />}
              </Stack.Screen>

              <Stack.Screen
                name='CategoriesScreen'
                options={{ header: () => null }}
              >
                {() => 
                <Category
                  typesPlace={typesPlace}
                />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        }
      />
    </>
  )
}

export default memo(Map)