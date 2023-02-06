import { View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { ScrollTagButtonView, HorizontalPlaceCard, BannerButton } from 'components'

import style from './ExploreScreenStyles'
import { app_sp, app_c } from 'globals/styles'

const ExploreScreen = () => {
  return (
    <View>
      <ScrollView style={style.scroll_view_container}>
        <View style={{...app_sp.mh_4}}>
          <BannerButton>Let’s see your location in map</BannerButton>
        </View>
        <ScrollTagButtonView horizontal={true} concept="place" style={app_sp.ms_4} />
        <View style={{...app_sp.mh_4, ...app_sp.mb_4}}>
          {places.map(place => <HorizontalPlaceCard place={place} key={place.id} />)}
        </View>
      <View style={{height: 120}}></View>
      </ScrollView>
    </View>
  )
}

export default ExploreScreen

const places = [
  {
    id: '12sdc-sdsrt',
    name: 'Pho di bo',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPoYDJXCAlOR3Oc0RgjhQ5WBZt9s2VkvqpbbuNN=s680-w680-h510',
    location: {
      name: 'Dong Nai',
      city: 'Bien Hoa'
    },
    tags: [
      {
        title: 'Walking'
      },
      {
        title: 'Exercise'
      }
    ],
    numberOfRatings: 4.3,
    numberOfReviews: 300,
    numberOfVisited: 3200,
    isRecommended: false,
    isVisited: false
  },
  {
    id: '0s9md-lo9ai',
    name: 'Quang truonng tinh',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPUoQ-BfuMVqLUZog0RrNnF4HVrFLXlXLQ4wak2=s680-w680-h510',
    location: {
      name: 'Dong Nai',
      city: 'Bien Hoa'
    },
    tags: [
      {
        title: 'Walking'
      },
      {
        title: 'Exercise'
      }
    ],
    numberOfRatings: 4.6,
    numberOfReviews: 5687,
    numberOfVisited: 32242,
    isRecommended: true,
    isVisited: true
  },
  {
    id: '2lkoq-lkcai',
    name: 'Cong vien Tam Hiep',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipOFHqO2nUTvyj0fYEvwt-9AHoQS8e5yajbKLjQE=s680-w680-h510',
    location: {
      name: 'Dong Nai',
      city: 'Bien Hoa'
    },
    tags: [
      {
        title: 'Walking'
      },
      {
        title: 'Exercise'
      }
    ],
    numberOfRatings: 3.7,
    numberOfReviews: 1687,
    numberOfVisited: 2242,
    isRecommended: false,
    isVisited: false
  }
]