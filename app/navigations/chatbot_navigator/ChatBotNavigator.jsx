import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  useAuthState
} from 'customHooks/useAuth'

import {
  AppHeader,
  AppText
} from 'components'

import {
  USER_ROLES
} from 'utilities/constants'
import ChatBotScreen from 'screens/chat_bot/ChatBotScreen'
import PlaceDetailScreen from 'screens/place_detail/PlaceDetailScreen'

const ChatBotStack = createNativeStackNavigator();

/**
 * Đây là `ChatBotNavigator`. Bởi vì nó là tính năng đặc biệt, nằm ngoài `GroupBottomTab` cho nên nó sẽ có
 * Navigator riêng. Hiện tại thì trong Navigator này có `ChatBotScreen`
 * @returns 
 */
const ChatBotNavigator = ({navigation}) => {
  const {
    isAuthenticated,
    userRole
  } = useAuthState();

  React.useEffect(() => {
    return function() {
      console.log("ChatBotNavigator is unmounted.");
    }
  }, []);

  return (
    <ChatBotStack.Navigator
      screenOptions={{ header: AppHeader }}
    >
      <>
        <ChatBotStack.Screen
          name="ChatBotScreen"
          options={{
            title: 'TravelBot'
          }}
          component={ChatBotScreen}
        />

        <ChatBotStack.Screen
          name='PlaceDetailScreen'
          options={{
            title: 'Chi Tiết Địa Điểm',
            headerTransparent: true
          }}
          component={PlaceDetailScreen}
        />
      </>
    </ChatBotStack.Navigator>
  )
}

export default ChatBotNavigator