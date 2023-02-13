import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BlogsScreen from 'screens/blogs/BlogsScreen';
import BlogDetailScreen from 'screens/blog_detail/BlogDetailScreen';

const BlogsStack = createNativeStackNavigator();

const BlogsNavigator = () => {
  return (
    <BlogsStack.Navigator initialRouteName="BlogScreen">
      <BlogsStack.Screen
        name="BlogScreen"
      >
        {() => <BlogsScreen />}
      </BlogsStack.Screen>
      <BlogsStack.Screen
        name="BlogDetailStackScreen"
      >
        {() => <BlogDetailScreen />}
      </BlogsStack.Screen>
    </BlogsStack.Navigator>
  )
}

export default BlogsNavigator