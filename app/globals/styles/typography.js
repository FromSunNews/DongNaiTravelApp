import { StyleSheet } from 'react-native'

// Tuan: Trong file này không có color. Color thì tự custom sau.
// Tuan: Và cái này có thể thay đổi cho phù hợp. Hiện tại type chỉ đang là test thôi.
const APP_FONT_SIZE_7 = 7
const APP_FONT_SIZE_9 = 9
const APP_FONT_SIZE_12 = 12
const APP_FONT_SIZE_14 = 14
const APP_FONT_SIZE_16 = 16
const APP_FONT_SIZE_18 = 18
const APP_FONT_SIZE_22 = 22
const APP_FONT_SIZE_32 = 32
const APP_FONT_SIZE_40 = 40

const APP_FONT_DECORATION_DASED = 'dashed'
const APP_FONT_DECORATION_DOTTED = 'dotted'
const APP_FONT_DECORATION_DOUBLE = 'double'
const APP_FONT_DECORATION_SOLID = 'solid'

const size = StyleSheet.create({
  sz_7: {
    fontSize: APP_FONT_SIZE_7
  },
  sz_9: {
    fontSize: APP_FONT_SIZE_9
  },
  sz_12: {
    fontSize: APP_FONT_SIZE_12
  },
  sz_14: {
    fontSize: APP_FONT_SIZE_14
  },
  sz_16: {
    fontSize: APP_FONT_SIZE_16
  },
  sz_18: {
    fontSize: APP_FONT_SIZE_18
  },
  sz_22: {
    fontSize: APP_FONT_SIZE_22
  },
  sz_32: {
    fontSize: APP_FONT_SIZE_32
  },
  sz_40: {
    fontSize: APP_FONT_SIZE_40
  }
})

const decoration = StyleSheet.create({
  deco_dashed: {
    textDecorationStyle: APP_FONT_DECORATION_DASED
  },
  deco_dotted: {
    textDecorationStyle: APP_FONT_DECORATION_DOTTED
  },
  deco_double: {
    textDecorationStyle: APP_FONT_DECORATION_DOUBLE
  },
  deco_solid: {
    textDecorationStyle: APP_FONT_DECORATION_SOLID
  }
})

export const fonts = {
  h0: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_40},
  h1: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_32 },
  h2: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_22 },
  h3: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_18 },
  h4: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_16 },
  h5: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_14 },
  body1: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_14 },
  body2: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_12 },
  body3: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_9 },
  body4: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_7 },
  sub1: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_12 },
  sub1: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_9 },
  sub1: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_7 },
  introText: { fontFamily: "Roboto-BoldItalic", fontSize: 40, lineHeight: 40 },
}

const app_typo = {
  ...size,
  ...decoration,
  ...fonts
}


export default app_typo