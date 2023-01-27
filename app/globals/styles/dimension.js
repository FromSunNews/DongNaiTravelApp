import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const app_dms = {
  screenHeight,
  screenWidth
}

export default app_dms;