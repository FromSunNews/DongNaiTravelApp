import React from 'react'
import { View, SafeAreaView, ScrollView } from 'react-native'

import { ScrollTagButtonView, HorizontalPlaceCard } from 'components'

import { app_sp } from 'globals/styles'
import style from './ExporeScreenStyle'

const ExploreScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView style={style.container}>
        <ScrollTagButtonView horizontal={true} concept="place" />
        <View style={{...app_sp.mt_5}}>
          <HorizontalPlaceCard />
          <HorizontalPlaceCard />
          <HorizontalPlaceCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ExploreScreen