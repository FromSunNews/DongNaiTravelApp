import { app_c, app_dms, app_sh, app_shdw, app_sp, app_typo } from 'globals/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.2
  },
  bottomSheetContainer: {
    borderRadius: 24,
    ...app_shdw.type_4
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  bottomView: {
    display: 'flex',
    paddingHorizontal: 18
  },
  textHeader: {
    ...app_typo.sz_6,
    color: app_c.HEX.fourth,
    fontWeight: '600',
    marginTop: 10
  },
  textContent: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
    paddingHorizontal: 18,
    textAlign: 'center',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: app_dms.screenWidth - 32,
    paddingVertical: 14,
    backgroundColor: app_c.HEX.fourth,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 8,
  },
  btnText: {
    ...app_typo.fonts.h4,
    color: app_c.HEX.primary,
    fontWeight: '600'
  },
  headerText: {
    ...app_typo.fonts.h4,
    color: app_c.HEX.fourth,
    marginTop: 20,
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