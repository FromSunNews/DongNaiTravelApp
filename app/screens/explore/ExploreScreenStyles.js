import { StyleSheet } from "react-native";

import { app_sp, app_dms, app_c } from "globals/styles";

const styles = StyleSheet.create({
  scroll_view_container: {
    height: app_dms.screenHeight
  },

  place_cards_container: {
    ...app_sp.mh_4
  }
});

export default styles;