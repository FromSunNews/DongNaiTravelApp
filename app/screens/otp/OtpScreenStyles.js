import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'

import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18
  },  
  containerAvoidView: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 18
  },
  textHeader: {
    marginBottom: 0,
    marginTop: Constants.statusBarHeight,
    alignSelf: 'flex-start'
  },
  image: {
    width: app_dms.screenWidth - 18 * 2,
    height: 260,
    resizeMode: 'contain'
  },
  label: {
    marginBottom: 30
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
    textAlign: 'center'
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
  }, 
  btnChangeResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  textResend: {
    alignItems: 'center'
  }
})