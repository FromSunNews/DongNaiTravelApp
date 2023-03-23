import { View, Text ,ScrollView} from "react-native";
import React from "react";
import { Ionicons,Entypo,Octicons,MaterialIcons ,AntDesign,Feather,Foundation,Fontisto} from "react-native-vector-icons";

import { styles } from "./SettingScreenStyles";
import { AppText, RectangleButton } from "components";
import { app_c, app_dms, app_sh, app_typo } from "globals/styles";
import DropDown from "components/drop_down/DropDown";
import { values } from "lodash";

const SettingScreen = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.setting_genre}>
        <View style={styles.genre_title_block}>
          <AppText weight="bolder" font="body1">
            Account
          </AppText>
        </View>
        <View style={styles.genre_main}>
          <View style={styles.genre_content}>
            <RectangleButton
              defaultColor="type_2"
              overrideShape="rounded_8"
              style={styles.option_setting}
              handlePressButton={() => navigation.navigate("Profile")}

            >
              <AppText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="ios-person-circle-outline"
                    style={styles.avatar}
                    color={app_c.HEX.fourth}
                    size={35}
                  />
                  <AppText style={{paddingLeft:12}}>Lost Teach</AppText>
                </View>
              </AppText>
            </RectangleButton>
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
            />
          </View>
        </View>

        <View style={styles.genre_main}>
          <View style={styles.genre_content}>
            <DropDown 
              icon={<MaterialIcons name="report-problem" size={25}/>}
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
              handlePressButton={() => navigation.navigate("Help and Support")}
            />
          </View>
        </View>

        <View style={styles.genre_main}>
          <View style={styles.genre_content}>
            <DropDown 
              icon={<Entypo name="log-out" size={25}/>}
              name={"Log out"}
              isDrop={false}
            />
          </View>
        </View>

        <View style={styles.genre_main}>
          <View style={styles.genre_content}>
            <DropDown 
              icon={<AntDesign name="exclamationcircleo" size={25}/>}
              name={"Help and Support"}
              isDrop={false}
            />
          </View>
        </View>

        <View style={styles.genre_main}>
          <View style={styles.genre_content}>
            <DropDown 
              icon={<AntDesign name="exclamationcircleo" size={25}/>}
              name={"Help and Support"}
              isDrop={false}
            />
          </View>
        </View>
      
      </View>
    </ScrollView>
  );
};

export default SettingScreen;
