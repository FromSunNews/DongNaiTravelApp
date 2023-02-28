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
    ...app_sp.ph_18
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

  pd_tab_button_active: {
    borderBottomColor: app_c.HEX.fourth,
    borderBottomWidth: .75,
  },

  pd_content_container: {
    flex: 1
  },

  pd_content_article: {
    flex: 1,
    ...app_sp.mb_12
  },

  pd_content_image_row_container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column'
  },

  pd_content_image_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  pd_content_image_button: {
    width: '48%',
    overflow: 'hidden'
  },

  pd_content_rr_stats_container: {
    flexDirection: 'row',
    borderBottomColor: app_c.HEX.fourth,
    borderBottomWidth: .75,
    ...app_sp.pb_12,
  },

  pd_content_rr_rating_point_container: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  pd_content_rr_chart_container: {
    flex: 1,
    justifyContent: 'space-between',
    ...app_sp.ps_22
  }
})

export default styles