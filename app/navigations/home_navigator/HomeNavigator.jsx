import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppHeader } from "components";
import HomeScreen from "screens/home/HomeScreen";
import NotificationsScreen from "screens/notifications/NotificationsScreen";

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
      <HomeStack.Screen name="Notification" options={{headerShown:false}} >
        {(prop)=><NotificationsScreen {...prop}/>}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  )
}
export default HomeNavigator