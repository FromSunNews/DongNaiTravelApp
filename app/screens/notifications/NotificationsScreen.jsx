import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons,FontAwesome,MaterialIcons } from 'react-native-vector-icons'

import styles from './NotificationsScreenStyles'
import DropDown from 'components/drop_down/DropDown'

const NotificationsScreen = () => {
  return (
    <ScrollView style="container">
      <View style={styles.notification_container}>
        <View style={{...styles.dropdown_container}}>
          <DropDown 
            isMode= {true}
            name={"Update from following"}
            icon={<Ionicons name="people-outline" size={25}/>}
          />
        </View>

       <View style={{...styles.dropdown_container}}>
          <DropDown 
            isMode= {true}
            name={"Comments"}
            icon={<FontAwesome name="commenting-o" size={25}/>}
          />
       </View>

        <View style={{...styles.dropdown_container}}> 
          <DropDown 
            isMode= {true}
            name={"Events"}
            icon={<MaterialIcons name="event-note" size={25}/>}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default NotificationsScreen