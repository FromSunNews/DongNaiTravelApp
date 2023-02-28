import { StyleSheet } from 'react-native'

// Tuan: Trong file này không có color. Color thì tự custom sau.
// Tuan: Và cái này có thể thay đổi cho phù hợp. Hiện tại type chỉ đang là test thôi.
const APP_FONT_SIZE_12 = 12
const APP_FONT_SIZE_14 = 14
const APP_FONT_SIZE_16 = 16
const APP_FONT_SIZE_18 = 18
const APP_FONT_SIZE_22 = 22
const APP_FONT_SIZE_24 = 24
const APP_FONT_SIZE_32 = 32
const APP_FONT_SIZE_40 = 40

const APP_FONT_DECORATION_DASED = 'dashed'
const APP_FONT_DECORATION_DOTTED = 'dotted'
const APP_FONT_DECORATION_DOUBLE = 'double'
const APP_FONT_DECORATION_SOLID = 'solid'

const size = StyleSheet.create({
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
  sz_24: {
    fontSize: APP_FONT_SIZE_24
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

const fonts = {
  normal: {
    bolder: {
      // Title
      h0: { fontFamily: "Roboto-Black", fontSize: APP_FONT_SIZE_40},
      h1: { fontFamily: "Roboto-Black", fontSize: APP_FONT_SIZE_32},
      h2: { fontFamily: "Roboto-Black", fontSize: APP_FONT_SIZE_24},
      h3: { fontFamily: "Roboto-Black", fontSize: APP_FONT_SIZE_22},
      h4: { fontFamily: "Roboto-Black", fontSize: APP_FONT_SIZE_18},
      h5: { fontFamily: "Roboto-Black", fontSize: APP_FONT_SIZE_16},
  
      // Body
      body0: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_18},
      body1: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_16},
      body2: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_14},
      body3: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_12},
  
      // Sub
      sub0: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_14},
      sub1: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_12},
    },
  
    normal: {
      // Title
      h0: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_40},
      h1: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_32},
      h2: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_24},
      h3: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_22},
      h4: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_18},
      h5: { fontFamily: "Roboto-Bold", fontSize: APP_FONT_SIZE_16},
  
      // Body
      body0: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_18},
      body1: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_16},
      body2: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_14},
      body3: { fontFamily: "Roboto-Regular", fontSize: APP_FONT_SIZE_12},
  
      // Sub
      sub0: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_14},
      sub1: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_12},
    },
  
    lighter: {
      // Title
      h0: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_40},
      h1: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_32},
      h2: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_24},
      h3: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_22},
      h4: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_18},
      h5: { fontFamily: "Roboto-Medium", fontSize: APP_FONT_SIZE_16},
  
      // Body
      body0: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_18},
      body1: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_16},
      body2: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_14},
      body3: { fontFamily: "Roboto-Light", fontSize: APP_FONT_SIZE_12},
  
      // Sub
      sub0: { fontFamily: "Roboto-Thin", fontSize: APP_FONT_SIZE_14},
      sub1: { fontFamily: "Roboto-Thin", fontSize: APP_FONT_SIZE_12},
    }
  },

  italic: {
    bolder: {
      // Title
      h0: { fontFamily: "Roboto-BlackItalic", fontSize: APP_FONT_SIZE_40},
      h1: { fontFamily: "Roboto-BlackItalic", fontSize: APP_FONT_SIZE_32},
      h2: { fontFamily: "Roboto-BlackItalic", fontSize: APP_FONT_SIZE_24},
      h3: { fontFamily: "Roboto-BlackItalic", fontSize: APP_FONT_SIZE_22},
      h4: { fontFamily: "Roboto-BlackItalic", fontSize: APP_FONT_SIZE_18},
      h5: { fontFamily: "Roboto-BlackItalic", fontSize: APP_FONT_SIZE_16},
  
      // Body
      body0: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_18},
      body1: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_16},
      body2: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_14},
      body3: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_12},
  
      // Sub
      sub0: { fontFamily: "Roboto-Italic", fontSize: APP_FONT_SIZE_14},
      sub1: { fontFamily: "Roboto-Italic", fontSize: APP_FONT_SIZE_12},
    },
  
    normal: {
      // Title
      h0: { fontFamily: "Roboto-BoldItalic", fontSize: APP_FONT_SIZE_40},
      h1: { fontFamily: "Roboto-BoldItalic", fontSize: APP_FONT_SIZE_32},
      h2: { fontFamily: "Roboto-BoldItalic", fontSize: APP_FONT_SIZE_24},
      h3: { fontFamily: "Roboto-BoldItalic", fontSize: APP_FONT_SIZE_22},
      h4: { fontFamily: "Roboto-BoldItalic", fontSize: APP_FONT_SIZE_18},
      h5: { fontFamily: "Roboto-BoldItalic", fontSize: APP_FONT_SIZE_16},
  
      // Body
      body0: { fontFamily: "Roboto-Italic", fontSize: APP_FONT_SIZE_18},
      body1: { fontFamily: "Roboto-Italic", fontSize: APP_FONT_SIZE_16},
      body2: { fontFamily: "Roboto-Italic", fontSize: APP_FONT_SIZE_14},
      body3: { fontFamily: "Roboto-Italic", fontSize: APP_FONT_SIZE_12},
  
      // Sub
      sub0: { fontFamily: "Roboto-LightItalic", fontSize: APP_FONT_SIZE_14},
      sub1: { fontFamily: "Roboto-LightItalic", fontSize: APP_FONT_SIZE_12},
    },
  
    lighter: {
      // Title
      h0: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_40},
      h1: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_32},
      h2: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_24},
      h3: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_22},
      h4: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_18},
      h5: { fontFamily: "Roboto-MediumItalic", fontSize: APP_FONT_SIZE_16},
  
      // Body
      body0: { fontFamily: "Roboto-LightItalic", fontSize: APP_FONT_SIZE_18},
      body1: { fontFamily: "Roboto-LightItalic", fontSize: APP_FONT_SIZE_16},
      body2: { fontFamily: "Roboto-LightItalic", fontSize: APP_FONT_SIZE_14},
      body3: { fontFamily: "Roboto-LightItalic", fontSize: APP_FONT_SIZE_12},
  
      // Sub
      sub0: { fontFamily: "Roboto-ThinItalic", fontSize: APP_FONT_SIZE_14},
      sub1: { fontFamily: "Roboto-ThinItalic", fontSize: APP_FONT_SIZE_12},
    }
  }
}

const app_typo = {
  size,
  decoration,
  fonts
}


export default app_typo