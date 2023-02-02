import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'
import { fonts } from 'globals/styles/typography'
import { StyleSheet } from 'react-native'
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
    color: '#F32424',
    marginTop: 5,
    ...app_typo.body4
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
  btn: {
    width: '100%',
    backgroundColor: app_c.HEX.fourth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    ...app_sh.rounded_8,
    height: 48
  },
  labelButton: {
    color: app_c.HEX.primary,
    ...app_typo.h3
  },
  containerFooter: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
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
  }
})