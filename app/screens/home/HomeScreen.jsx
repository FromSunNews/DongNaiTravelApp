import { View, Text, Button, Image } from 'react-native'
import React, { useEffect } from 'react'

import { styles } from './HomeScreenStyles'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, signOutUserAPI } from 'redux/user/UserSlice'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigation = useNavigation() 
  return (
    <View style={styles.container}>
      <Button
        title='Logout' 
        onPress={() => {
          dispatch(signOutUserAPI()).then(
            navigation.replace('SigninScreen')
          )
        }}
      />
    </View>
  )
}

export default HomeScreen