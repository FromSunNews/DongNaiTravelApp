import { View, Text } from 'react-native'
import React from 'react'
import styles from './ViewStatsScreenStyles'
import useTheme from 'customHooks/useTheme'

const ViewStatsScreen = () => {
  //theme
  const themeColor = useTheme();
  return (
    <View style={[styles.container,{backgroundColor: themeColor.bg_second}]}>
      <Text style={{color: themeColor.fourth}}>ViewStats</Text>
    </View>
  )
}

export default ViewStatsScreen