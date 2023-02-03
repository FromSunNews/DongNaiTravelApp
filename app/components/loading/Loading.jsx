import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'


import { styles } from './LoadingStyles'
import { useSelector } from 'react-redux'
import { selectCurrentManifold } from 'redux/manifold/ManifoldSlice'

const Loading = () => {
  const isLoading = useSelector(selectCurrentManifold).isLoading

  if (isLoading)
  return (
    <>
      <View style={styles.blur}></View>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={true}
          style={styles.lottie}
          source={require('assets/animations/loading3.json')}
        />
      </View>
    </>
  )
}

export default Loading