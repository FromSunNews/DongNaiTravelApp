import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StarRatingStyles } from './StarRatingStyles'

const StarRating = ({ ratings, reviews }) => {
  // This array will contain our star tags. We will include this
  // array between the view tag.
  const stars = []
  // Loop 5 times
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    // set the path to filled stars
    let name = 'ios-star'
    // If ratings is lower, set the path to unfilled stars
    if (i > ratings) {
      name = 'ios-star-outline'
    }

    stars.push((<Ionicons name={name} size={15} style={StarRatingStyles.star} key={i} />))
  }

  return (
    <View style={StarRatingStyles.container}>
      {stars}
      <Text style={StarRatingStyles.text}>({reviews})</Text>
    </View>
  )
}

export default StarRating