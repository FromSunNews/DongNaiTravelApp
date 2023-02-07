import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'

import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: app_c.HEX.primary,
    flex: 1,
    paddingHorizontal: 18
  },  
  containerAvoidView: {
    flex: 1,
    backgroundColor: app_c.HEX.primary,
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 18
  },
  textHeader: {
    color: app_c.HEX.fourth,
    marginBottom: 0,
    ...app_typo.fonts.h1,
    marginTop: Constants.statusBarHeight,
    alignSelf: 'flex-start'
  },
  image: {
    width: app_dms.screenWidth - 18 * 2,
    height: 260,
    resizeMode: 'contain'
  },
  label: {
    color: app_c.HEX.fourth,
    ...app_typo.fonts.body4,
    marginBottom: 30,
    alignSelf: 'center'
  },
  textInput: {
    width: 0, 
    height: 0
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  cellText: {
    textAlign: 'center',
    color: app_c.HEX.fourth,
    ...app_typo.fonts.h2
  },
  bottomView: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 60,
  }, 
  btnChangeEmail: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textChange: {
    alignItems: 'center', 
    color: app_c.HEX.third,
    ...app_typo.fonts.h5
  }, 
  btnChangeResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  textResend: {
    alignItems: 'center',
    ...app_typo.fonts.h5
  }
})