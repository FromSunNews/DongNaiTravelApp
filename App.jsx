import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { store, persistor } from 'redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { useFonts } from 'expo-font';

import NotificationBottomSheet from 'components/notification_bottom_sheet/NotificationBottomSheet'
import { app_c, app_typo } from 'globals/styles'
import Signin from 'screens/signin/Signin'

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
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Signin />
          {/* <NotificationBottomSheet /> */}
        </View>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: app_c.HEX.primary,
  },
})
