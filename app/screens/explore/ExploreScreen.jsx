import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  LayoutAnimation
} from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { useBriefPlaces } from 'customHooks/usePlace'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { TypeScrollView, HorizontalPlaceCard, HorizontalPlaceCardSkeleton, BannerButton } from 'components'

import styles from './ExploreScreenStyles'
import { app_sp, app_c } from 'globals/styles'

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * @returns 
 */
const ExploreScreen = () => {
  const exploreInfo = React.useRef({
    isFirstFetch: true,
    briefPlaceDataFields: "place_id;name;adr_address;types;rating;user_ratings_total;isRecommended;numberOfVisited",
    isEndReach: false
  });
  const [type, setType] = React.useState("all");
  const [isOnTop, setIsOnTop] = React.useState(true);
  const navigation = useNavigation();

  const { places, inscreaseSkip, fetchBriefPlaceByType } = useBriefPlaces(type);

  React.useEffect(() => {
    if(!places) {
      fetchBriefPlaceByType(exploreInfo.current.briefPlaceDataFields);
    }
    // dispatch(updateSkipBriefPlacesAmount({typeOfBriefPlaces: type, skip: 5}));
  }, [type]);

  const showBannderButton = isVisible => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOnTop(isVisible);
  }

  const handleExploreMomentumScrollEnd = React.useCallback((() => {
    let prevOffsetY = 0;
    return function(e) {
      if(exploreInfo.current.isEndReach) {
        if(places) {
          inscreaseSkip();
          fetchBriefPlaceByType(exploreInfo.current.briefPlaceDataFields);
        }
      }
      exploreInfo.current.isEndReach = false;
    }
  })());

  const handleExploreScroll = e => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    if(contentOffset.y <= 0) {
      showBannderButton(true)
    } else {
      showBannderButton(false)
    }
  }

  const handleEndReach = e => {
    exploreInfo.current.isEndReach = true;
  }

  return (
    <View>
      {
        isOnTop && (
          <View style={[app_sp.ph_18, {backgroundColor: app_c.HEX.primary, position: "relative", zIndex: 2}]}>
            <BannerButton
              typeOfButton="highlight"
              style={app_sp.mt_12}
              toScreen={{screenName: "MapScreen"}}
              setRightIcon={(isActive, currentLabelStyle) =>
                <Ionicons name="chevron-forward-outline" style={currentLabelStyle} size={25} />
              }
            >
              Let’s see your location in map
            </BannerButton>
          </View>
        )
      }
      <FlatList
        data={places ? places.data : []}
        style={styles.scroll_view_container}
        onMomentumScrollEnd={handleExploreMomentumScrollEnd}
        onEndReached={handleEndReach}
        onScroll={handleExploreScroll}
        // scrollEventThrottle={1000}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        ListFooterComponent={
          <View style={{height: 50}}></View>
        }
        ListEmptyComponent={
          !places && (
            <View style={[app_sp.mh_18, app_sp.mb_12]}>
              {[1, 2, 3].map((value, index) => <HorizontalPlaceCardSkeleton key={value + index} />)}
            </View>
          )
        }
        ListHeaderComponent={
          <TypeScrollView
            buttonStyle="rounded_8"
            types='all;recommended;popular;most_visit;high_rating'
            callBack={setType}
            scrollStyle={[app_sp.ms_18, app_sp.pv_12]}
            containerStyle={{backgroundColor: app_c.HEX.primary, ...app_sp.pv_10}}
          />
        }
        renderItem={item => <View style={app_sp.ph_18}><HorizontalPlaceCard place={item.item} /></View>}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default ExploreScreen