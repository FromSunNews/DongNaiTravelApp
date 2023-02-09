import { 
    TouchableOpacity, 
    View,
    Animated,
    SafeAreaView
  } from 'react-native'
  import React, { useRef } from 'react'
  
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
  import { useNavigation } from '@react-navigation/native'
  import Ionicons from 'react-native-vector-icons/Ionicons'
  
  import HomeScreen from 'screens/home/HomeScreen'
import ExploreScreen from 'screens/explore/ExploreScreen'
  import BlogsScreen from 'screens/blogs/BlogsScreen'
  import MapScreen from 'screens/map/MapScreen'
  import SettingScreen from 'screens/settings/SettingScreen'
  import ProfileScreen from 'screens/profile_screen/ProfileScreen'
  
  import styles from './GroupBottomTabStyles'
  import { app_dms } from 'globals/styles'
  
  const tabIcon = {
      'HomeScreen': {
          inactive: 'home-outline',
          active: 'home',
          isHighlight: false,
          size: 25
      },
      'ExploreScreen': {
          inactive: 'compass-outline',
          active: 'compass',
          isHighlight: false,
          size: 30
      },
      'MapScreen': {
          inactive: 'map-outline',
          active: 'map',
          isHighlight: true,
          size: 25
      },
      'BlogsScreen': {
          inactive: 'newspaper-outline',
          active: 'newspaper',
          isHighlight: false,
          size: 25
      },
      'ProfileScreen': {
          inactive: 'person-circle-outline',
          active: 'person-circle',
          isHighlight: false,
          size: 30
      }, 
  }
  
  // Tuan: ScreenWidth sẽ có độ dài là 375, vì t đang làm trên iphone 6
  // Các thông số này tạm thời để đây vì chưa có tính năng xoay màn hình.
  // Giải thích ở phần comment của https://github.com/FromSunNews/DongNaiTravelApp/issues/17
  const iconContainerWidth = 30;
  const numberOfIcons = 5;
  const dotWidth = 5;
  const bottomBarWidth = app_dms.screenWidth - 36;
  const tabButtonsContainerWidth = bottomBarWidth - 44;
  const tabButtonSpaceWidth = (tabButtonsContainerWidth - (iconContainerWidth * numberOfIcons)) / (numberOfIcons - 1);
  const centerDotDistance = (iconContainerWidth / 2) - (dotWidth / 2);
  const dotMoveDistance = tabButtonSpaceWidth + centerDotDistance + (iconContainerWidth - centerDotDistance);
  
  const BottomTabBar = ({ state, descriptors, navigation, tabOffsetValue }) => {
      return (
          <View style={styles.tab_bottom_container}>
              <View style={styles.tab_bottom_buttons_container}>
                  {state.routes.map((route, index) => {
                      const { options } = descriptors[route.key];
  
                      const isFocused = state.index === index;
  
                      const handlePressTabButton = () => {
                          const event = navigation.emit({
                              type: 'tabPress',
                              target: route.key,
                              canPreventDefault: true,
                          });
  
                          if (!isFocused && !event.defaultPrevented) {
                              // Bảo toàn params trong Screen với prop merge: true
                              navigation.navigate({ name: route.name, merge: true });
                          }
  
                          Animated.spring(tabOffsetValue, {
                              toValue: dotMoveDistance * index + centerDotDistance,
                              useNativeDriver: true
                          }).start()
                      };
  
                      return (
                          <TouchableOpacity
                              accessibilityRole="button"
                              accessibilityState={isFocused ? { selected: true } : {}}
                              accessibilityLabel={options.tabBarAccessibilityLabel}
                              onPress={handlePressTabButton}
                              key={route.name}
                              style={styles.tab_bottom_button}
                          >
                              <View style={tabIcon[route.name].isHighlight ? styles.tab_bottom_hl_icon_conatiner : styles.tab_bottom_icon_conatiner}>
                                  {
                                      tabIcon[route.name].isHighlight ?
                                      (<Ionicons
                                          size={tabIcon[route.name].size}
                                          name={isFocused ? tabIcon[route.name].active : tabIcon[route.name].inactive}
                                          style={isFocused ? styles.tab_bottom_hl_icon_active : styles.tab_bottom_hl_icon_inactive}
                                      />) :
                                      (<Ionicons
                                          size={tabIcon[route.name].size}
                                          name={isFocused ? tabIcon[route.name].active : tabIcon[route.name].inactive}
                                          style={{...(isFocused ? styles.tab_bottom_icon_active : styles.tab_bottom_icon_inactive)}}
                                      />)
                                  }
                              </View>
                          </TouchableOpacity>
                      );
                  })}
              </View>
              <Animated.View style={{...styles.tab_bottom_dot_animated_container, transform: [{ translateX: tabOffsetValue }]}}></Animated.View>
          </View>
      );
  }
  
  const Tab = createBottomTabNavigator()
  
  const GroupBottomTab = () => {
    // Phuong: https://reactnavigation.org/docs/bottom-tab-navigator/
  
    // const myCart = useSelector(state => state.myCart)
  
    const tabOffsetValue = useRef(new Animated.Value(centerDotDistance)).current
    const getWidth = () => {
        return (app_dms.screenWidth) / 5
    }
  
    const navigation = useNavigation()
    return (
          <SafeAreaView style={styles.container}>
                  <Tab.Navigator
                      tabBar={props => (<BottomTabBar {...props} tabOffsetValue={tabOffsetValue} />)}
                      screenOptions={{
                          'tabBarShowLabel': false
                      }}
                  >
                          <Tab.Screen
                              name={'HomeScreen'}
                              component={HomeScreen}
                              options={{
                                  headerShown: false
                              }}>
                          </Tab.Screen>
  
                          <Tab.Screen
                              name={'ExploreScreen'}
                              component={ExploreScreen}
                              options={{
                                  headerShown: false
                              }}>
                          </Tab.Screen>
  
                          <Tab.Screen
                              name={'MapScreen'}
                              component={MapScreen}
                              options={{
                                  headerShown: false
                              }}>
                          </Tab.Screen>
  
                          <Tab.Screen
                              name={'BlogsScreen'}
                              component={BlogsScreen}
                              options={{
                                  headerShown: false
                              }}>
                      </Tab.Screen>
  
                          <Tab.Screen
                              name={'ProfileScreen'}
                              component={ProfileScreen}
                              options={{
                                  headerShown: false
                              }}>
                                  
                          </Tab.Screen>
                  </Tab.Navigator>
          </SafeAreaView>
    )
  }
  
  export default GroupBottomTab