import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Ionicons,
  Fontisto,
  Entypo,
} from "react-native-vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { app_c, app_sp } from "globals/styles";
import styles from "./RoundedRectangleButtonStyle";


function RoundedRectangleButton() {
  return (
    <View style={styles.rounded_rectangle}>
      <TouchableOpacity
        style={[{ backgroundColor: app_c.HEX.fourth }, styles.profile_btn]}
      >
        <Text style={[{ color: app_c.HEX.primary }, styles.btn_name]}>
          View stats
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          { backgroundColor: app_c.HEX.ext_primary, marginLeft: 12 },
          styles.profile_btn,
        ]}
      >
        <AntDesign style={{ ...app_sp.ph_6 }} name="edit" />
        <Text style={[{ color: app_c.HEX.ext_second }, styles.btn_name]}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.choices_setting}>
        <Entypo name="dots-three-horizontal" color={app_c.HEX.ext_second} />
      </TouchableOpacity>
    </View>

 
  );
}

export default RoundedRectangleButton;
