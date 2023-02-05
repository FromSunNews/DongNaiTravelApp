import { View, Text } from 'react-native'
import React from 'react'

import { styles } from './HomeScreenStyles'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'redux/user/UserSlice'

const HomeScreen = () => {
  // const user = useSelector(selectCurrentUser)
  return (
    <View style={styles.container}>
      {/* <Text>{user.username}</Text> */}
    </View>
  )
}

export default HomeScreen