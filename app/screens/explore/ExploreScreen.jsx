import { View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { ScrollTagButtonView, HorizontalPlaceCard, BannerButton } from 'components'

import { app_sp } from 'globals/styles'
import style from './ExporeScreenStyle'

const ExploreScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView style={style.container}>
        <BannerButton>Let’s see your location in map</BannerButton>
        <ScrollTagButtonView horizontal={true} concept="place" />
        <View>
          <HorizontalPlaceCard />
          <HorizontalPlaceCard />
          <HorizontalPlaceCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ExploreScreen