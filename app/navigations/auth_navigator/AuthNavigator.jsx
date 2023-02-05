// Phuong: screen này có trách nhiệm: điều hướng, xác thực, phân group màn hình
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from 'screens/splash/SplashScreen'
import OnboardingScreen from 'screens/onboarding/OnboardingScreen'
import GroupBottomTab from 'navigations/group_bottom_tab/GroupBottomTab'
import SigninScreen from 'screens/signin/SigninScreen'
import SignupScreen from 'screens/signup/SignupScreen'

const AuthNavigator = () => {
  // Phuong: https://reactnavigation.org/docs/getting-started
  const AppStack = createNativeStackNavigator()

  const [isFirstLauch, setisFirstLauch] = useState(null)
  const [initialRouteName, setInitialRouteName] = useState('SplashScreen')

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
      <AppStack.Screen name="SplashScreen" component={SplashScreen} options={{ header: () => null }} />
      <AppStack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ header: () => null }} />
      <AppStack.Screen name="SigninScreen" component={SigninScreen} options={{ header: () => null }} />
      <AppStack.Screen name="SignupScreen" component={SignupScreen} options={{ header: () => null }} />

      <AppStack.Screen name="GroupBottomTab" component={GroupBottomTab} options={{ header: () => null }} />

    </AppStack.Navigator>
  )
}

export default AuthNavigator