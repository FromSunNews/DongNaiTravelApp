import { StyleSheet } from "react-native";

import { app_c, app_sp } from "globals/styles";

const default_app_btn_cir = {
  minWidth: 30,
  minHeight: 30,
  borderRadius: '100%',
  ...app_sp.p_2,
  ...app_sp.me_1,
};

const style = StyleSheet.create({
  btn_inactive_bg_c_second: {
    ...default_app_btn_cir,
    
    backgroundColor: app_c.HEX.second
  },
  lbl_inactive_c_fourth: {
    color: app_c.HEX.fourth
  }
});

export default style