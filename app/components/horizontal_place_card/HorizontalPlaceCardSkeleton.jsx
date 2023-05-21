import { View, Text } from 'react-native'
import React from 'react'

import AppText from 'components/app_text/AppText'
import RectangleButton from 'components/buttons/RectangleButton'
import CircleButton from 'components/buttons/CircleButton'

import styles from './HorizontalPlaceCardStyles'
import { app_sp } from 'globals/styles'
import useTheme from 'customHooks/useTheme'

const HorizontalPlaceCardSkeleton = () => {
  console.log("Horizontal Card Skeleton Render");
  //theme
  const themeColor = useTheme();

  return (
    <View style={[styles.card,{backgroundColor: themeColor.primary}]}>
      {/* Cột đâu tiên - Image Container */}
      <View style={{...styles.card_image_container, ...app_sp.me_12,backgroundColor: themeColor.ext_primary}}>
      </View>
      {/* Cột thứ 2 - Main Container */}
      <View style={[styles.card_main_container,{backgroundColor: themeColor.ext_primary}]}>
        <View style={[styles.card_content_container,{backgroundColor: themeColor.ext_primary}]}>
          <View style={{...styles.car_skeleton_rectangle, ...app_sp.mb_12, backgroundColor: themeColor.ext_primary, height: 7}}>
          </View>
          <View>
            <View style={{...styles.car_skeleton_rectangle, height: 18, ...app_sp.mb_6, backgroundColor: themeColor.ext_primary}}></View>
            <View style={{...styles.car_skeleton_rectangle, height: 12, ...app_sp.mb_6,backgroundColor: themeColor.ext_primary}}></View>
          </View>
          <View style={[styles.card_information_container,{backgroundColor: themeColor.ext_primary}]}>
            <View style={{...styles.card_information_col, ...app_sp.me_12}}>
              <View style={{...styles.car_skeleton_rectangle, height: 12, ...app_sp.mb_6,backgroundColor: themeColor.ext_primary}}></View>
              <View style={{...styles.car_skeleton_rectangle, height: 12, ...app_sp.mb_6,backgroundColor: themeColor.ext_primary}}></View>
            </View>
            <View style={styles.card_information_col}>
              <View style={{...styles.car_skeleton_rectangle, height: 12, ...app_sp.mb_6, backgroundColor: themeColor.ext_primary}}></View>
            </View>
          </View>
        </View>
        <View style={styles.card_buttons_container}>
          <CircleButton
            style={app_sp.me_8}
            typeOfButton="highlight"
          />
          <CircleButton
            style={app_sp.me_8}
            typeOfButton="highlight"
          />
          <RectangleButton
            typeOfButton="highlight"
            overrideShape="capsule"
          >
          </RectangleButton>
        </View>
      </View>

      {/* Cột thứ 3 - Share Container */}
      <View style={styles.card_share_container}>
      </View>
    </View>
  )
}

export default HorizontalPlaceCardSkeleton