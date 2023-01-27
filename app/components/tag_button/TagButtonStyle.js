import { StyleSheet } from "react-native";

import { app_c, app_sp } from "globals/styles";

const btn_default_style = {
  ...app_sp.ph_2,
  ...app_sp.pv_1,
  ...app_sp.me_2,
  alignSelf: 'flex-start',
  borderRadius: 9999
};

const style = StyleSheet.create({
  
  btn_inActive: {
    ...btn_default_style,
    backgroundColor: app_c.HEX.ext_primary
    
  },
  btn_active: {
    ...btn_default_style,
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