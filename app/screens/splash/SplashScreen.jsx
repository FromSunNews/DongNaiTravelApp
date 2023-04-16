import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

import { styles } from './SplashScreenStyles'
import { app_c } from 'globals/styles'
import { useNavigation } from '@react-navigation/native'
import { Easing } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated } from 'redux/user/UserSlice'
import { selectCurrentWareHouse } from 'redux/warehouse/WareHouseSlice'
import * as Localization from 'expo-localization';
import { updateLanguageCode, updateData } from 'redux/language/LanguageSlice'
import { languageData } from 'utilities/language'

const SplashScreen = () => {
  // Phuong: https://github.com/lottie-react-native/lottie-react-native#usage
  
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  console.log("🚀 ~ file: SplashScreen.jsx:23 ~ SplashScreen ~ isAuthenticated:", isAuthenticated)
  const isFirstTimeLauch = useSelector(selectCurrentWareHouse).isFirstTimeLauch
  console.log("🚀 ~ file: SplashScreen.jsx:25 ~ SplashScreen ~ isFirstTimeLauch:", isFirstTimeLauch)


  const [loaded, setLoaded] = useState(false)
  const opacity = useRef(new Animated.Value(0)).current
  useEffect(() => {
    const languageCode = Localization.locale.split('-')[0]
    // en or vi
    console.log("🚀 ~ file: SplashScreen.jsx:29 ~ useEffect ~ languageCode:", languageCode)
    dispatch(updateLanguageCode(languageCode))
    dispatch(updateData(languageData))

    setTimeout(() => {
      Animated.timing(
        opacity,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.ease
        }
      ).start()
    }, 3000);
    
    setTimeout(() => {
      
      setLoaded(true)
    }, 4000)
  }, [])


  useEffect(() => {
    if (loaded) {
      if (isFirstTimeLauch)
        navigation.replace('OnboardingScreen')
      else {
        if (isAuthenticated) 
          navigation.replace('GroupBottomTab')
        else 
          navigation.replace('SigninScreen')
      }
    }
  }, [loaded])

  const lottieViewRef = useRef(null)

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.label, {opacity: opacity}]}
      >DongNaiTravelApp</Animated.Text>
      <View>
        <LottieView
          ref={lottieViewRef}
          onLayout={() => {lottieViewRef.current?.play()}}
          loop={false}
          speed={1.6}
          style={{
            width: 200,
            height: 200,
            backgroundColor: app_c.HEX.primary,
          }}
          source={require('../../assets/animations/loading1.json')}
        />
      </View>
    </View>
  )
}

export default SplashScreen