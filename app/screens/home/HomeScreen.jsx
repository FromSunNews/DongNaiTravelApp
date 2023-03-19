import { View, Text, Button, Image } from 'react-native'
import React, { useEffect } from 'react'

import { styles } from './HomeScreenStyles'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, signOutUserAPI } from 'redux/user/UserSlice'
import { useNavigation } from '@react-navigation/native'
import RenderHtml from 'react-native-render-html';
import { app_dms } from 'globals/styles'

const HomeScreen = () => {
  const htmlInstructions = "";
  const source = {
    html: `Rẽ \u003cb\u003etrái\u003c/b\u003e tại Giày Hưng Thịnh vào \u003cb\u003eQLN2\u003c/b\u003e/\u003cwbr/\u003e\u003cb\u003eCT02\u003c/b\u003e\u003cdiv style=\"font-size:0.9em\"\u003eĐi qua Cửa hàng sắt Tuệ Lâm (ở bên phải cách 3,9 km)\u003c/div\u003e\u003cdiv style=\"font-size:0.9em\"\u003eĐiểm đến sẽ ở bên trái\u003c/div\u003e`
  };
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigation = useNavigation() 
  return (
    <View style={styles.container}>
      <RenderHtml
      contentWidth={app_dms.screenWidth}
      source={source}
    />
      <Button
        title='Logout' 
        onPress={() => {
          dispatch(signOutUserAPI()).then(
            navigation.replace('SigninScreen')
          )
        }}
      />
    </View>
  )
}

export default HomeScreen