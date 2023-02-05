import { app_c, app_dms, app_sh, app_typo } from 'globals/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'red',
    opacity: 0.2
  },
  bottomSheetContainer: {
    borderRadius: 24,
    backgroundColor: 'red'
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
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
    marginHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: app_c.HEX.fourth,
    marginTop: 20,
    ...app_sh.capsule
  },
  btnText: {
    ...app_typo.sz_4,
    color: app_c.HEX.primary,
    fontWeight: '600'
  }
})