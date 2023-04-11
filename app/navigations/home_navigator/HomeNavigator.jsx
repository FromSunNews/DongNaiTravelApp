import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppHeader } from "components";
import HomeScreen from "screens/home/HomeScreen";
import NotificationsScreen from "screens/notifications/NotificationsScreen";
import PlaceDetailScreen from "screens/place_detail/PlaceDetailScreen";
import BlogDetailScreen from "screens/blog_detail/BlogDetailScreen";
import ExploreScreen from "screens/explore/ExploreScreen";
import BlogsScreen from "screens/blogs/BlogsScreen";

const HomeStack=createNativeStackNavigator()

const HomeNavigator=()=>{
  return (
    <HomeStack.Navigator
    initialRouteName="HomeScreen"
      screenOptions={{ header: (props) => <AppHeader screenName="Home" {...props} /> }}
    >
      <HomeStack.Screen name="Home" options={{isTopScreen:true}}>
        {(prop)=><HomeScreen {...prop}/>}
      </HomeStack.Screen>
      <HomeStack.Screen 
      name="Notification" 
      options={{headerShown:true,title:"Notification"}}
      screenOptions={{ header: (props) => <AppHeader screenName="Home" {...props} /> }}
      >
        {(prop)=><NotificationsScreen {...prop}/>}
      </HomeStack.Screen>
      <HomeStack.Screen
        name='PlaceDetailScreen'
        options={{
          title: 'Place Detail',
        
        }}
      >
        {(prop) => (
          <PlaceDetailScreen {...prop}/>
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name='BlogDetailScreen'
        options={{
          title: 'Blog Detail',
         
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
          title: 'Blogs',
         
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