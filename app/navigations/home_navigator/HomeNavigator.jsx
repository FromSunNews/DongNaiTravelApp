import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppHeader } from "components";
import HomeScreen from "screens/home/HomeScreen";
import NotificationsScreen from "screens/notifications/NotificationsScreen";
import PlaceDetailScreen from "screens/place_detail/PlaceDetailScreen";
import BlogDetailScreen from "screens/blog_detail/BlogDetailScreen";
import ExploreScreen from "screens/explore/ExploreScreen";
import BlogsScreen from "screens/blogs/BlogsScreen";
import ProfileScreen from "../../screens/profile_screen/ProfileScreen";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "redux/language/LanguageSlice";

const HomeStack=createNativeStackNavigator()

const HomeNavigator=()=>{

  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.appHeader

  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ header: (props) => <AppHeader  screenName='Home' {...props} /> }}
    >
      <HomeStack.Screen name="Home"
        options={{
          isTopScreen: true,
          title: langData.home[langCode]
        }}
        component={HomeScreen}
      />
      
      <HomeStack.Screen 
        name= "Notification"
        options={{headerShown:true,title:`${langCode === 'vi' ? 'Thông Báo' : 'Notification'}`}}
        screenOptions={{ header: (props) => <AppHeader screenName="Home" {...props} /> }}
        component={NotificationsScreen}
      />
      
      <HomeStack.Screen 
        options={{ headerShown:true, title:"Profile"}}
        name="Profile" 
        component={ProfileScreen}
      />

      <HomeStack.Screen
        name='PlaceDetailScreen'
        options={{
          title: `${langCode === 'vi' ? 'Chi Tiết Địa Điểm' : 'Place Detail'}`,
        }}
        screenOptions={{ header: (props) => <AppHeader screenName="Home" {...props} /> }}
        component={PlaceDetailScreen}
      />
      <HomeStack.Screen
        name='BlogDetailScreen'
        options={{
          title: `${langCode === 'vi' ? 'Chi Tiết Bài Viết' : 'Blog Detail'}`,
        }}
        component={BlogDetailScreen}
      />
    </HomeStack.Navigator>
  )
}
export default HomeNavigator