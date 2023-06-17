import { app_c, app_sh, app_sp, app_typo } from "globals/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  aboardingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18
  },
  nameBot: {
    color: app_c.HEX.sub_third,
    ...app_typo.fonts.normal.bolder.h2,
    textAlign: "center",
    marginBottom: 12
  },
  avatarImg: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  textIntroduce: {
    color: app_c.HEX.primary,
    ...app_typo.fonts.normal.bolder.h4,
    textAlign: "center",
    marginBottom: 24,
    marginTop: 10
  },
  btnAction: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    ...app_sh.capsule,
    backgroundColor: app_c.HEX.third
  },
  textBtnAction: {
    color: app_c.HEX.primary,
    ...app_typo.fonts.normal.bolder.h5,
  },
  modalContainer: {
    paddingHorizontal: 18,
    paddingVertical: 42,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000096',
    ...app_sh.rounded_6
  }
})

export default styles