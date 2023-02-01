// Phuong: screen này có trách nhiệm: điều hướng, xác thực, phân group màn hình
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import AsyncStorage from '@react-native-async-storage/async-storage';


import Splash from 'screens/splash/Splash'
import Onboarding from 'screens/onboarding/Onboarding'
import GroupBottomTab from 'navigations/group_bottom_tab/GroupBottomTab'
import NotificationBottomSheet from 'components/notification_bottom_sheet/NotificationBottomSheet'

const AuthNavigator = () => {
  // Phuong: https://reactnavigation.org/docs/getting-started
  const AppStack = createNativeStackNavigator()

  const [isFirstLauch, setisFirstLauch] = useState(null)
  const [initialRouteName, setInitialRouteName] = useState('GroupBottomTab')

  // Phuong: xem issue https://github.com/FromSunNews/DongNaiTravelApp/issues/11

  // useEffect(() => {
  //     AsyncStorage.getItem('alreadyLauched').then(value => {
  //         if (value == null) {
  //             AsyncStorage.setItem('alreadyLauched', 'true')
  //             setisFirstLauch(true)
  //         } else {
  //             setisFirstLauch(false)
  //         }
  //     })
  // }, [])
  // if (isFirstLauch == null) {
  //     console.log('null')
  //     return null
  // } else if (isFirstLauch == true) {
  //     console.log('true')
  //     setInitialRouteName('Onboarding')
  // } else {
  //     console.log('false')
  //     setInitialRouteName('Login')
  // }
  return (
    <AppStack.Navigator initialRouteName={initialRouteName}>
      <AppStack.Screen name="Splash" component={Splash} options={{ header: () => null }} />
      <AppStack.Screen name="Onboarding" component={Onboarding} options={{ header: () => null }} />
      <AppStack.Screen name="GroupBottomTab" component={GroupBottomTab} options={{ header: () => null }} />
    </AppStack.Navigator>
  )
}

export default AuthNavigator