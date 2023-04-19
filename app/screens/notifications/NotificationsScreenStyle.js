import { StyleSheet } from "react-native";
import { app_c, app_shdw, app_typo } from "../../globals/styles";

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  container_item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    width: '100%'
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
    borderWidth: 3,
    borderColor: app_c.HEX.primary,
  },
  container_avatar_small: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  avatar_small: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: app_c.HEX.primary
  },
  content: {
    flex: 1
  },
  username: {
    ...app_typo.fonts.normal.normal.h5
  },
  control:{
    width:40,
    height:40,
    backgroundColor:app_c.HEX.primary,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    ...app_shdw.type_1
  },
  header:{
    marginTop:16,
    flexDirection:'row',
    alignItems:'center'
  },
  notification_content:{
    paddingTop:12 
  },
  content:{
    flex: 1
  },
  content_notification:{
    ...app_typo.fonts.normal.normal.body1,
    marginTop: 3,
  },
  notif_info: {
    ...app_typo.fonts.normal.normal.h4,
    color: app_c.HEX.fourth,
    marginBottom: 20,
    paddingHorizontal: 16
  },
  date: {
    ...app_typo.fonts.normal.bolder.body2,
    color: app_c.HEX.ext_second,
  },
  short_comment: {
    ...app_typo.fonts.normal.bolder.body2,
    color: app_c.HEX.ext_second,
    marginVertical: 5,
  },
  blog_place_img: {
    width: 80,
    height: 60,
    marginVertical: 5,
    borderRadius: 4,
  },
})

export default styles