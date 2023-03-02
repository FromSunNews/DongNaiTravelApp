import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Ionicons,
  Fontisto,
  Entypo,
} from "react-native-vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationAction,
} from "@react-navigation/native";

import { app_c, app_sp } from "globals/styles";
import styles from "./RoundedRectangleButtonStyle";
import { AppText, BannerButton } from "components";
import MapScreen from "screens/map/MapScreen";

function RoundedRectangleButton() {
  return (
    <View style={styles.rounded_rectangle}>
      <TouchableOpacity
        style={{ backgroundColor: app_c.HEX.fourth, ...styles.profile_btn }}
      >
        <Text style={{ color: app_c.HEX.primary, ...styles.btn_name }}>
          View stats
        </Text>
      </TouchableOpacity>
      <AppText
        style={{
          backgroundColor: app_c.HEX.ext_primary,
          marginLeft: 12,
          ...styles.profile_btn,
        }}
        toScreen={{ screenName: "MapScreen" }}
      >
        <View style={styles.profile_btn_view}>
          <AntDesign style={{ ...app_sp.ph_6 }} name="edit" />
          <Text>Edit Profile</Text>
        </View>
      </AppText>
      <TouchableOpacity style={styles.choices_setting}>
        <Text>
          <Entypo name="dots-three-horizontal" color={app_c.HEX.ext_second} />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RoundedRectangleButton;
