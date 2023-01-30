import { View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { ScrollTagButtonView, HorizontalPlaceCard, BannerButton } from 'components'

import style from './ExporeScreenStyle'
import { app_sp } from 'globals/styles'

const ExploreScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView style={style.container}>
        <View style={{...app_sp.mh_4}}>
          <BannerButton>Let’s see your location in map</BannerButton>
        </View>
        <ScrollTagButtonView horizontal={true} concept="place" style={app_sp.ms_4} />
        <View style={{...app_sp.mh_4, ...app_sp.mb_4}}>
          <HorizontalPlaceCard />
          <HorizontalPlaceCard />
          <HorizontalPlaceCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ExploreScreen