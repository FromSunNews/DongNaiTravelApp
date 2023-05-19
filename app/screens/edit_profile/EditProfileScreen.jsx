import { AppText } from "components";
import useTheme from "customHooks/useTheme";
import React from "react";
import { SafeAreaView, View } from "react-native";
import styles from "./EditProfileScreenStyles";



function EditProfileScreen() {
  //theme
  const themeColor = useTheme();
  return ( 
 <SafeAreaView style={[styles.container,{backgroundColor: themeColor.primary}]}>
    <View>
      <AppText>Edit Profile</AppText>
    </View>
 </SafeAreaView> 
  );
}

export default EditProfileScreen;