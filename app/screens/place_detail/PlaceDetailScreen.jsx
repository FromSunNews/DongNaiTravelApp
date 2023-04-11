import { View, Text, Pressable, ScrollView, Animated } from 'react-native'
import React from 'react'

import BottomSheet, { BottomSheetView, BottomSheetScrollView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { AppText, MyFadeAnimatedView, MyHeader, RectangleButton, CircleButton, AppTabSlider, SimpleBarChart } from 'components'

import { HEADER_HEIGHT } from 'utilities/constants'

import styles from './PlaceDetailScreenStyles'
import { app_c, app_dms, app_sp } from 'globals/styles'

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * @param {object} props - Props của component.
 * @param {Animated.Value} props.opacityAnimValue - Đây là một Animated.Value().
 * @returns 
 */
const PlaceDetailScreen = () => {
  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(
    () => ['60%', `${100- (30 / app_dms.screenHeight) * 100}%`], []
  );
  const opacityValue = React.useRef(new Animated.Value(0)).current;

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

  return (
    <View style={{backgroundColor: app_c.HEX.ext_third, flex: 1}}>
      <Animated.View
        style={{
          opacity: opacityValue,
          backgroundColor: app_c.HEX.primary,
          height: HEADER_HEIGHT,
          zIndex: 999
        }}
      />
      <BottomSheet
        snapPoints={snapPoints}
        index={0}
        ref={bottomSheetRef}
        style={styles.pd_bottom_sheet}
        onChange={handleChangeBottomSheet}
        backgroundStyle={{
          backgroundColor: app_c.HEX.primary
        }}
      >
        <BottomSheetScrollView
          style={styles.pd_bottom_sheet_view}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pd_header}>

            {/* Information row */}
            <View style={{...styles.pd_row, ...app_sp.mb_12}}>

              {/* Name, location of visits column */}
              <View style={{flex: 1}}>
                <AppText font="h2" numberOfLines={2}>Lorem Ipsum</AppText>
                <AppText font="sub0">is simply dummy text.</AppText>
              </View>

              {/* Ratings, number of visits column */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppText font="body2" style={app_sp.me_12}>
                  <Ionicons name='star-outline' /> {4.6}
                </AppText>
                <AppText font="body2" style={{}}>
                  <Ionicons name='eye-outline' /> {300}
                </AppText>
              </View>
            </View>

            {/* Buttons container row */}
            <View style={{...styles.pd_row, ...app_sp.mb_12}}>
              <CircleButton
                style={app_sp.me_8}
                isActive
                typeOfButton="highlight"
                setIcon={(isActive, currentLabelStyle) => (
                  <Ionicons name={isActive ? 'heart' : 'heart-outline'} size={14} style={currentLabelStyle} />
                )}
              />
              <CircleButton
                style={app_sp.me_8}
                typeOfButton="highlight"
                setIcon={(isActive, currentLabelStyle) => (
                  <Ionicons name={isActive ? 'map' : 'map-outline'} size={14} style={currentLabelStyle} />
                )}
              />
              <RectangleButton
                isActive={false}
                typeOfButton="highlight"
                overrideShape="capsule"
              >
                {(isActive, currentLabelStyle) => (
                  <AppText style={currentLabelStyle} font="body2">{isActive ? 'Visited' : 'Visit'}</AppText>
                )}
              </RectangleButton>
            </View>

            {/* Tags container row */}
            <View style={styles.pd_row}>
              <AppText font="body2" style={app_sp.me_12}>
                <Ionicons name='pricetag-outline' /> Tags:
              </AppText>
              <RectangleButton
                defaultColor="type_4"
                typeOfButton="highlight"
                overrideShape="rounded_4"
                style={{...app_sp.ph_8, ...app_sp.pv_0, ...app_sp.me_6}}
              >
                {(isActive, currentLabelStyle) => (
                  <AppText style={currentLabelStyle} font="body3">Recommeded</AppText>
                )}
              </RectangleButton>
              <RectangleButton
                typeOfButton="highlight"
                overrideShape="rounded_4"
                style={{...app_sp.ph_8, ...app_sp.pv_0}}
              >
                {(isActive, currentLabelStyle) => (
                  <AppText style={currentLabelStyle} font="body3">Exercise</AppText>
                )}
              </RectangleButton>
            </View>
          </View>
          
          {/* Tabs */}
          <AppTabSlider>
            <AppTabSlider.Child name="about" component={() => <AboutSlide />} />
            <AppTabSlider.Child name="reviews" component={() => <ReviewsSlide />} />
          </AppTabSlider>
          
          <View style={{height: 100}}></View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

const AboutSlide = ({
  
}) => {
  return (
    <View style={styles.pd_content_container}>
      {/* Description */}
      <View style={styles.pd_content_article}>
        <AppText font="h3" numberOfLines={1} style={app_sp.mb_6}>Description</AppText>
        <AppText color="ext_second">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </AppText>
      </View>

      {/* Images */}
      <View style={styles.pd_content_article}>
        <AppText font="h3" numberOfLines={1} style={app_sp.mb_6}>Images</AppText>
        <View style={styles.pd_content_image_row_container}>
          <View style={{...styles.pd_content_image_row, ...app_sp.mb_12}}>
            <RectangleButton
              isOnlyContent
              typeOfButton="highlight"
              overrideShape="rounded_8"
              style={styles.pd_content_image_button}
            >
              <View style={{backgroundColor: app_c.HEX.ext_primary, width: '100%', aspectRatio: 1}}></View>
            </RectangleButton>
            <RectangleButton
              isOnlyContent
              typeOfButton="highlight"
              overrideShape="rounded_8"
              style={styles.pd_content_image_button}
            >
              <View style={{backgroundColor: app_c.HEX.ext_primary, width: '100%', aspectRatio: 1}}></View>
            </RectangleButton>
          </View>
        </View>

        <View style={styles.pd_content_image_row_container}>
          <View style={{...styles.pd_content_image_row, ...app_sp.mb_12}}>
            <RectangleButton
              isOnlyContent
              typeOfButton="highlight"
              overrideShape="rounded_8"
              style={styles.pd_content_image_button}
            >
              <View style={{backgroundColor: app_c.HEX.ext_primary, width: '100%', aspectRatio: 1}}></View>
            </RectangleButton>
            <RectangleButton
              isOnlyContent
              typeOfButton="highlight"
              overrideShape="rounded_8"
              style={styles.pd_content_image_button}
            >
              <View style={{backgroundColor: app_c.HEX.ext_primary, width: '100%', aspectRatio: 1}}></View>
            </RectangleButton>
          </View>
        </View>
      </View>

      {/* Related Places */}
      <View style={{...styles.pd_content_article, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <AppText font="h3" numberOfLines={1} style={app_sp.mb_6}>Related Places</AppText>
        <CircleButton
          isTransparent
          typeOfButton="highlight"
          setIcon={(isActive, currentLabelStyle) => (
            <Ionicons style={currentLabelStyle} name="chevron-forward-outline" size={18} />
          )}
        />
      </View>
    </View>
  );
}

const ReviewsSlide = () => {
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

  return (
    <View style={styles.pd_content_container}>

      {/* Review rating information */}
      <View>
        <AppText font="h3" style={app_sp.mb_12}>Ratings & reviews</AppText>
        
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

    </View>
  );
}

export default PlaceDetailScreen