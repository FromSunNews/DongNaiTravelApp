import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  LayoutAnimation,
  Animated,
  ActivityIndicator
} from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { useBriefPlaces } from 'customHooks/usePlace'

import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import {
  BRIEF_PLACE_DATA_FIELDS,
  PLACE_QUALITIES
} from 'utilities/constants'


import Ionicons from 'react-native-vector-icons/Ionicons'
import { withTheme } from 'hocs/withTheme'
import {
  TypeScrollView,
  HorizontalPlaceCard,
  HorizontalPlaceCardSkeleton,
  BannerButton
} from 'components'

import styles from './ExploreScreenStyles'
import { app_sp } from 'globals/styles'

/**
 * __Creator__: @NguyenAnhTuan1912
 * @returns 
 */
const ExploreScreen = withTheme(({
  route,
  theme
}) => {
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode 
  const langData = useSelector(selectCurrentLanguage).data?.exploreScreen
  
  const exploreInfo = React.useRef({
    isFirstFetch: true,
    briefPlaceDataFields: BRIEF_PLACE_DATA_FIELDS,
    isEndReach: false,
    isReload: false,
    placesInstance: undefined
  });
  
  const [type, setType] = React.useState("all");
  const [isOnTop, setIsOnTop] = React.useState(true);

  const navigation = useNavigation();
  const {
    places,
    increaseSkip,
    fetchBriefPlaceByType,
    reloadBriefPlacesByType
  } = useBriefPlaces(type);

  if(!exploreInfo.current.placesInstance) exploreInfo.current.placesInstance = places

  const showBannderButton = isVisible => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOnTop(isVisible);
  }

  const handleExploreMomentumScrollEnd = React.useCallback((() => {
    let prevOffsetY = 0;
    return function(e) {
      if(exploreInfo.current.isEndReach) {
        if(places) {
          increaseSkip();
          fetchBriefPlaceByType(exploreInfo.current.briefPlaceDataFields);
        }
      }
      exploreInfo.current.isEndReach = false;
    }
  })());

  const handleExploreScroll = e => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    let val = contentOffset.y;
    if(val <= 0) {
      showBannderButton(true)
    } else {
      showBannderButton(false)
    }
  }

  const handleEndReach = e => {
    exploreInfo.current.isEndReach = true;
  }

  console.log("Render Explore!!!");

  React.useEffect(() => {
    if(!places || places.data.length === 0) {
      fetchBriefPlaceByType(exploreInfo.current.briefPlaceDataFields);
    }
    // dispatch(updateSkipBriefPlacesAmount({typeOfBriefPlaces: type, skip: 5}));
  }, [type]);

  return (
    <View style={{backgroundColor: theme.background}}>
      {
        isOnTop && (
          <View
            style={[
              app_sp.ph_18,
              {
                backgroundColor: theme.background,
                position: 'relative',
                zIndex: 2,
              }
            ]}
          >
            <BannerButton
              defaultColor='type_5'
              activeColor='type_1'
              typeOfButton="highlight"
              style={app_sp.mt_12}
              toScreen={{ screenName: "MapScreen" }}
              setRightIcon={(isActive, currentLabelStyle) =>
                <Ionicons name="chevron-forward-outline" style={currentLabelStyle} size={25} />
              }
            >
              {langData.banner_button[langCode]}
            </BannerButton>
          </View>
        )
      }
      <FlatList
        data={places ? places.data : []}
        key={exploreInfo.current.placesInstance}
        style={[styles.scroll_view_container, { backgroundColor: theme.background }]}
        contentContainerStyle={{paddingBottom: 200, backgroundColor: theme.background}}
        onMomentumScrollEnd={handleExploreMomentumScrollEnd}
        onEndReached={handleEndReach}
        onScroll={handleExploreScroll}
        scrollEventThrottle={1000}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        ListEmptyComponent={
          !places && (
            <View style={[app_sp.mh_18, app_sp.mb_12]}>
              {[1, 2, 3].map((value, index) => <HorizontalPlaceCardSkeleton key={value + index} />)}
            </View>
          )
        }
        ListHeaderComponent={
          <TypeScrollView
            buttonStyle="capsule"
            types={PLACE_QUALITIES[langCode].values}
            labels={PLACE_QUALITIES[langCode].labels}
            callBack={setType}
            scrollStyle={[app_sp.ms_18, app_sp.pv_12]}
            containerStyle={[app_sp.pv_10, { backgroundColor: theme.background }]}
          />
        }
        renderItem={item => <View style={app_sp.ph_18}><HorizontalPlaceCard typeOfBriefPlace={type} place={item.item} placeIndex={item.index} /></View>}
        keyExtractor={item => item._id}
        onRefresh={() => {reloadBriefPlacesByType(exploreInfo.current.briefPlaceDataFields)}}
        refreshing={false}
      />
    </View>
  )
})

export default ExploreScreen