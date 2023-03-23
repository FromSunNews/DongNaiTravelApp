import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppHeader } from "components";
import SettingScreen from "screens/settings/SettingScreen";
import EditProfileScreen from "screens/edit_profile/EditProfileScreen";
import ProfileScreen from "screens/profile_screen/ProfileScreen";
import BlogsScreen from "screens/blogs/BlogsScreen";
import PlacesScreen from 'screens/places/PlacesScreen'
import Notifications from "screens/notifications/NotificationsScreen";
import NotificationsScreen from "screens/notifications/NotificationsScreen";
import AboutScreen from "screens/about/AboutScreen";
import HelpAndSupportScreen from "screens/help_and_support/HelpAndSupportScreen";
import ReportsScreen from "screens/reports/ReportsScreen";

const SettingStack = createNativeStackNavigator();

const SettingNavigator = () => {
  return (
    <SettingStack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{ header: (props) => <AppHeader {...props} /> }}
    >
      <SettingStack.Screen name="Settings" options={{isTopScreen:true}}>
        {(props) => <SettingScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Profile" >
        {(props) => <ProfileScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Blogs" >
        {(props) => <BlogsScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Places" >
        {(props) => <PlacesScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Notifications" >
        {(props) => <NotificationsScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Reports" >
        {(props) => <ReportsScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="About" >
        {(props) => <AboutScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Help & Support" >
        {(props) => <HelpAndSupportScreen {...props} />}
      </SettingStack.Screen>

    </SettingStack.Navigator>
  );
};

export default SettingNavigator;