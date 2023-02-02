import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'
import { fonts } from 'globals/styles/typography'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: app_c.HEX.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...fonts.introText,
    color: app_c.HEX.fourth
  }
})