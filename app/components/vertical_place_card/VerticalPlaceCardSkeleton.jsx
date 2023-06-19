import { View, Text } from 'react-native'
import React from 'react'

import ComponentUtility from 'utilities/component'

import styles from './VerticalPlaceCardStyles'

import { ViewProps } from 'types/index.d'
import { app_sh, app_shdw, app_sp } from 'globals/styles'
import useTheme from 'customHooks/useTheme'

/**
 * @param {ViewProps} props Props của component. Chình là props của View.
 * @returns 
 */
const VerticalPlaceCardSkeleton = (props) => {
  const containerStyle = ComponentUtility.mergeStyle(styles.card, props.style);
  //theme
  const {themeColor, themeMode} = useTheme();
  const background = themeMode === 'light' ? themeColor.bg_second : themeColor.bg_tertiary
  const dataBshdw = themeMode === 'light' ? 'type_1' : 'type_1_dark'

  return (
    <View {...props} style={[containerStyle,{backgroundColor: background,...app_shdw[dataBshdw]}]}>
      {/* Image */}
      <View style={[styles.card_image]}></View>
      {/* Button & Recommended tag */}
      <View style={styles.card_mid}>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, { backgroundColor: themeColor.bg_tertiary,height: 15, width: '50%' }]}></View>
      </View>

      {/* Content */}
      <View style={styles.card_content_container}>
        <View style={[styles.card_ske_bg, app_sp.mb_6, app_sh.rounded_4, {backgroundColor: themeColor.bg_tertiary, height: 19, width: '100%' }]}></View>

        {/* Sub-information */}
        <View style={styles.card_content_sub_information_container}>
          <View style={[styles.card_ske_bg, app_sh.rounded_4, {backgroundColor: themeColor.bg_tertiary, height: 15, width: '70%' }]}></View>
          <View style={[styles.card_ske_bg, app_sh.rounded_4, {backgroundColor: themeColor.bg_tertiary, height: 15, width: '30%' }]}></View>
        </View>
      </View>

      {/* Like button */}
      <View style={styles.card_buttons_container}>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, { backgroundColor: themeColor.bg_tertiary,height: 30, flex: .5 }]}></View>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, {backgroundColor: themeColor.bg_tertiary, height: 30, flex: .5 }]}></View>
      </View>
    </View>
  )
}

export default VerticalPlaceCardSkeleton