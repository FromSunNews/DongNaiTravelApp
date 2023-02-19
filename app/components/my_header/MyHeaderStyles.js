import { app_c, app_sp } from "globals/styles";
import { StyleSheet } from "react-native"

import { HEADER_HEIGHT } from "utilities/constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT,
    border: 'none',
    backgroundColor: app_c.HEX.primary,
    ...app_sp.ph_12
  },

  header_col: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default styles