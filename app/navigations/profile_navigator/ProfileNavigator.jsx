import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "screens/profile_screen/ProfileScreen";
import { AppHeader } from "components";
import SettingScreen from "screens/settings/SettingScreen";
import EditProfileScreen from "screens/edit_profile/EditProfileScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ header: (props) => <AppHeader {...props} /> }}
    >
      <ProfileStack.Screen name="SettingScreen" options={{ isTopScreen: true }}>
        {(props) => <SettingScreen {...props} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="ProfileScreen">
        {(props) => <ProfileScreen {...props} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="EditProfileScreen">
        {(props) => <EditProfileScreen />}
      </ProfileStack.Screen>

    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
