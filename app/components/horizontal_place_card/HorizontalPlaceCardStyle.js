import { StyleSheet } from "react-native"

import { app_c, app_sh, app_shdw, app_sp } from "globals/styles";

const card_text_default_color = {
  color: app_c.HEX.ext_second
};

const style = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: app_c.HEX.primary,
    ...app_sp.p_3,
    ...app_sp.mb_4,
    ...app_shdw.type_1
  },

  card_image_container: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: 145,
    height: 145,
    backgroundColor: app_c.HEX.ext_primary,
    overflow: 'hidden',
    borderRadius: 4,
    ...app_sp.p_3,
    ...app_sp.me_4
  },

  card_recommended_mark_container: {
    justifyContent: 'center',
    backgroundColor: app_c.HEX.primary,
    ...app_sh.capsule,
    ...app_sp.ph_4,
    ...app_sp.pv_1
  },

  card_main_container: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  card_content_container: {
    flex: 1,
    flexDirection: 'column'
  },

  cart_tag_container: {
    flexDirection: 'row',
    ...app_sp.mb_4
  },

  card_title: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    ...card_text_default_color
  },

  car_subtitle: {
    ...card_text_default_color
  },

  card_information_container: {
    flexDirection: 'row'
  },

  card_information_col: {
    flexDirection: 'column',
    ...app_sp.me_4
  },

  card_buttons_container: {
    flexDirection: 'row'
  }
});

export default style