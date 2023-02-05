import { app_c } from 'globals/styles'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 48,
    marginTop: 20,
  },
  label: {
    paddingHorizontal: 6,
    backgroundColor: app_c.HEX.primary
  },
  input: {
    color: app_c.HEX.fourth,
    paddingHorizontal: 4,
    backgroundColor: app_c.HEX.primary
  },
  icon: {
    padding: 4
  }
})