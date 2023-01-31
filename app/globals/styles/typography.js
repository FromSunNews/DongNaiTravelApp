import { StyleSheet } from 'react-native'

// Tuan: Trong file này không có color. Color thì tự custom sau.
// Tuan: Và cái này có thể thay đổi cho phù hợp. Hiện tại type chỉ đang là test thôi.
const APP_FONT_SIZE_1 = 7
const APP_FONT_SIZE_2 = 9
const APP_FONT_SIZE_3 = 12
const APP_FONT_SIZE_4 = 14
const APP_FONT_SIZE_5 = 16
const APP_FONT_SIZE_6 = 18
const APP_FONT_SIZE_7 = 22
const APP_FONT_SIZE_8 = 32
const APP_FONT_SIZE_9 = 40

const APP_FONT_DECORATION_DASED = 'dashed'
const APP_FONT_DECORATION_DOTTED = 'dotted'
const APP_FONT_DECORATION_DOUBLE = 'double'
const APP_FONT_DECORATION_SOLID = 'solid'

const size = StyleSheet.create({
  sz_1: {
    fontSize: APP_FONT_SIZE_1
  },
  sz_2: {
    fontSize: APP_FONT_SIZE_2
  },
  sz_3: {
    fontSize: APP_FONT_SIZE_3
  },
  sz_4: {
    fontSize: APP_FONT_SIZE_4
  },
  sz_5: {
    fontSize: APP_FONT_SIZE_5
  },
  sz_6: {
    fontSize: APP_FONT_SIZE_6
  },
  sz_7: {
    fontSize: APP_FONT_SIZE_7
  },
  sz_8: {
    fontSize: APP_FONT_SIZE_8
  },
  sz_9: {
    fontSize: APP_FONT_SIZE_9
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

export const fonts = StyleSheet.create({
  h0: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_9},
  h1: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_8, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_7, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_6, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_5, lineHeight: 20 },
  h5: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_4, lineHeight: 18 },
  h6: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_3, lineHeight: 18 },
  h7: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_2, lineHeight: 16 },
  h8: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_1, lineHeight: 16 },
  body1: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_7, lineHeight: 30 },
  body2: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_6, lineHeight: 22 },
  body3: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_5, lineHeight: 20 },
  body4: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_4, lineHeight: 18 },
  body5: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_3, lineHeight: 18 },
  body6: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_2, lineHeight: 16 },
  body7: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_1, lineHeight: 16 },
})

const app_typo = {
  ...size,
  ...decoration
}


export default app_typo