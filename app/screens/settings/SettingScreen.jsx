import { View, Text , ScrollView} from "react-native";
import React from "react";
import { 
  Ionicons, 
  Entypo, 
  AntDesign, 
  Feather, 
  Foundation, 
  Fontisto
} from "react-native-vector-icons";
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, signOutUserAPI } from 'redux/user/UserSlice'
import { useNavigation } from '@react-navigation/native'

import { styles } from "./SettingScreenStyles";
import { AppText, RectangleButton } from "components";
import DropDown from "components/drop_down/DropDown";
import { values } from "lodash";
import { selectCurrentLanguage } from "../../redux/language/LanguageSlice";
import useTheme from "customHooks/useTheme";


const SettingScreen = ({ route, navigation }) => {
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.settingScreen
  //theme
  const {themeColor} = useTheme()

  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  return (
    <ScrollView style={[styles.container,{backgroundColor: themeColor.bg_second}]}>
      <View style={{paddingBottom:130}}>
        <View style={[styles.setting_genre]}>
          <View style={[styles.genre_title_block]}>
            <AppText weight="bolder" font="body1">
              {langData.account[langCode]}
            </AppText>
          </View>
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown
              name={langData.ac_profile[langCode]}
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
            {langData.archive[langCode]}
            </AppText>
          </View>
          <View style={styles.genre_main}>
            <View style={[styles.genre_content, { ...styles.flexDirection }]}>
              <RectangleButton
                overrideShape="rounded_8"
                style={[styles.option_setting,{backgroundColor:themeColor.bg_tertiary}]}
                handlePressButton={() => navigation.navigate("Places")}
              >
                <AppText>
                  <View style={{ ...styles.rectangle_button_container }}>
                    <Foundation
                      name="mountains"
                      style={styles.avatar}
                      color={themeColor.fourth}
                      size={35}
                    />
                    <Text style={[styles.option_setting_name,{color:themeColor.fourth}]}>{langData.archive_place[langCode]}</Text>
                  </View>
                </AppText>
              </RectangleButton>
              <RectangleButton
                overrideShape="rounded_8"
                style={[styles.option_setting,{backgroundColor:themeColor.bg_tertiary}]}
                handlePressButton={() => navigation.navigate("Blogs")}
              >
                <AppText>
                  <View style={{ ...styles.rectangle_button_container }}>
                    <Entypo
                      name="text-document"
                      style={styles.avatar}
                      color={themeColor.fourth}
                      size={35}
                    />
                    <Text style={[styles.option_setting_name,{color:themeColor.fourth}]}>{langData.archive_blog[langCode]}</Text>
                  </View>
                </AppText>
              </RectangleButton>
            </View>
          </View>
        </View>
        <View style={[styles.setting_genre, { ...styles.pt_22 }]}>
          <View style={styles.genre_title_block}>
            <AppText weight="bolder" font="body1">
              {langData.setting[langCode]}
            </AppText>
          </View>
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
              icon={<Entypo name="light-up" size={25}/>}
              isMode={true}
              name={langData.setting_darkmode[langCode]}
              idOption='DARK_MODE'
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<Ionicons name="notifications-outline" size={25}/>}
                name={langData.setting_notification[langCode]}
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
                name={langData.setting_report[langCode]}
                isDrop={false}
                handlePressButton={() => navigation.navigate("Reports")}
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<AntDesign name="exclamationcircleo" size={25}/>}
                name={langData.setting_about[langCode]}
                isDrop={false}
                handlePressButton={() => navigation.navigate("About")}
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<Feather name="help-circle" size={25}/>}
                name={langData.setting_help_support[langCode]}
                isDrop={false}
                handlePressButton={() => navigation.navigate("Help & Support")}
              />
            </View>
          </View>
  
          <View style={styles.genre_main}>
            <View style={styles.genre_content}>
              <DropDown 
                icon={<Entypo name="log-out" size={25}/>}
                name={langData.logout[langCode]}
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
