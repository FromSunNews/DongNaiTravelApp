import { StyleSheet } from "react-native";

import { app_sp, app_dms, app_c } from "globals/styles";

const style = StyleSheet.create({
  scroll_view_container: {
    backgroundColor: app_c.HEX.primary,
    ...app_sp.pt_4
  },

  place_cards_container: {
    ...app_sp.mh_4
  }
});

export default style;