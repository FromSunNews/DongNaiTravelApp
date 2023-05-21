import { View, Text } from 'react-native'
import React from 'react'

import {
  AppText,
  RectangleButton
} from 'components'

import {
  app_c,
  app_sp
} from 'globals/styles'

const UnAuthenticationScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: app_c.HEX.primary, justifyContent: 'center', alignItems: 'center'}}>
      <AppText>Please sign in to use this feature.</AppText>
      <RectangleButton
        overrideShape='capsule'
        typeOfButton='highlight'
        style={app_sp.mt_12}
        onPress={() => {
          navigation.goBack();
          navigation.replace('SigninScreen');
        }}
      >
        <AppText>Back to sign in</AppText>
      </RectangleButton>
    </View>
  )
}

export default UnAuthenticationScreen