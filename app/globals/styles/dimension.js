import { Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width
// Phuong: https://github.com/Sunhat/react-native-extra-dimensions-android
// Phuong: There is currently a bug in React Native where Dimensions.get('window').height sometimes returns the wrong value.
const screenHeight = 
    Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT")
const app_dms = {
  screenHeight,
  screenWidth
}

export default app_dms;