import { Dimensions, Platform } from "react-native";
import Constants from 'expo-constants'

const screenWidth = Dimensions.get("window").width
// Phuong: https://github.com/Sunhat/react-native-extra-dimensions-android
// Phuong: There is currently a bug in React Native where Dimensions.get('window').height sometimes returns the wrong value.
const screenHeight = Dimensions.get("window").height

const statusBarHeight = Constants.statusBarHeight

const app_dms = {
  screenHeight,
  screenWidth,
  statusBarHeight
}

export default app_dms;