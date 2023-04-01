import { StyleSheet } from "react-native";

import { app_c, app_sh, app_sp } from "globals/styles";

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },

  bar_chart_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bar_chart_label_container: {
    ...app_sp.ph_6
  },

  bar_chart_container: {
    flex: 1,
    height: 8,
    ...app_sh.capsule
  },

  bar_chart: {
    height: '100%',
    ...app_sh.capsule
  }
});

export default styles