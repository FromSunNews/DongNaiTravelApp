import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BlogsScreen from 'screens/blogs/BlogsScreen';
import BlogDetailScreen from 'screens/blog_detail/BlogDetailScreen';
import MyHeader from 'components/my_header/MyHeader';

const BlogsStack = createNativeStackNavigator();

const BlogsNavigator = () => {
  return (
    <BlogsStack.Navigator
      initialRouteName="BlogScreen"
      screenOptions={{
        header: props => (<MyHeader {...props} />)
    }}>
      <BlogsStack.Screen
        name="BlogScreen"
        options={{
          title: 'Blogs',
          isTopScreen: true
        }}
      >
        {() => <BlogsScreen />}
      </BlogsStack.Screen>
      <BlogsStack.Screen
        name="BlogDetailStackScreen"
        options={{
          title: 'Blog Detail'
        }}
      >
        {() => <BlogDetailScreen />}
      </BlogsStack.Screen>
    </BlogsStack.Navigator>
  )
}

export default BlogsNavigator