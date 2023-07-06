import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons,FontAwesome,MaterialIcons } from 'react-native-vector-icons'
import { selectCurrentSetting} from "redux/setting/SettingSlice";
import { useDispatch, useSelector } from "react-redux";

import styles from './SettingNotificationsScreenStyles'
import DropDown from 'components/drop_down/DropDown'
import { selectCurrentLanguage } from '../../redux/language/LanguageSlice';
import useTheme from 'customHooks/useTheme';
import { withTheme } from 'hocs/withTheme';

const SettingNotificationsScreen = withTheme(({theme}) => {
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.settingNotification

  const currentSetting = useSelector(selectCurrentSetting)
  const dispatch = useDispatch()

  return (
    <ScrollView style={[styles.container,{backgroundColor: theme.background}]}>
      <View style={styles.notification_container}>
        <View style={{...styles.dropdown_container}}>
          <DropDown 
            isMode= {true}
            name={langData.update_from_following[langCode]}
            icon={<Ionicons name="people-outline" size={25}/>}
            idOption={'UPDATE_FROM_FOLLOWING'}
          />
        </View>

       <View style={{...styles.dropdown_container}}>
          <DropDown 
            isMode= {true}
            name={langData.comment[langCode]}
            icon={<FontAwesome name="commenting-o" size={25}/>}
            idOption={'COMMENTS'}
          />
       </View>

        <View style={{...styles.dropdown_container}}> 
          <DropDown 
            isMode= {true}
            name={langData.event[langCode]}
            icon={<MaterialIcons name="event-note" size={25}/>}
            idOption={'EVENTS'}
          />
        </View>
      </View>
    </ScrollView>
  )
})

export default SettingNotificationsScreen