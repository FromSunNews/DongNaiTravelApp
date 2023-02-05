import { StyleSheet } from 'react-native'
import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'
import { fonts } from 'globals/styles/(SKIP) typography'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: app_c.HEX.primary
  },
  content: {
    paddingHorizontal: 18
  },
  textHeader: {
    color: app_c.HEX.fourth,
    marginBottom: 20,
    ...fonts.h1
  },
  image: {
    width: app_dms.screenWidth - 18 * 2,
    height: 260,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  textError: {
    flex: 1,
    color: '#F32424',
    marginTop: 5,
    ...app_typo.body4,
    alignSelf: 'flex-start',
  },
  containerReFor:{
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0,
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
  label: {
    marginLeft: 5,
    ...app_typo.body4,
    padding: 5,
    paddingRight: 0,
  },
  textFor: {
    color: app_c.HEX.fourth,
    ...app_typo.body4,
    padding: 5,
    paddingRight: 0,
  },
  containerFooter: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  labelSocial: {
    marginTop: 20,
    color: app_c.HEX.fourth,
    ...app_typo.body4,
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
    marginTop: 10
  },
  labelNoAccount: {
    color: app_c.HEX.fourth,
    ...app_typo.body4
  },
  labelSignup: {
    padding: 5,
    color: app_c.HEX.third,
    ...app_typo.h5
  },
  smallLabel: {
    ...app_typo.body4,
    color: app_c.HEX.fourth,
    marginBottom: 12,
    marginTop: 20,
  },
  fullname: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerError: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start'
  },
  fillView: {
    flex: 0.05
  },
  terms: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  textRead: {
    ...app_typo.body4,
    color: app_c.HEX.fourth
  },
  textTerms: {
    ...app_typo.h5,
    color: app_c.HEX.third,
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
})