import { StyleSheet } from 'react-native'

const app_shdw = {
  type_1: {
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 4 },
  },

  // Phuong: https://ethercreative.github.io/react-native-shadow-generator/
  type_2: {
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  type_3: {
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 9,
  },
  type_4: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  }
}

export default app_shdw;