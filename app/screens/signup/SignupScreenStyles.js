import { StyleSheet } from 'react-native'
import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'

import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  containerScrollView: {
    paddingTop: 0
  },
  container: {
    flex: 1,
    paddingBottom: 60
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
    height: 260,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  textError: {
    flex: 1,
    color: '#F32424',
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
    ...app_typo.fonts.normal.normal.body1,
    padding: 5,
    paddingRight: 0,
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
    marginTop: 16
  },
  labelNoAccount: {
  },
  labelSignup: {
  },
  smallLabel: {
    ...app_typo.fonts.normal.bolder.h5,
    color: app_c.HEX.ext_second,
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
    alignItems: 'center'
  },
  textRead: {
  },
  textTerms: {
    ...app_typo.fonts.normal.bolder.h5,
    color: app_c.HEX.third,
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  headerText: {
  },
  paragraph: { 
    marginTop: 10, 
    textAlign: 'justify'
  },
  childContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 10
  },
  childContent:{
    marginLeft: 10
  }
})