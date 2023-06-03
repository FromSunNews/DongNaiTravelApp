import { View, Text } from 'react-native'
import React from 'react'

import {
  AppText,
  RectangleButton
} from 'components'

import {
  app_c,
  app_dms,
  app_sp
} from 'globals/styles'
import { Image } from 'react-native'

const UnAuthenticationScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: app_c.HEX.primary, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/images/un_authen.png')}
        style={{
          width: app_dms.screenWidth - 18 * 2,
          height: app_dms.screenHeight * 30 / 100,
          resizeMode: 'contain',
          marginBottom: 40,
        }}
      />
      <AppText weight="lighter" font="h4">Please sign in to use this feature.</AppText>
      <RectangleButton
        overrideShape='capsule'
        typeOfButton='highlight'
        style={app_sp.mt_12}
        defaultColor='type_3'
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