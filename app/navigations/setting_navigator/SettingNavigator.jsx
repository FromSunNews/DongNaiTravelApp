import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppHeader } from "components";
import SettingScreen from "screens/settings/SettingScreen";
import EditProfileScreen from "screens/edit_profile/EditProfileScreen";
import ProfileScreen from "screens/profile_screen/ProfileScreen";
import BlogsScreen from "screens/blogs/BlogsScreen";
import PlacesScreen from 'screens/places/PlacesScreen'
import Notifications from "screens/setting_notifications/SettingNotificationsScreen";
import NotificationsScreen from "screens/setting_notifications/SettingNotificationsScreen";
import AboutScreen from "screens/about/AboutScreen";
import HelpAndSupportScreen from "screens/help_and_support/HelpAndSupportScreen";
import ReportsScreen from "screens/reports/ReportsScreen";
import CreatePost from "screens/create_post/CreatePostScreen";
import BlogDetailScreen from "screens/blog_detail/BlogDetailScreen";
import ViewStatsScreen from "screens/view_stats/ViewStatsScreen";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../redux/language/LanguageSlice";

const SettingStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const SettingNavigator = () => {
  langCode = useSelector(selectCurrentLanguage).languageCode
  return (
    <SettingStack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{ header: (props) => <AppHeader {...props} /> }}
    >

      <SettingStack.Screen
        name={langCode === 'vi' ? "Cài đặt" : "Settings"}
        options={{isTopScreen:true}}
        component={SettingScreen}
      />

      <SettingStack.Screen
        name="Profile"
        options={{isTopScreen:true, title: `${langCode === "vi" ? "Trang cá nhân" : "Profile" }`}}
        component={ProfileScreen}
      />

      <SettingStack.Screen
        name="Notifications"
        options={{ isTopScreen: true, title: `${langCode === "vi" ? "Thông báo" : "Notifications"}` }}
        component={NotificationsScreen}
      />

      <SettingStack.Screen
        name="Reports"
        options={{isTopScreen:true, title: `${langCode === "vi" ? "Báo cáo" : "Reports" }`}}
        component={ReportsScreen}
      />

      <SettingStack.Screen
        name="About"
        options={{isTopScreen:true, title: `${langCode === "vi" ? "Giới thiệu" : "About" }`}}
        component={AboutScreen}
      />

      <SettingStack.Screen
        name="Help & Support"
        options={{isTopScreen:true, title: `${langCode === "vi" ? "Hỗ trợ" : "Help & support" }`}}
        component={HelpAndSupportScreen}
      />
      
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />

      <ProfileStack.Screen 
        name="CreatePostScreen"
        options={{
          title: 'Create Post',
        }}
        component={CreatePost}
      />

      <ProfileStack.Screen 
        name="BlogDetailScreen"
        options={{
         title: `${langCode  === 'vi' ? 'Chi Tiết Bài Viết' : 'Blog Detail'}`,
       }}
       component={BlogDetailScreen}
      />

      <ProfileStack.Screen 
        name="ViewStatsScreen"
        options={{
          title:`${langCode  === 'vi' ? 'Thống Kê' : 'View Stats'}`,
        }}
        component={ViewStatsScreen}
      />
    </SettingStack.Navigator>
  );
};

export default SettingNavigator;