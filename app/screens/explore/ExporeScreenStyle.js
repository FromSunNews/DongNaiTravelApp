import { StyleSheet } from "react-native";

import { app_sp, app_dms } from "globals/styles";

const style = StyleSheet.create({
  container: {
    width: app_dms.screenWidth,
    height: app_dms.screenHeight,
    ...app_sp.p_4
  }
});

export default style;