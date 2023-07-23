import React from "react";
import { SafeAreaView, View } from "react-native";

import { withTheme } from "hocs/withTheme";

import { AppText } from "components";

import styles from "./EditProfileScreenStyles";



const EditProfileScreen = withTheme(({
  theme
}) => {
  //theme
  return ( 
 <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
    <View>
      <AppText>Edit Profile</AppText>
    </View>
 </SafeAreaView> 
  );
});

export default EditProfileScreen;