import { View, Text, Animated } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import ExploreScreen from 'screens/explore/ExploreScreen';
import PlaceDetailScreen from 'screens/place_detail/PlaceDetailScreen';
import { AppHeader } from 'components';

import { app_c } from 'globals/styles';

const ExploreStack = createNativeStackNavigator();

const ExploreNavigator = () => {

  return (
    <ExploreStack.Navigator
      initialRouteName='ExploreScreen'
      screenOptions={{
        header: props => (<AppHeader {...props} />),
    }}>
      <ExploreStack.Screen
        name='ExploreScreen'
        options={{
          title: 'Explore',
          isTopScreen: true
        }}
      >
        {() => (<ExploreScreen />)}
      </ExploreStack.Screen>
      <ExploreStack.Screen
        name='PlaceDetailScreen'
        options={{
          title: 'Place Detail',
          headerTransparent: true,
        }}
      >
        {() => (
          <PlaceDetailScreen />
        )}
      </ExploreStack.Screen>
    </ExploreStack.Navigator>
  )
}

export default ExploreNavigator