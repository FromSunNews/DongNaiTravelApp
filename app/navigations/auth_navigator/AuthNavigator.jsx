// Phuong: screen này có trách nhiệm: điều hướng, xác thực, phân group màn hình
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashScreen from 'screens/splash/SplashScreen'
import OnboardingScreen from 'screens/onboarding/OnboardingScreen'
import GroupBottomTab from 'navigations/group_bottom_tab/GroupBottomTab'
import SigninScreen from 'screens/signin/SigninScreen'
import SignupScreen from 'screens/signup/SignupScreen'
import { useSelector } from 'react-redux'
import { selectCurrentWareHouse } from 'redux/warehouse/WareHouseSlice'
import { selectIsAuthenticated, selectUserRole } from 'redux/user/UserSlice'
import CreatePost from 'screens/create_post/CreatePostScreen'
import ForgotPasswordScreen from 'screens/fogot_password/ForgotPasswordScreen'
import OtpScreen from 'screens/otp/OtpScreen'
import ResetPasswordScreen from 'screens/reset_password/ResetPasswordScreen'
import ProfileScreen from 'screens/profile_screen/ProfileScreen'

const AuthNavigator = () => {
  // Phuong: https://reactnavigation.org/docs/getting-started
  const AppStack = createNativeStackNavigator()
  
  const isFirstTimeLauch = useSelector(selectCurrentWareHouse).isFirstTimeLauch
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const userRole = useSelector(selectUserRole)

  const initialRouteName = 'SplashScreen'

  return (
    <AppStack.Navigator initialRouteName={initialRouteName}>
      {/* Splash thì lúc nào cũng hiển thị cho người dùng */}
      <AppStack.Screen 
        name="SplashScreen" 
        component={SplashScreen} 
        options={{ header: () => null }}
      />

      {/* Phuong: Kiểm tra xem đây có phải là lần đầu tiên người dùng chạy ứng dụng không? */}
      {/* Phuong: Sẽ thay đổi state của thằng isFirstTimeLauch = false khi người dùng bắt đầu vào trang SignIn */}
      {
        isFirstTimeLauch &&
        <AppStack.Screen 
          name="OnboardingScreen" 
          component={OnboardingScreen} 
          options={{ header: () => null }} 
        />
      }
      
      {/* Phuong: user hay guest đều cho hiển thị */}
      <AppStack.Screen 
        name="GroupBottomTab" 
        component={GroupBottomTab} 
        options={{ header: () => null }} 
      />
      {/* Phuong: Đối với signin va signup thì nếu mà người dùng đăng nhập r muốn logout ra thì vẫn phải hiện ra thôi*/}
       <AppStack.Screen 
        name="SigninScreen" 
        component={SigninScreen} 
        options={{ header: () => null }} 
      />
      <AppStack.Screen 
        name="SignupScreen" 
        component={SignupScreen} 
        options={{ header: () => null }} 
      />
      <AppStack.Screen 
        name="ForgotPasswordScreen" 
        component={ForgotPasswordScreen} 
        options={{ header: () => null }} 
      />
      <AppStack.Screen 
        name="OtpScreen" 
        component={OtpScreen} 
        options={{ header: () => null }} 
      />
      <AppStack.Screen 
        name="ResetPasswordScreen" 
        component={ResetPasswordScreen} 
        options={{ header: () => null }} 
      />

      {/* Phuong: chỉ hiện thị trong TH người dùng xác thực và role là user*/}
      {
        (isAuthenticated && userRole === 'user') 
        &&
        <AppStack.Screen 
          name="CreatePost" 
          component={CreatePost} 
          options={{ header: () => null }} 
        />
      }
    </AppStack.Navigator>
  )
}

export default AuthNavigator