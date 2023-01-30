import { StyleSheet } from "react-native"

import { app_c, app_sp } from "globals/styles";

const style = StyleSheet.create({
  in_active: {
    backgroundColor: app_c.HEX.ext_primary,
    borderRadius: 8,
    width: '100%',
    height: 72,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    ...app_sp.p_4
  },
  lbl_container: {
    flex: 1,
    justifyContent: 'center',
    width: '45%'
  }
});

export default style