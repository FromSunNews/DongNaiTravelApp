import { app_c, app_sh, app_sp, app_typo } from 'globals/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  iconSearch: {
    paddingTop: 15,
    paddingLeft: 15
  },
  iconFilter: {
    paddingTop: 15,
    paddingHorizontal: 12
  },
  iconBack: {
    paddingTop: 13,
    paddingLeft: 15
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
  listView: {
    backgroundColor: app_c.HEX.primary,
  },
  predefinedPlacesDescription: {
    ...app_typo.fonts.h5,
    color: app_c.HEX.third,
  },
  overlayBtn: {
    position: 'absolute',
    height: 52,
    top: 0,
    right:40,
    left: 40,
    ...app_sh.rounded_8
  }

})