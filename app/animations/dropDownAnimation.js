import { LayoutAnimation } from "react-native";

export const dropDownAnimation = {
  duration: 500,
  update: {
    duration: 500,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  update: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
}