import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { selectCurrentLanguage } from '../../redux/language/LanguageSlice';

import BlogsScreen from 'screens/blogs/BlogsScreen';
import BlogDetailScreen from 'screens/blog_detail/BlogDetailScreen';
import BlogEditorScreen from 'screens/blog_editor/BlogEditorScreen';
import {
  AppText,
  AppHeader,
  RectangleButton
} from 'components';

const BlogsStack = createNativeStackNavigator();

const BlogsNavigator = ({ navigation }) => {
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
          header: props => (
            <AppHeader
              {...props}
              setRightPart={() => (
                <RectangleButton
                  overrideShape='capsule'
                  typeOfButton='highlight'
                  onPress={() => {navigation.navigate("BlogEditorNavigator", {screen: 'BlogEditorScreen'})}}
                >
                  <AppText>{langCode === 'vi' ? 'Tạo bài viết' : 'Create blog'}</AppText>
                </RectangleButton>
              )}
            />
          ),
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