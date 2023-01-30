import { StyleSheet } from "react-native";

import { app_c, app_sp } from "globals/styles";

const default_app_caps_style = {
  ...app_sp.ph_6,
  ...app_sp.pv_2,
  ...app_sp.me_4,
  justifyContent: 'center',
  alignSelf: 'flex-start',
  borderRadius: 9999
};

const style = StyleSheet.create({
  
  btn_inActive: {
    ...default_app_caps_style,
    backgroundColor: app_c.HEX.ext_primary
  },
  btn_active: {
    ...default_app_caps_style,
    backgroundColor: app_c.HEX.fourth
  },
  lbl_inactive: {
    color: app_c.HEX.fourth
  },
  lbl_active: {
    color: app_c.HEX.primary
  }
});

export default style;