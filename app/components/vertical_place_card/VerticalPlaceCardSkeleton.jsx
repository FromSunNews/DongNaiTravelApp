import { View, Text } from 'react-native'
import React from 'react'

import ComponentUtility from 'utilities/component'

import styles from './VerticalPlaceCardStyles'

import { ViewProps } from 'types/index.d'
import { app_sh, app_sp } from 'globals/styles'
import useTheme from 'customHooks/useTheme'

/**
 * @param {ViewProps} props Props của component. Chình là props của View.
 * @returns 
 */
const VerticalPlaceCardSkeleton = (props) => {
  const containerStyle = ComponentUtility.mergeStyle(styles.card, props.style);
  //theme
  const themeColor = useTheme();

  return (
    <View {...props} style={containerStyle}>
      {/* Image */}
      <View style={[styles.card_image,{backgroundColor: themeColor.ext_primary,}]}></View>
      {/* Button & Recommended tag */}
      <View style={styles.card_mid}>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, { backgroundColor: themeColor.ext_primary,height: 15, width: '50%' }]}></View>
      </View>

      {/* Content */}
      <View style={styles.card_content_container}>
        <View style={[styles.card_ske_bg, app_sp.mb_6, app_sh.rounded_4, {backgroundColor: themeColor.ext_primary, height: 19, width: '100%' }]}></View>

        {/* Sub-information */}
        <View style={styles.card_content_sub_information_container}>
          <View style={[styles.card_ske_bg, app_sh.rounded_4, {backgroundColor: themeColor.ext_primary, height: 15, width: '70%' }]}></View>
          <View style={[styles.card_ske_bg, app_sh.rounded_4, {backgroundColor: themeColor.ext_primary, height: 15, width: '30%' }]}></View>
        </View>
      </View>

      {/* Like button */}
      <View style={styles.card_buttons_container}>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, { backgroundColor: themeColor.ext_primary,height: 30, flex: .5 }]}></View>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, {backgroundColor: themeColor.ext_primary, height: 30, flex: .5 }]}></View>
      </View>
    </View>
  )
}

export default VerticalPlaceCardSkeleton