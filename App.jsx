import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { store, persistor } from 'redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text>Hello</Text>
        </View>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
