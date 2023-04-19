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
const ProfileStack =createNativeStackNavigator();

const SettingNavigator = () => {
  langCode = useSelector(selectCurrentLanguage).languageCode
  return (
    <SettingStack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{ header: (props) => <AppHeader {...props} /> }}
    >
      <SettingStack.Screen name={langCode === 'vi' ? "Cài đặt" : "Settings"} options={{isTopScreen:true}}>
        {(props) => <SettingScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Profile" options={{isTopScreen:true, title: `${langCode === "vi" ? "Trang cá nhân" : "Profile" }`}}>
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
      
      <ProfileStack.Screen name="EditProfileScreen">
        {(props)=><EditProfileScreen {...props}/>}
      </ProfileStack.Screen>
      <ProfileStack.Screen 
        name="CreatePostScreen"
        options={{
         title: 'Create Post',
       }}
      >
        {(props)=><CreatePost {...props}/>}
      </ProfileStack.Screen>
      <ProfileStack.Screen 
        name="BlogDetailScreen"
        options={{
         title: `${langCode  === 'vi' ? 'Chi Tiết Bài Viết' : 'Blog Detail'}`,
       }}
      >
        {(props)=><BlogDetailScreen {...props}/>}
      </ProfileStack.Screen>
      <ProfileStack.Screen 
        name="ViewStatsScreen"
        options={{
         title:`${langCode  === 'vi' ? 'Thống Kê' : 'View Stats'}`,
       }}
      >
        {(props)=><ViewStatsScreen {...props}/>}
      </ProfileStack.Screen>

    </SettingStack.Navigator>
  );
};

export default SettingNavigator;