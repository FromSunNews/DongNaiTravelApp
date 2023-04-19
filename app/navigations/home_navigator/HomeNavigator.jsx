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

  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ header: (props) => <AppHeader  screenName='Home' {...props} /> }}
    >
      <HomeStack.Screen name="Home"
        options={{
          isTopScreen: true,
          title: `${langCode === 'vi' ? 'Trang Chủ' : 'Home'}`,
        }}
      >
        {(prop)=><HomeScreen {...prop}/>}
      </HomeStack.Screen>
      
      <HomeStack.Screen 
      name= "Notification"
      options={{headerShown:true,title:`${langCode === 'vi' ? 'Thông Báo' : 'Notification'}`}}
      screenOptions={{ header: (props) => <AppHeader screenName="Home" {...props} /> }}
      >
        {(prop)=><NotificationsScreen {...prop}/>}
      </HomeStack.Screen>
      
      <HomeStack.Screen 
        options={{ headerShown:true, title:"Profile"}}
        name="Profile" 
      >
        
        {(props) => <ProfileScreen {...props} />}
      </HomeStack.Screen>

      <HomeStack.Screen
        name='PlaceDetailScreen'
        options={{
          title: `${langCode === 'vi' ? 'Chi Tiết Địa Điểm' : 'Place Detail'}`,
        }}
        screenOptions={{ header: (props) => <AppHeader screenName="Home" {...props} /> }}
      >
        {(prop) => (
          <PlaceDetailScreen {...prop}/>
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name='BlogDetailScreen'
        options={{
          title: `${langCode === 'vi' ? 'Chi Tiết Bài Viết' : 'Blog Detail'}`,
        }}
      >
        {(prop) => (
          <BlogDetailScreen {...prop}/>
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name='ExploreScreen'
        options={{
          title: 'Explore',
        }}
      >
        {(prop) => (
          <ExploreScreen {...prop}/>
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name='BlogsScreen'
        options={{
          title: "Blogs",
        }}
      >
        {(prop) => (
          <BlogsScreen {...prop}/>
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  )
}
export default HomeNavigator