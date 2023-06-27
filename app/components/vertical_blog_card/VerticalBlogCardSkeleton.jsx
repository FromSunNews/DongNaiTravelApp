import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'customHooks/useTheme'

import ComponentUtility from 'utilities/component'

import styles from './VerticalBlogCardStyles'

import { ViewProps } from 'types/index.d'
import { app_sh, app_sp } from 'globals/styles'

/**
 * @param {ViewProps} props Props của component. Chình là props của View.
 * @returns 
 */
const VerticalBlogCardSkeleton = (props) => {
  const containerStyle = ComponentUtility.mergeStyle(styles.card, props.style);
  //theme
  const { theme } = useTheme();
  return (
    <View {...props} style={[containerStyle,{ backgroundColor: theme.subBackground }]}>
      {/* Image */}
      <View style={[styles.card_image, { backgroundColor: theme.subOutline }]}></View>
      {/* Button & Recommended tag */}
      <View style={styles.card_mid}>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, { height: 12, width: '50%', backgroundColor: theme.subOutline }]}></View>
      </View>

      {/* Content */}
      <View style={styles.card_content_container}>
        <View style={[styles.card_ske_bg, app_sp.mb_6, app_sh.rounded_4, { height: 38, width: '100%', backgroundColor: theme.subOutline }]}></View>

        {/* Sub-information */}
        <View style={styles.card_content_sub_information_container}>
          <View style={[styles.card_ske_bg, app_sh.rounded_4, { height: 14.5, flex: .5, backgroundColor: theme.subOutline }]}></View>
          <View style={[styles.card_ske_bg, app_sh.rounded_4, { height: 14.5, flex: .5, backgroundColor: theme.subOutline }]}></View>
        </View>
      </View>

      {/* Like button */}
      <View style={styles.card_buttons_container}>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, { height: 30, flex: .5, backgroundColor: theme.subOutline }]}></View>
        <View style={[styles.card_ske_bg, app_sh.rounded_4, { height: 30, flex: .5, backgroundColor: theme.subOutline }]}></View>
      </View>
    </View>
  )
}

export default VerticalBlogCardSkeleton