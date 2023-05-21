import { app_c, app_sp } from "globals/styles";
import { StyleSheet } from "react-native"

import { HEADER_HEIGHT } from "utilities/constants";
import { app_shdw } from "../../globals/styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT,
    border: 'none',
    ...app_sp.ph_18,
    // Phuong ne :> 
    ...app_shdw.type_1
  },

  header_col: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default styles