import { View, Text } from 'react-native'
import React from 'react'

import { styles } from './CreatePostStyles'
import useTheme from 'customHooks/useTheme'

const CreatePost = () => {
  const themeColor = useTheme();
  return (
    <View style={[styles.container,{backgroundColor: themeColor.primary}]}>
      <Text style = {{color: themeColor.fourth}}>CreatePost</Text>
    </View>
  )
}

export default CreatePost