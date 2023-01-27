import { StyleSheet } from "react-native"

import { app_c, app_shdw, app_sp } from "globals/styles";

const style = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: app_c.HEX.primary,
    ...app_sp.p_2,
    ...app_sp.mb_3,
    ...app_shdw.type_1
  }
});

export default style