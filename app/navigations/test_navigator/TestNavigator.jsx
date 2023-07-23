import { View, ScrollView } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { withTheme } from 'hocs/withTheme'
import {
  AppText,
  AppHeader,
  RectangleButton,
  CircleButton,
  HorizontalBlogCardSkeleton,
  HorizontalPlaceCardSkeleton,
  VerticalBlogCardSkeleton,
  VerticalPlaceCardSkeleton
} from 'components'

const TestStack = createNativeStackNavigator()

const TestScreen = withTheme(({
  route,
  navigation,
  theme,
  toggleTheme
}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{width: '100%'}}>
        <AppText>Đây là text gốc</AppText>
        <AppText color='primary'>Đây là một màu khác nữa.</AppText>
        <AppText color='secondary'>Đây là màu của đường dẫn</AppText>
      </View>
      <RectangleButton
        defaultColor='type_2'
        overrideShape='rounded_8'
        typeOfButton='highlight'
      >Type 2</RectangleButton>
      <RectangleButton
        defaultColor='type_3'
        overrideShape='rounded_8'
        typeOfButton='highlight'
      >Type 3</RectangleButton>
      <RectangleButton
        overrideShape='rounded_8'
        typeOfButton='highlight'
        onPress={toggleTheme}
      >
        <Ionicons name='heart' /> Change theme
      </RectangleButton>
      <CircleButton
        border={1}
        defaultColor='type_4'
        activeColor='type_1'
        setIcon={<Ionicons name='heart' />}
      />
    </ScrollView>
  )
})

const TestNavigator = () => {
  return (
    <TestStack.Navigator
      initialRouteName='TestScreen'
    >
      <TestStack.Screen
        name='TestScreen'
        component={TestScreen}
        options={{
          header: AppHeader
        }}
      />
    </TestStack.Navigator>
  )
}

export default TestNavigator