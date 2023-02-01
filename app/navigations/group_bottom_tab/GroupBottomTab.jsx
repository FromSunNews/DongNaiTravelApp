import { 
  TouchableOpacity, 
  View,
  Image,
  Animated,
  Dimensions,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from 'react-native'

import React, { useRef } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Home from 'screens/home/Home'
import Explore from 'screens/exlore/Explore'
import Blogs from 'screens/blogs/Blogs'
import Map from 'screens/map/Map'
import Setting from 'screens/settings/Setting'

import { app_c, app_dms } from 'globals/styles'

const GroupBottomTab = () => {
  // Phuong: https://reactnavigation.org/docs/bottom-tab-navigator/
  const Tab = createBottomTabNavigator()

  // const myCart = useSelector(state => state.myCart)

  const tabOffsetValue = useRef(new Animated.Value(0)).current
  const getWidth = () => {
      return (app_dms.screenWidth - 80) / 5
  }

  const navigation = useNavigation()
  return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator screenOptions={{
                'tabBarShowLabel': false,
                'tabBarStyle': {
                    backgroundColor: app_c.HEX.fourth,
                    position: 'absolute',
                    bottom: 40,
                    height: 60,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                }
            }}
            >
                <Tab.Screen name={'Home'} component={Home} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', top: 15 }}>
                          {
                            focused 
                            ?
                            <Ionicons name='home' size={25} color={app_c.HEX.ext_primary} />
                            :
                            <Ionicons name='md-home-outline' size={25} color={app_c.HEX.ext_second}/>
                          }
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: 0,
                            useNativeDriver: true
                        }).start()
                    }
                })}></Tab.Screen>
                <Tab.Screen name={'Explore'} component={Explore} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', top: 12, right: 12 }}>
                          {
                            focused 
                            ?
                            <Ionicons name='compass' size={30} color={app_c.HEX.ext_primary} />
                            :
                            <Ionicons name='md-compass-outline' size={30} color={app_c.HEX.ext_second}/>
                          }
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth(),
                            useNativeDriver: true
                        }).start()
                    }
                })}></Tab.Screen>
                <Tab.Screen name='Map' component={Map} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <View style={{
                                width: 60, height: 60, borderRadius: 30, backgroundColor: app_c.HEX.third, justifyContent: 'center', alignItems: 'center', bottom: 15,
                                borderColor: app_c.HEX.second, borderWidth: 5,
                            }}>
                            {
                              focused 
                              ?
                              <Ionicons name='map' size={25} color={app_c.HEX.ext_primary} />
                              :
                              <Ionicons name='map-outline' size={25} color={app_c.HEX.ext_primary}/>
                            }
                            </View>
                            {/* {myCart.length > 0 ?
                                <View
                                    style={{
                                        height: 15,
                                        width: 15,
                                        backgroundColor: COLORS.red,
                                        borderRadius: 15,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        elevation: 20,
                                        bottom: 70,
                                        left: 35
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: COLORS.whiteMain
                                        }}
                                    >{myCart.length}</Text>
                                </View>
                                : null
                            } */}

                        </View>
                    )
                }}
                listeners={({ navigation, route }) => ({
                  tabPress: e => {
                      Animated.spring(tabOffsetValue, {
                          toValue: getWidth() *2,
                          useNativeDriver: true
                      }).start()
                  }
              })}
                ></Tab.Screen>
                <Tab.Screen name={'Blogs'} component={Blogs} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', top: 12 }}>
                          {
                            focused 
                            ?
                            <MaterialCommunityIcons name='text-box' size={30} color={app_c.HEX.ext_primary} />
                            :
                            <MaterialCommunityIcons name='text-box-outline' size={30} color={app_c.HEX.ext_second}/>
                          }
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 3,
                            useNativeDriver: true
                        }).start()
                    }
                })}></Tab.Screen>
                <Tab.Screen name={'Profile'} component={Setting} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', top: 15 }}>
                          {
                            focused 
                            ?
                            <FontAwesome name='user-circle' size={25} color={app_c.HEX.ext_primary} />
                            :
                            <FontAwesome name='user-circle-o' size={25} color={app_c.HEX.ext_second}/>
                          }
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 4,
                            useNativeDriver: true
                        }).start()
                    }
                })}></Tab.Screen>
            </Tab.Navigator>
            <Animated.View style={{
                width: 5, height: 5, backgroundColor: app_c.HEX.primary, position: 'absolute', bottom: 50, left: 67, borderRadius: 10,
                transform: [{ translateX: tabOffsetValue }], elevation: 20
            }}></Animated.View>
        </View>
  )
}

export default GroupBottomTab