import { View, Text } from 'react-native'
import React from 'react'
import styles from './AboutScreenStyles'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../redux/language/LanguageSlice'
import useTheme from 'customHooks/useTheme'
import { withTheme } from 'hocs/withTheme'

const AboutScreen = withTheme(({theme}) => {
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.settingAbout
  return (
    <View style={[styles.container,{backgroundColor: theme.background}]}>
      <Text style={[styles.h1,{color: theme.onBackground}]}>DONGNAI TRAVEL</Text>
      <Text style={styles.text_version}>{langData.about_version[langCode]}{" "}1.0.0</Text>
    </View>
  )
})

export default AboutScreen