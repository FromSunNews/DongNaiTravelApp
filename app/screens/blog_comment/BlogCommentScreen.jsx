import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { useAuthState } from 'customHooks/useAuth'

import UnAuthenticationScreen from 'screens/unauthentication/UnAuthenticationScreen'

const BlogCommentScreen = ({route}) => {
  const { isAuthenticated } = useAuthState();
  const navigation = useNavigation();
  console.log('Params: ', route.params);
  if(!isAuthenticated) return () => <UnAuthenticationScreen navigation={navigation} />

  return (
    <View>
      <Text>BlogCommentScreen</Text>
    </View>
  )
}

export default BlogCommentScreen