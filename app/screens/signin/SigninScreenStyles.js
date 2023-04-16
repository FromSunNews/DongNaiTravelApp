import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: app_c.HEX.primary,
  },
  content: {
    paddingHorizontal: 18
  },
  textHeader: {
    color: app_c.HEX.fourth,
    marginBottom: 20,
    ...app_typo.fonts.normal.title.h3
  },
  image: {
    width: app_dms.screenWidth - 18 * 2,
    height: app_dms.screenHeight * 30 / 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  textError: {
    color: '#F32424',
    marginTop: 5,
    ...app_typo.fonts.normal.normal.h5
  },
  containerReFor:{
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  containerRe: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20
  },
  textFor: {
    color: app_c.HEX.third,
    ...app_typo.fonts.normal.bolder.h5,
    padding: 5,
    paddingRight: 0,
  },
  containerFooter: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  signInAsGuest: {
    marginTop: 10,
    padding: 5,
    color: app_c.HEX.third,
    ...app_typo.fonts.normal.bolder.h5
  },
  labelSocial: {
    marginTop: 5,
    color: app_c.HEX.fourth,
    ...app_typo.fonts.normal.normal.body1,
    alignSelf: 'center',
  },
  containerSocialBtn:{
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSocial: {
    height: 30,
    width: 30,
  },
  containerSignup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:40
  },
  labelNoAccount: {
    color: app_c.HEX.fourth,
    ...app_typo.fonts.normal.normal.body1
  },
  labelSignup: {
    padding: 5,
    color: app_c.HEX.third,
    ...app_typo.fonts.normal.bolder.h5
  }
})