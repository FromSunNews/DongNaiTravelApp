import { View } from "react-native";
import React from "react";
import styles from "components/header/HeaderStyles";
import { Header } from "components";



function DiaryActiveScreen() {
  return (
  <View style={styles.container}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  </View> );
}
export default DiaryActiveScreen;
