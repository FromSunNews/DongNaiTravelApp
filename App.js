import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Map from 'screens/map/Map'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Map />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
