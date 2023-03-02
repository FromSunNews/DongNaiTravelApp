import { StyleSheet } from "react-native";
import { app_sp, app_dms ,app_c, app_sh,app_typo,app_shdw} from "globals/styles";

const styles = StyleSheet.create({
  rounded_rectangle:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space_between',
    ...app_sp.pt_12
  },
  
  profile_btn:{
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:8
    
 
  },
  btn_name:{
    ...app_typo.size.sz_16,
    fontWeight:'500',
    
    
  },
  profile_btn_view:{
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center',
    width:140,
    height:35,

  },
  choices_setting:{
    width:35,
    height:35,
    ...app_sh.rounded_8,
    backgroundColor:app_c.HEX.ext_primary,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:12
  },

  btn_appText:{
    width:'100%',
    height:'100%'
  }
})
export default styles