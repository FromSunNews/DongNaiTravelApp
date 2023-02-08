import { StyleSheet } from "react-native";
import { app_sp, app_dms, app_c, app_sh, app_typo, app_shdw } from "globals/styles";

const styles = StyleSheet.create({
  wrapper: {
    width: app_dms.screenWidth,
    height: app_dms.screenHeight,
  },
  container: {
    width: '100%',
  },
  imageCover: {
    width: '100%',
    height: 210,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'

  },
  circle_icon: {
    width: 30,
    height: 30,
    backgroundColor: app_c.HEX.primary,
    ...app_sh.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    marginBottom: 18,
    ...app_shdw.type_1
  },
  icon_camera: {
    color: app_c.HEX.fourth,
    fontSize: 18
  },
  profile_avatar: {
    alignItems: 'center'
  },
  circle_avatar: {
    width: 110,
    height: 110,
    backgroundColor: app_c.HEX.primary,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: -60,
  },
  avatar: {
    marginTop: -4,
    fontSize: 110
  },
  avatar_icon: {
    width: 30,
    height: 30,
    backgroundColor: app_c.HEX.primary,
    ...app_sh.circle,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 6,
    bottom: 6,
    ...app_shdw.type_1
  },
  icon_camera: {
    fontSize: 16,
  },
  //user_info_block
  user_block: {
    ...app_sp.ph_6,
    ...app_sp.pt_1,
    alignItems: "center"
  },
  user_name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: app_c.HEX.fourth
  },
  user_info_follow: {
    ...app_sp.pt_6,
    flexDirection: 'row',
  },
  user_following: {
    color: app_c.HEX.ext_second,

  },
  user_follower: {
    color: app_c.HEX.ext_second,
    ...app_typo.size.sz_18
  },
  user_infos: {
    width: '100%',
    
  },
  user_info_block:{
    ...app_sp.pt_8,
  },
  user_info_title: {
    ...app_typo.size.sz_18,
    fontWeight: 'bold',
    color:app_c.HEX.fourth

  },
  user_bio_content: {
    ...app_sp.pt_18
  },
  user_info_other:{
    flexDirection:'row',
    ...app_sp.pt_6,
    alignItems:'center'
  },
  user_info_other_icon:{
    color:app_c.HEX.ext_second,
    ...app_typo.size.sz_18
  },
  user_info_other_content:{
    ...app_sp.ph_16,
    ...app_typo.size.sz_12,
    color:app_c.HEX.ext_second
  },
  user_info_address:{
    fontWeight:'bold'
  },
  line_horizontal:{
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:app_c.HEX.ext_second,
    ...app_sp.pt_4
  },
  // start blog block
  blog_block:{
    width:'100%',
    ...app_sp.ph_6,
  },
  btn_create_blog:{
    width:'100%',
    height:50,
    backgroundColor:app_c.HEX.ext_primary,
    ...app_sh.rounded_8,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    ...app_sp.mt_7
    
  },
  btn_create_blog_name:{
    color:app_c.HEX.ext_second,
    ...app_typo.sz_5
  },
  btn_manage_blog:{
    height:50,
    backgroundColor:app_c.HEX.fourth,
    ...app_sh.rounded_8,
    justifyContent:'center',
    alignItems:'center',
    ...app_sp.mt_4,
  },
  btn_manage_blog_name:{
    ...app_typo.sz_5,
    color:app_c.HEX.primary
  }, 
  blog_title_container:{
    ...app_sp.mt_7,
  },
  blog_title:{
    ...app_typo.sz_6,
    fontWeight:'bold',
    color:app_c.HEX.fourth
  },
  blog_container:{
    width:'100%',
    height:165,
    backgroundColor:app_c.HEX.sub_primary,
    ...app_sh.rounded_8,
    justifyContent:'center',
    alignItems:'center'
  }
  // end blog block
})
export default styles