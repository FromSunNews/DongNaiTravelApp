import { app_c, app_dms, app_sh, app_sp } from "globals/styles"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  pd_bottom_sheet: {
    backgroundColor: app_c.HEX.primary,
    ...app_sh.ronuded_top_16
  },

  pd_bottom_sheet_view: {
    backgroundColor: app_c.HEX.primary,
    flex: 1,
    ...app_sp.ph_12
  },

  pd_header: {
    justifyContent: 'space-between',
    borderBottomColor: app_c.HEX.fourth,
    borderBottomWidth: .75,
    ...app_sp.pb_12
  },

  pd_row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  pd_tab_container: {
    flexDirection: 'row',
    ...app_sp.mb_12
  },

  pb_tab_button_active: {
    borderBottomColor: app_c.HEX.fourth,
    borderBottomWidth: .75,
  },

  pb_content_container: {
    flex: 1
  },

  pb_content_article: {
    flex: 1,
    ...app_sp.mb_12
  },

  pb_content_image_row_container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column'
  },

  pb_content_image_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  pb_content_image_button: {
    width: '48%',
    overflow: 'hidden'
  }
})

export default styles