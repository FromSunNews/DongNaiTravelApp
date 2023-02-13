import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import ExploreScreen from 'screens/explore/ExploreScreen';
import PlaceDetailScreen from 'screens/place_detail/PlaceDetailScreen';

const ExploreStack = createNativeStackNavigator();

const ExploreNavigator = () => {
  return (
    <ExploreStack.Navigator initialRouteName='ExploreScreen'>
      <ExploreStack.Screen
        name='ExploreScreen'
      >
        {() => (<ExploreScreen />)}
      </ExploreStack.Screen>
      <ExploreStack.Screen
        name='PlaceDetailStackScreen'
      >
        {() => (<PlaceDetailScreen />)}
      </ExploreStack.Screen>
    </ExploreStack.Navigator>
  )
}

export default ExploreNavigator