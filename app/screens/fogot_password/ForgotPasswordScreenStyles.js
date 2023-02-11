import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'

import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  containerScrollView: {
    backgroundColor: app_c.HEX.primary,
    flex: 1
  },  
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: app_c.HEX.primary,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 18
  },
  textHeader: {
    color: app_c.HEX.fourth,
    marginBottom: 20,
    ...app_typo.fonts.h1
  },
  textInfo: {
    color: app_c.HEX.fourth,
    ...app_typo.fonts.body4,
  },
  image: {
    width: app_dms.screenWidth - 18 * 2,
    height: 260,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  textError: {
    color: '#F32424',
    marginTop: 5,
    ...app_typo.fonts.body5
  },
  containerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 20,
  },
  labelSignin: {
    padding: 5,
    color: app_c.HEX.third,
    ...app_typo.fonts.h5
  }
})