import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'

import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: app_c.HEX.primary,
    paddingBottom: 20
  },
  content: {
    paddingHorizontal: 18
  },
  image: {
    width: app_dms.screenWidth - 18 * 2,
    height: 260,
    resizeMode: 'contain'
  },
  textHeader: {
    color: app_c.HEX.fourth,
    marginBottom: 20,
    ...app_typo.fonts.normal.bolder.h1
  },
  textError: {
    flex: 1,
    color: '#F32424',
    marginTop: 5,
    ...app_typo.fonts.normal.normal.body1,
    alignSelf: 'flex-start',
  },
  label: {
    marginLeft: 5,
    ...app_typo.body4,
    padding: 5,
    paddingRight: 0,
  },
  smallLabel: {
    ...app_typo.fonts.normal.normal.body1,
    color: app_c.HEX.fourth,
    marginBottom: 0,
    marginTop: 30,
  }
})