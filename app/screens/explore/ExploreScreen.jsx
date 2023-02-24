import { View, SafeAreaView, ScrollView, Text } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { TagScrollView, HorizontalPlaceCard, HorizontalPlaceCardSkeleton, BannerButton } from 'components'

import styles from './ExploreScreenStyles'
import { app_sp, app_c } from 'globals/styles'

const ExploreScreen = () => {
  const [currentPlaces, setCurrentPlaces] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      setCurrentPlaces([...places]);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.scroll_view_container}
      stickyHeaderIndices={[1]}
    >
      <View style={{...app_sp.mh_18}}>
        <BannerButton
          typeOfButton="highlight"
          style={app_sp.mt_12}
          toScreen={{screenName: "MapScreen"}}
          setRightIcon={(isActive, currentLabelStyle) =>
            <Ionicons name="chevron-forward-outline" style={currentLabelStyle} size={25} />
          }
        >
          Let’s see your location in map
        </BannerButton>
      </View>
      <View style={{backgroundColor: app_c.HEX.primary, ...app_sp.mv_10}}>
        <TagScrollView 
          concept="places"
          style={{...app_sp.ms_18, ...app_sp.pv_12}}
        />
      </View>

      <View style={{...app_sp.mh_18, ...app_sp.mb_12}}>
        {
          currentPlaces.length === 0
          ? [1, 2, 3].map((value, index) => <HorizontalPlaceCardSkeleton key={value + index} />)
          : currentPlaces.map((place, index) => <HorizontalPlaceCard place={place} key={place.id} />)
        }
      </View>

      <View style={{height: 100}}></View>
    </ScrollView>
  )
}

export default ExploreScreen

const places = [
  {
    id: '1a',
    name: 'Pho di bo',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPoYDJXCAlOR3Oc0RgjhQ5WBZt9s2VkvqpbbuNN=s680-w680-h510',
    location: {
      province: 'Dong Nai',
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
    ratingPoints: 4.3,
    numberOfReviews: 300,
    numberOfVisited: 3200,
    isRecommended: false,
    isVisited: false
  },
  {
    id: '1b',
    name: 'Quang truong tinh',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPUoQ-BfuMVqLUZog0RrNnF4HVrFLXlXLQ4wak2=s680-w680-h510',
    location: {
      province: 'Dong Nai',
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
    ratingPoints: 4.6,
    numberOfReviews: 5687,
    numberOfVisited: 32242,
    isRecommended: true,
    isVisited: true
  },
  {
    id: '1c',
    name: 'Cong vien Tam Hiep',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipOFHqO2nUTvyj0fYEvwt-9AHoQS8e5yajbKLjQE=s680-w680-h510',
    location: {
      province: 'Dong Nai',
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
    ratingPoints: 3.7,
    numberOfReviews: 1687,
    numberOfVisited: 2242,
    isRecommended: false,
    isVisited: false
  },
  {
    id: '1d',
    name: 'Pho di bo',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPoYDJXCAlOR3Oc0RgjhQ5WBZt9s2VkvqpbbuNN=s680-w680-h510',
    location: {
      province: 'Dong Nai',
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
    ratingPoints: 4.3,
    numberOfReviews: 300,
    numberOfVisited: 3200,
    isRecommended: false,
    isVisited: false
  },
  {
    id: '1e',
    name: 'Quang truong tinh',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipPUoQ-BfuMVqLUZog0RrNnF4HVrFLXlXLQ4wak2=s680-w680-h510',
    location: {
      province: 'Dong Nai',
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
    ratingPoints: 4.6,
    numberOfReviews: 5687,
    numberOfVisited: 32242,
    isRecommended: true,
    isVisited: true
  },
  {
    id: '1f',
    name: 'Cong vien Tam Hiep',
    avatar: 'https://lh3.googleusercontent.com/p/AF1QipOFHqO2nUTvyj0fYEvwt-9AHoQS8e5yajbKLjQE=s680-w680-h510',
    location: {
      province: 'Dong Nai',
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
    ratingPoints: 3.7,
    numberOfReviews: 1687,
    numberOfVisited: 2242,
    isRecommended: false,
    isVisited: false
  }
]