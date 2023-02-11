import { StyleSheet } from "react-native";

import { app_c, app_sh, app_sp } from "globals/styles";

const default_style = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  ...app_sh.capsule,
  ...app_sp.ph_18,
  ...app_sp.pv_8,
  
};

const styles = StyleSheet.create({
  btn_disable: {
    ...default_style,
    backgroundColor: app_c.HEX.ext_primary,
  },

  lbl_disable: {
    color: app_c.HEX.ext_third
  },

  btn_transparent: {
    ...default_style
  },

  btn_active_type_1: {
    ...default_style,
    backgroundColor: app_c.HEX.fourth
  },

  lbl_active_type_1: {
    color: app_c.HEX.primary
  },

  btn_active_type_2: {
    ...default_style,
    backgroundColor: app_c.HEX.third
  },

  lbl_active_type_2: {
    color: app_c.HEX.primary
  },

  btn_default_type_1: {
    ...default_style,
    backgroundColor: app_c.HEX.ext_primary
  },

  lbl_default_type_1: {
    color: app_c.HEX.fourth
  },

  btn_default_type_2: {
    ...default_style,
    backgroundColor: app_c.HEX.sub_primary
  },

  lbl_default_type_2: {
    color: app_c.HEX.fourth
  },

  btn_default_type_3: {
    ...default_style,
    backgroundColor: app_c.HEX.second
  },

  lbl_default_type_3: {
    color: app_c.HEX.fourth
  },
});

export default styles;