import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppHeader } from "components";
import SettingScreen from "screens/settings/SettingScreen";
import EditProfileScreen from "screens/edit_profile/EditProfileScreen";
import ProfileScreen from "screens/profile_screen/ProfileScreen";
import BlogSavedScreen from "../../screens/blog_saved/BlogSavedScreen";

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
import PlaceSavedScreen from "../../screens/place_saved/PlacesSavedScreen";

const SettingStack = createNativeStackNavigator();
const ProfileStack =createNativeStackNavigator();

const SettingNavigator = () => {
  langCode = useSelector(selectCurrentLanguage).languageCode
  return (
    <SettingStack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{ header: (props) => <AppHeader  {...props} /> }}
    >
      <SettingStack.Screen name={langCode === 'vi' ? "Cài Đặt" : "Settings"} options={{isTopScreen:true}}>
        {(props) => <SettingScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Profile" options={{ title: `${langCode === "vi" ? "Trang Cá Nhân" : "Profile" }`}}>
        {(props) => <ProfileScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="BlogSavedScreen" options={{ title: `${langCode === "vi" ? "Bài Viết" : "Blogs" }`}}>
        {(props) => <BlogSavedScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="PlacesSavedScreen" options={{ title: `${langCode === "vi" ? "Địa Điểm" : "Places" }`}}>
        {(props) => <PlaceSavedScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Notifications" options={{ title: `${langCode === "vi" ? "Thông Báo" : "Notifications"}` }} >
        {(props) => <NotificationsScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Reports" options={{ title: `${langCode === "vi" ? "Báo Cáo" : "Reports" }`}}>
        {(props) => <ReportsScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="About" options={{ title: `${langCode === "vi" ? "Giới Thiệu" : "About" }`}}>
        {(props) => <AboutScreen {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Help & Support" options={{ title: `${langCode === "vi" ? "Hỗ Trợ" : "Help & Support" }`}} >
        {(props) => <HelpAndSupportScreen {...props} />}
      </SettingStack.Screen>
      
      {/* navigation của profile */}
      <ProfileStack.Screen name="EditProfileScreen" options={{title:`${langCode === "vi" ? "Chỉnh Sửa Trang Cá Nhân" : "Edit Profile" }`}} >
        {(props)=><EditProfileScreen {...props}/>}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="CreatePostScreen" options={{title:`${langCode === "vi" ? "Tạo Bài Viết" : "Create Post" }`}}>
        {(props)=><CreatePost {...props}/>}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="BlogDetailScreen" options={{title: `${langCode  === 'vi' ? 'Chi Tiết Bài Viết' : 'Blog Detail'}`,}}>
        {(props)=><BlogDetailScreen {...props}/>}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="ViewStatsScreen" options={{title:`${langCode  === 'vi' ? 'Thống Kê' : 'View Stats'}`}}>
        {(props)=><ViewStatsScreen {...props}/>}
      </ProfileStack.Screen>
    </SettingStack.Navigator>
  );
};

export default SettingNavigator;