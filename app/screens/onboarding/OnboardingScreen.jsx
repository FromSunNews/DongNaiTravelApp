import React, { useState } from "react"
import {
    View, Text, StyleSheet, Button, Image
} from 'react-native'
import AppIntroSlider from "react-native-app-intro-slider"

import Onboarding1 from 'assets/images/aboarding1.png'
import Onboarding2 from 'assets/images/aboarding2.png'
import Onboarding3 from 'assets/images/aboarding3.png'
import Onboarding4 from 'assets/images/aboarding4.png'

import { StackActions } from '@react-navigation/native'

import { styles } from './OnboardingScreenStyles'

const slides = [
  {
      key: 's1',
      text: 'You can sefile and post your pictures anywhere at any time',
      title: 'Sefile and Post',
      source: Onboarding1,
      backgroundColor: '#52DD79',
  },
  {
      key: 's2',
      title: 'Sharing Happiness',
      text: 'Sharing happiness by sharing your memories in social media platform',
      source: Onboarding2,
      backgroundColor: '#51AEFF',
  },
  {
      key: 's3',
      title: 'Video call',
      text: 'Connect with your friends through video call',
      source: Onboarding3,
      backgroundColor: '#22bcb5',
  },
  {
      key: 's4',
      title: 'Conecting people',
      text: 'Make new friends around the world',
      source: Onboarding4,
      backgroundColor: '#BA68C8',
  }
]

const OnboardingScreen = (props) => {

  const renderItem = ({ item }) => {
      return (
          <View style={{
              flex: 1,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 100
          }}>
              <Text style={styles.introTitleStyle}>
                  {item.title}
              </Text>
              <Image
                  style={styles.introImageStyle}
                  source={item.source}
              ></Image>
              <Text style={styles.introTextStyle}>{item.text}</Text>
          </View>
      )
  }
  return (
      <AppIntroSlider
          data={slides}
          renderItem={renderItem}
          onDone={() => {
              props.navigation.dispatch(
                  StackActions.replace('SigninScreen')
              )
          }}
          onSkip={() => {
              props.navigation.dispatch(
                  StackActions.replace('SigninScreen')
              )
          }}
          showSkipButton={true}
      ></AppIntroSlider>
  )
}

export default OnboardingScreen