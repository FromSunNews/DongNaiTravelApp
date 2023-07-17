import { View, Text } from 'react-native'
import React from 'react'

import { withTheme } from 'hocs/withTheme'

import { AppText } from 'components'

import styles from './ViewStatsScreenStyles'

const ViewStatsScreen = withTheme(({
  theme
}) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppText>ViewStats</AppText>
    </View>
  )
});

export default ViewStatsScreen