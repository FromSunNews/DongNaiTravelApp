import React from "react";
import { StyleSheet } from "react-native";
import { app_sp, app_dms, app_c } from "globals/styles";
const styles = StyleSheet.create({
  container:{
    height: app_dms.screenHeight,
    backgroundColor: app_c.HEX.primary
  },
  header_title:{
    paddingTop:22,
    marginHorizontal:16,
  }

})
export default styles