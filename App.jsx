import React, { useEffect } from 'react'
import { Text, StatusBar, SafeAreaView } from 'react-native'

import { store, persistor } from 'redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { NavigationContainer } from '@react-navigation/native'

import NotificationBottomSheet from 'components/notification_bottom_sheet/NotificationBottomSheet'

import { useFonts } from 'expo-font'
import AuthNavigator from 'navigations/auth_navigator/AuthNavigator'
import Loading from 'components/loading/Loading'

// Phuong: How can I use the Redux store in non-component files?
import { injectStore } from 'axios/authorizedAxiosInstance'
injectStore(store)

import { injectStoreRequest } from 'request_api'
import { app_c } from 'globals/styles'
injectStoreRequest(store)

export default function App() {
  // Phuong: https://docs.expo.dev/guides/using-custom-fonts/
  // Phuong: https://fonts.google.com/specimen/Roboto
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('assets/fonts/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('assets/fonts/Roboto-BlackItalic.ttf'),
    'Roboto-Bold': require('assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('assets/fonts/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('assets/fonts/Roboto-Thin.ttf'),
    'Roboto-ThinItalic': require('assets/fonts/Roboto-ThinItalic.ttf')
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {/* Phuong: anh huong den signin va sign up */}
        {/* <SafeAreaView style={{backgroundColor: app_c.HEX.primary}}>
          <StatusBar style="auto" />
        </SafeAreaView> */}

        <StatusBar 
          barStyle='dark-content'
          backgroundColor={app_c.HEX.primary}
        />
        
        <NavigationContainer>
          <AuthNavigator/>
        </NavigationContainer>
        
        {/*Phuong: Hien thong bao cho toan he thong => test thu vao redux manifold => appearNotificationBottomSheet: true */}
        <NotificationBottomSheet />

        {/*Phuong: loading cho toan he thong => test thu vao redux manifold => isLoading: true */}
        <Loading />

      </PersistGate>
    </Provider>
  )
}