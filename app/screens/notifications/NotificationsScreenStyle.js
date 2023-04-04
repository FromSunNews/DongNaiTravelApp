import { app_c, app_shdw, app_typo } from "globals/styles";
import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal:16
  },
  container_item: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
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
    flexDirection:'row'
  },
  content_notification:{
    marginLeft:3,
    ...app_typo.fonts.normal.normal.sub0
  }
})

export default styles