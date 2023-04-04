import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons,FontAwesome,MaterialIcons } from 'react-native-vector-icons'
import { selectCurrentNotifications } from "redux/setting/SettingSlice";
import { useDispatch, useSelector } from "react-redux";

import styles from './SettingNotificationsScreenStyles'
import DropDown from 'components/drop_down/DropDown'


const SettingNotificationsScreen = () => {

  const notifications=useSelector(selectCurrentNotifications)
  const dispatch = useDispatch()
  // console.log(notifications)

  return (
    <ScrollView style="container">
      <View style={styles.notification_container}>
        <View style={{...styles.dropdown_container}}>
          <DropDown 
            isMode= {true}
            name={"Update from following"}
            icon={<Ionicons name="people-outline" size={25}/>}
            idOption={'UPDATE_FROM_FOLLOWING'}
          />
        </View>

       <View style={{...styles.dropdown_container}}>
          <DropDown 
            isMode= {true}
            name={"Comments"}
            icon={<FontAwesome name="commenting-o" size={25}/>}
            idOption={'COMMENTS'}
          />
       </View>

        <View style={{...styles.dropdown_container}}> 
          <DropDown 
            isMode= {true}
            name={"Events"}
            icon={<MaterialIcons name="event-note" size={25}/>}
            idOption={'EVENTS'}

          />
        </View>
      </View>
    </ScrollView>
  )
}

export default SettingNotificationsScreen