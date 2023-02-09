import { StyleSheet } from "react-native";

import { app_c, app_sh, app_sp } from "globals/styles";

// COLOR MIX FOR ALL TYPES OF BUTTON
// Xem thêm tại issue: 
// 

const default_app_cir_style = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 30,
  minHeight: 30,
  aspectRatio: 1,
  ...app_sh.circle,
  ...app_sp.p_10
};

const styles = StyleSheet.create({
  btn_cir_disable: {
    ...default_app_cir_style,
    backgroundColor: app_c.HEX.ext_primary
  },

  lbl_disable: {
    color: app_c.HEX.ext_third
  },

  btn_cir_active_type_1: {
    ...default_app_cir_style,
    backgroundColor: app_c.HEX.fourth
  },

  lbl_active_type_1: {
    color: app_c.HEX.primary
  },

  btn_cir_active_type_2: {
    ...default_app_cir_style,
    backgroundColor: app_c.HEX.third
  },

  lbl_active_type_2: {
    color: app_c.HEX.primary
  },

  btn_cir_default_type_1: {
    ...default_app_cir_style,
    backgroundColor: app_c.HEX.ext_primary,
  },

  lbl_default_type_1: {
    color: app_c.HEX.fourth
  },

  btn_cir_default_type_2: {
    ...default_app_cir_style,
    backgroundColor: app_c.HEX.sub_primary
  },

  lbl_default_type_2: {
    color: app_c.HEX.fourth
  },

  btn_cir_default_type_3: {
    ...default_app_cir_style,
    backgroundColor: app_c.HEX.second
  },

  lbl_default_type_3: {
    color: app_c.HEX.fourth
  },
});

export default styles;