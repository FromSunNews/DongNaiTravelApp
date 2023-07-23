import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from 'customHooks/useTheme'

import ComponentUtility from 'utilities/component'

import styles from './VerticalBlogCardStyles'

import { ViewProps } from 'types/index.d'

import { app_c, app_sh, app_sp } from 'globals/styles'
import useTheme from 'customHooks/useTheme'
import Skeleton from 'components/skeleton/Skeleton'


/**
 * @param {ViewProps} props Props của component. Chình là props của View.
 * @returns 
 */
const VerticalBlogCardSkeleton = (props) => {
  const containerStyle = ComponentUtility.mergeStyle(styles.card, props.style);
  //theme
  const { theme } = useTheme();
  return (

    <View {...props} style={[containerStyle,{backgroundColor: 'white'}]}>
      {/* Image */}
      <Skeleton
        skeletonStyle={styles.card_image}
      />
      {/* Button & Recommended tag */}
      <Skeleton
        skeletonStyle={[,
          styles.card_mid,
          styles.card_ske_bg, app_sh.rounded_4, { height: 12, width: '50%', backgroundColor: app_c.HEX.ext_primary, marginBottom: 5, }
        ]}
      />

      {/* Content */}
      <View style={styles.card_content_container}>
        <Skeleton
          skeletonStyle={[styles.card_ske_bg, app_sp.mb_6, app_sh.rounded_4, { height: 38, width: '100%', backgroundColor: app_c.HEX.ext_primary }]}
        />

        {/* Sub-information */}
        <View style={styles.card_content_sub_information_container}>
          <Skeleton
            skeletonStyle={[styles.card_ske_bg, app_sh.rounded_4, { height: 14.5, flex: .48, backgroundColor: app_c.HEX.ext_primary }]}
          />
          <View style={{flex: .04,}}></View>
          <Skeleton
            skeletonStyle={[styles.card_ske_bg, app_sh.rounded_4, { height: 14.5, flex: .48, backgroundColor: app_c.HEX.ext_primary }]}
          />
        </View>
      </View>

      {/* Like button */}
      <View style={[styles.card_buttons_container, {paddingTop: 3, marginTop: 3}]}>
        <Skeleton
          skeletonStyle={[styles.card_ske_bg, app_sh.rounded_4, { height: 30, flex: .48, backgroundColor: app_c.HEX.ext_primary }]}
        />
        <View style={{flex: .04,}}></View>
        <Skeleton
          skeletonStyle={[styles.card_ske_bg, app_sh.rounded_4, { height: 30, flex: .48, backgroundColor: app_c.HEX.ext_primary }]}
        />
      </View>
    </View>
  )
}

export default VerticalBlogCardSkeleton