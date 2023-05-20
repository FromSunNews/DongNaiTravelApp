import React, { useEffect, useState } from 'react'
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
import { app_c, app_typo } from 'globals/styles'
import { ToastProvider } from 'react-native-toast-notifications'

// Phương: này là dùng cho socket
import { io } from 'socket.io-client'
import { API_ROOT } from 'utilities/constants'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomStatusBar from './app/components/custom_status_bar/CustomStatusBar'
export const socketIoInstance = io(API_ROOT)
import NetInfo from '@react-native-community/netinfo'
import { updateNotif } from './app/redux/manifold/ManifoldSlice'

injectStoreRequest(store)

export default function App() {

  const [isConnected, setIsConnected] = useState(true)
  const [isPrevConnected, setIsPrevConnected] = useState(true)

  const checkInternetConnection = async () => {
    const response = await NetInfo.fetch()
    // console.log("🚀 ~ file: App.jsx:41 ~ checkInternetConnection ~ response:", response)
    setIsPrevConnected(isConnected)
    setIsConnected(response.isConnected)
    setTimeout(checkInternetConnection, 3000) // Kiểm tra lại sau 5 giây
  }

  useEffect(() => {
    checkInternetConnection()
  }, [])

  useEffect(() => {
    if (!isConnected && isPrevConnected) {
      store.dispatch(updateNotif({
        appearNotificationBottomSheet: true,
        contentNotificationBottomSheet: 'Không có kết nối internet'
      }))
    } else if (isConnected && !isPrevConnected) {
      store.dispatch(updateNotif({
        appearNotificationBottomSheet: true,
        contentNotificationBottomSheet: 'Đã kết nối internet'
      }))
    }
  }, [isConnected])

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
    // Phương: https://github.com/arnnis/react-native-toast-notifications
    // Phương: mục dích để hiển thị những thông báo nhanh cho người dùng
    // https://github.com/gorhom/react-native-bottom-sheet/issues/775
    <GestureHandlerRootView style={{flex: 1}}>
      <ToastProvider
        normalColor={app_c.HEX.third}
        offsetBottom={120}
        textStyle={{ ...app_typo.fonts.normal.bolder.h5, color: app_c.HEX.primary }}
      >
        <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            
            <NavigationContainer>
              <AuthNavigator/>
            </NavigationContainer>
            
            {/*Phuong: Hien thong bao cho toan he thong => test thu vao redux manifold => appearNotificationBottomSheet: true */}
            <NotificationBottomSheet />

            {/*Phuong: loading cho toan he thong => test thu vao redux manifold => isLoading: true */}
            <Loading />

          </PersistGate>
        </Provider>
      </ToastProvider>
    </GestureHandlerRootView>
  )
}
