import { StyleSheet } from "react-native"

import { app_c, app_sh, app_sp } from "globals/styles";

const default_style = {
  width: '100%',
  minHeight: 72,
  overflow: 'hidden',
  ...app_sh.rounded_8
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...app_sp.p_12
  },

  lbl_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%'
  },

  btn_inactive: {
    ...default_style,
    backgroundColor: app_c.HEX.ext_primary
  },

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

export default styles