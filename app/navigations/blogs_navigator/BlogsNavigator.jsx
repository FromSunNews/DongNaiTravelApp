import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BlogsScreen from 'screens/blogs/BlogsScreen';
import BlogDetailScreen from 'screens/blog_detail/BlogDetailScreen';
import { AppHeader } from 'components';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../../redux/language/LanguageSlice';

const BlogsStack = createNativeStackNavigator();

const BlogsNavigator = () => {
  const langCode = useSelector(selectCurrentLanguage).languageCode
  return (
    <BlogsStack.Navigator
      initialRouteName="BlogScreen"
      screenOptions={{
        header: AppHeader
    }}>
      <BlogsStack.Screen
        name="BlogScreen"
        options={{
          title: `${langCode === 'vi' ? 'Bài Viết' : 'Blogs'}`
        }}
        component={BlogsScreen}
      >
      </BlogsStack.Screen>
      <BlogsStack.Screen
        name="BlogDetailScreen"
        options={{
          title: `${langCode === 'vi' ? 'Chi Tiết Bài Viết' : 'Blog Detail'}`
        }}
        component={BlogDetailScreen}
      />
    </BlogsStack.Navigator>
  )
}

export default BlogsNavigator