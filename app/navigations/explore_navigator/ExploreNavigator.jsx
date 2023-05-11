import { View, Text, Animated } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import ExploreScreen from 'screens/explore/ExploreScreen';
import PlaceDetailScreen from 'screens/place_detail/PlaceDetailScreen';
import { AppHeader } from 'components';

import { app_c } from 'globals/styles';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from 'redux/language/LanguageSlice';

const ExploreStack = createNativeStackNavigator();

const ExploreNavigator = () => {

  const langCode = useSelector(selectCurrentLanguage).languageCode 

  return (
    <ExploreStack.Navigator
      initialRouteName='ExploreScreen'
      screenOptions={{
        header: AppHeader,
    }}>
      <ExploreStack.Screen
        name='ExploreScreen'
        options={{
          title: `${langCode === 'vi' ? 'Khám Phá' : 'Explore'}`
        }}
        component={ExploreScreen}
      />
      <ExploreStack.Screen
        name='PlaceDetailScreen'
        options={{
          title: `${langCode === 'vi' ? 'Chi tiết Địa Điểm' : 'Place Detail'}`,
          headerTransparent: true,
        }}
        component={PlaceDetailScreen}
      />
    </ExploreStack.Navigator>
  )
}

export default ExploreNavigator