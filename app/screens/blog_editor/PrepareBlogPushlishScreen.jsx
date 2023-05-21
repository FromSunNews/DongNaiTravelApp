import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {
  AppText,
  RectangleButton
} from 'components'

import {
  app_c,
  app_sp
} from 'globals/styles'

const PrepareBlogPushlishScreen = () => {
  return (
    <View style={[styles.container, {backgroundColor: app_c.HEX.primary}]}>
      <Text>Prepare to pushlish here</Text>
    </View>
  )
}

export default PrepareBlogPushlishScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})