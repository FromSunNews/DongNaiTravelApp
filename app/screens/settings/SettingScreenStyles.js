import { StyleSheet } from 'react-native'
import { app_c, app_dms, app_sh, app_sp, app_typo } from 'globals/styles'


export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    ...app_sp.ph_16,
    ...app_sp.pt_12,
  },
  option_setting:{
    justifyContent:'flex-start',
    ...app_sh.rounded_8,
    alignItems:'center'
  },
  flexDirection:{
    flexDirection:'row',
    justifyContent:"space-between"
  },
  pt_22:{
    paddingTop:22
  },
  genre_main:{
    ...app_sp.pt_12,
  },
  rectangle_button_container:{
    width:130,
    height:72,
    justifyContent:'center',
    alignItems:'center',
  },
  option_setting_name:{
    ...app_typo.fonts.normal.normal.h5,
    color:app_c.HEX.fourth
  }
})