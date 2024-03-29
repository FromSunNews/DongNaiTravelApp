import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'customHooks/useTheme'

import AppText from 'components/app_text/AppText'
import RectangleButton from 'components/buttons/RectangleButton'
import CircleButton from 'components/buttons/CircleButton'

import styles from './HorizontalPlaceCardStyles'
import { app_sp,app_shdw } from 'globals/styles'


const HorizontalPlaceCardSkeleton = () => {
  console.log("Horizontal Card Skeleton Render");
  //theme
  const { theme, themeMode } = useTheme();

  return (
    <View style={[styles.card,{backgroundColor: theme.subBackground, ...app_shdw.type_1}]}>
      {/* Cột đâu tiên - Image Container */}
      <View style={{...styles.card_image_container, ...app_sp.me_12,backgroundColor: theme.subOutline}}>
      </View>
      {/* Cột thứ 2 - Main Container */}
      <View style={styles.card_main_container}>
        <View style={styles.card_content_container}>
          <View style={{...styles.car_skeleton_rectangle, ...app_sp.mb_12, backgroundColor: theme.subOutline, height: 7}}>
          </View>
          <View>
            <View style={{...styles.car_skeleton_rectangle, height: 18, ...app_sp.mb_6, backgroundColor: theme.subOutline}}></View>
            <View style={{...styles.car_skeleton_rectangle, height: 12, ...app_sp.mb_6,backgroundColor: theme.subOutline}}></View>
          </View>
          <View style={styles.card_information_container}>
            <View style={{...styles.card_information_col, ...app_sp.me_12}}>
              <View style={{...styles.car_skeleton_rectangle, height: 12, ...app_sp.mb_6,backgroundColor: theme.subOutline}}></View>
              <View style={{...styles.car_skeleton_rectangle, height: 12, ...app_sp.mb_6,backgroundColor: theme.subOutline}}></View>
            </View>
            <View style={styles.card_information_col}>
              <View style={{...styles.car_skeleton_rectangle, height: 12, ...app_sp.mb_6, backgroundColor: theme.subOutline}}></View>
            </View>
          </View>
        </View>
        <View style={styles.card_buttons_container}>
          <CircleButton
            style={[app_sp.me_8, { backgroundColor: theme.subOutline }]}
            typeOfButton="highlight"
          />
          <CircleButton
            style={[app_sp.me_8, { backgroundColor: theme.subOutline }]}
            typeOfButton="highlight"
          />
        </View>
      </View>

      {/* Cột thứ 3 - Share Container */}
      <View style={styles.card_share_container}>
      </View>
    </View>
  )
}

export default HorizontalPlaceCardSkeleton