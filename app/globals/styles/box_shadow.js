import { StyleSheet } from 'react-native'

import app_c from './colors'

const app_shdw = StyleSheet.create({
  type_1: {
    shadowColor: app_c.HEX.fourth,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 3.4,
    elevation: 4,
  },
  type_1_dark: {
    shadowColor: app_c.HEX_DARK.fourth,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 3.4,
    elevation: 4,
  },

  // Phuong: https://ethercreative.github.io/react-native-shadow-generator/
  type_2: {
    shadowColor: app_c.HEX.fourth,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 6,
  },
  
  type_3: {
    shadowColor: app_c.HEX.fourth,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5.46,
    elevation: 9,
  },

  type_4: {
    shadowColor: app_c.HEX.fourth,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 7.49,
    elevation: 12,
  },

  type_5: {
    shadowColor: app_c.HEX.fourth,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  }
})

export default app_shdw