import { StyleSheet } from "react-native"

import { app_c, app_sh, app_sp } from "globals/styles";

const styles = StyleSheet.create({
  btn_inactive: {
    backgroundColor: app_c.HEX.ext_primary
  },

  btn_disable: {
    backgroundColor: app_c.HEX.ext_primary,
  },

  lbl_disable: {
    color: app_c.HEX.ext_third
  },

  btn_active_type_1: {
    backgroundColor: app_c.HEX.fourth
  },

  btn_active_type_1_dark: {
    backgroundColor: app_c.HEX_DARK.fourth,
  },

  lbl_active_type_1: {
    color: app_c.HEX.primary
  },
  
  lbl_active_type_1_dark: {
    color: app_c.HEX.fourth
  },

  btn_active_type_2: {
    backgroundColor: app_c.HEX.third
  },

  lbl_active_type_2: {
    color: app_c.HEX.primary
  },

  btn_default_type_1: {
    backgroundColor: app_c.HEX.bg_second
  },
  btn_default_type_1_dark: {
    backgroundColor: app_c.HEX_DARK.bg_second
  },
  btn_default_type_1_dark: {
    backgroundColor: app_c.HEX_DARK.bg_tertiary
  },

  lbl_default_type_1: {
    color: app_c.HEX.fourth
  },

  btn_default_type_2: {
    backgroundColor: app_c.HEX.primary
  },

  btn_default_type_2_dark: {
    backgroundColor: app_c.HEX_DARK.primary
  },

  lbl_default_type_2: {
    color: app_c.HEX.fourth
  },

  btn_default_type_3: {
    backgroundColor: app_c.HEX.bg_tertiary
  },
  btn_default_type_3_dark: {
    backgroundColor: app_c.HEX_DARK.bg_tertiary
  },

  lbl_default_type_3: {
    color: app_c.HEX.fourth
  },

  btn_default_type_4: {
    backgroundColor: app_c.HEX.fourth
  },

  lbl_default_type_4: {
    color: app_c.HEX.primary
  },

  btn_default_type_5: {
    backgroundColor: app_c.HEX.third
  },

  lbl_default_type_5: {
    color: app_c.HEX.primary
  },
  ///btn card-blog
  btn_default_heart: {
    backgroundColor: app_c.HEX.second
  },
  btn_default_heart_dark: {
    backgroundColor: app_c.HEX_DARK.ext_second
  },
  lbl_default_heart: {
    color: app_c.HEX.fourth
  },
  lbl_default_heart_dark: {
    color: app_c.HEX_DARK.third
  },
});

export default styles