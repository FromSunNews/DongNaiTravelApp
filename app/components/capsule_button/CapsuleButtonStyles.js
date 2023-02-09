import { StyleSheet } from "react-native";

import { app_c, app_sh, app_sp } from "globals/styles";

const default_app_caps_style = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  ...app_sh.capsule,
  ...app_sp.ph_18,
  ...app_sp.pv_8,
};

const styles = StyleSheet.create({
  btn_caps_disable: {
    ...default_app_caps_style,
    backgroundColor: app_c.HEX.ext_primary
  },

  lbl_disable: {
    color: app_c.HEX.ext_third
  },

  btn_caps_active_type_1: {
    ...default_app_caps_style,
    backgroundColor: app_c.HEX.fourth
  },

  lbl_active_type_1: {
    color: app_c.HEX.primary
  },

  btn_caps_active_type_2: {
    ...default_app_caps_style,
    backgroundColor: app_c.HEX.third
  },

  lbl_active_type_2: {
    color: app_c.HEX.primary
  },

  btn_caps_default_type_1: {
    ...default_app_caps_style,
    backgroundColor: app_c.HEX.ext_primary
  },

  lbl_default_type_1: {
    color: app_c.HEX.fourth
  },

  btn_caps_default_type_2: {
    ...default_app_caps_style,
    backgroundColor: app_c.HEX.sub_primary
  },

  lbl_default_type_2: {
    color: app_c.HEX.fourth
  },

  btn_caps_default_type_3: {
    ...default_app_caps_style,
    backgroundColor: app_c.HEX.second
  },

  lbl_default_type_3: {
    color: app_c.HEX.fourth
  },
});

export default styles;