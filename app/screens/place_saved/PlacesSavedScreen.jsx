import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './PlacesSavedScreenStyles'
import { AppText, HorizontalPlaceCard ,HorizontalPlaceCardSkeleton} from '../../components'
import { app_typo,app_sp } from '../../globals/styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentWareHouse } from '../../redux/warehouse/WareHouseSlice'

const PlaceSavedScreen = () => {

  const placesSaved = useSelector(selectCurrentWareHouse).placesSaved
  const [currentPlaces, setCurrentPlaces] = React.useState([]);
  const [currentPlacesSaved, setCurrentPlacesSaved] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      setCurrentPlaces([...places]);
      setCurrentPlacesSaved([...placesSaved])
    }, 1000);
  }, [placesSaved]);

  //tìm ra cái đã saved ở api
  const commonElements = currentPlaces.filter(e => currentPlacesSaved.includes(e.id) )
  console.log('tìm được rổi :        ',commonElements)

  return (
    <ScrollView style={styles.container}
    
    showsVerticalScrollIndicator={false}
    >
      <View style={styles.header_title}>
        <AppText style={{...app_typo.fonts.normal.bolder.h2}}>Địa điểm đã lưu</AppText>
      </View>
      <View style={{...app_sp.mh_18, ...app_sp.mb_12, ...app_sp.pt_8}}>
        {
          currentPlaces.length === 0
          ? [1, 2, 3].map((value, index) => <HorizontalPlaceCardSkeleton key={value + index} />)
          : commonElements.map((place, index) => (<HorizontalPlaceCard place={place} key={place.id} />))
        }
      </View>
      <View style={{height:100}}></View>
    </ScrollView>
  )
}

export default PlaceSavedScreen


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
