import { View, Text ,ScrollView} from "react-native";
import React from "react";
import { Ionicons,Entypo,Octicons,MaterialIcons ,AntDesign,Feather,Foundation,Fontisto} from "react-native-vector-icons";
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, signOutUserAPI } from 'redux/user/UserSlice'
import { useNavigation } from '@react-navigation/native'

import { styles } from "./SettingScreenStyles";
import { AppText, RectangleButton } from "components";
import { app_c, app_dms, app_sh, app_typo } from "globals/styles";
import DropDown from "components/drop_down/DropDown";
import { values } from "lodash";

const SettingScreen = ({ route, navigation }) => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingBottom:130}}>
        <View style={styles.setting_genre}>
          <View style={styles.genre_title_block}>
            <AppText weight="bolder" font="body1">
              Account
            </AppText>
          </View>
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown
              name={"Lost Teach"}
              icon={<Ionicons name="person-circle-outline" size={25}/>}
              isDrop={false}
              handlePressButton={()=>navigation.navigate("Profile")}
              />
            </View>
          </View>
        </View>
        <View style={[styles.setting_genre, { ...styles.pt_22 }]}>
          <View style={styles.genre_title_block}>
            <AppText weight="bolder" font="body1">
              Your Archive
            </AppText>
          </View>
          <View style={styles.genre_main}>
            <View style={[styles.genre_content, { ...styles.flexDirection }]}>
              <RectangleButton
                overrideShape="rounded_8"
                style={styles.option_setting}
                handlePressButton={() => navigation.navigate("Places")}
              >
                <AppText>
                  <View style={{ ...styles.rectangle_button_container }}>
                    <Foundation
                      name="mountains"
                      style={styles.avatar}
                      color={app_c.HEX.fourth}
                      size={35}
                    />
                    <Text style={styles.option_setting_name}>Places</Text>
                  </View>
                </AppText>
              </RectangleButton>
              <RectangleButton
                overrideShape="rounded_8"
                style={styles.option_setting}
                handlePressButton={() => navigation.navigate("Blogs")}
              >
                <AppText>
                  <View style={{ ...styles.rectangle_button_container }}>
                    <Entypo
                      name="text-document"
                      style={styles.avatar}
                      color={app_c.HEX.fourth}
                      size={35}
                    />
                    <Text style={styles.option_setting_name}>Blog</Text>
                  </View>
                </AppText>
              </RectangleButton>
            </View>
          </View>
        </View>
        <View style={[styles.setting_genre, { ...styles.pt_22 }]}>
          <View style={styles.genre_title_block}>
            <AppText weight="bolder" font="body1">
              Settings
            </AppText>
          </View>
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
              icon={<Entypo name="light-up" size={25}/>}
              isMode={true}
              name={"Dark Mode"}
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<Ionicons name="notifications-outline" size={25}/>}
                name={"Notification"}
                isDrop={false}
                handlePressButton={() => navigation.navigate("Notifications")}
                idOption='UPDATE_FROM_FOLLOWING'
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<Feather name="alert-octagon" size={25}/>}
                name={"Report"}
                isDrop={false}
                handlePressButton={() => navigation.navigate("Reports")}
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<AntDesign name="exclamationcircleo" size={25}/>}
                name={"About"}
                isDrop={false}
                handlePressButton={() => navigation.navigate("About")}
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<Feather name="help-circle" size={25}/>}
                name={"Help and Support"}
                isDrop={false}
                handlePressButton={() => navigation.navigate("Help & Support")}
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<Entypo name="log-out" size={25}/>}
                name={"Log out"}
                isDrop={false}
                handlePressButton={() => {
                  dispatch(signOutUserAPI()).then(
                    navigation.replace('SigninScreen')
                  )
                }}
              />
            </View>
          </View>      
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingScreen;
