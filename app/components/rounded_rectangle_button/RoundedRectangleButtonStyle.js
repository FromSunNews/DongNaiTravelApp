import { StyleSheet } from "react-native";
import { app_sp, app_dms ,app_c, app_sh,app_typo,app_shdw} from "globals/styles";

const styles = StyleSheet.create({
  rounded_rectangle:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space_between',
    ...app_sp.pt_4
  },
  
  profile_btn:{
    width:140,
    height:35,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    
 
  },
  btn_name:{
    ...app_typo.sz_4,
  },
  choices_setting:{
    width:35,
    height:35,
    ...app_sh.rounded_8,
    backgroundColor:app_c.HEX.ext_primary,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:12
  }
})
export default styles