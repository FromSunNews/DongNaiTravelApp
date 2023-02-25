import { app_c, app_sh, app_sp } from 'globals/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  iconSearch: {
    marginTop: 15,
    marginLeft: 15
  },
  iconBack: {
    marginTop: 13,
    marginLeft: 15
  },
  textContainer: {
  },
  textSearch: {
    color: app_c.HEX.fourth,
    fontSize: 16,
    marginTop: 3,
    paddingVertical: 0,
    backgroundColor: app_c.HEX.primary,
  },
  row: {
    backgroundColor: app_c.HEX.primary,
  },
  poweredContainer: {
    backgroundColor: app_c.HEX.primary,
  },
  overlayBtn: {
    position: 'absolute',
    width: '100%',
    height: 52,
    top: 0,
    right: 0,
    left: 50,
    ...app_sh.rounded_8
  }

})