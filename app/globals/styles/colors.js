import { StyleSheet } from 'react-native'

// Tuan: Palette màu chính
const APP_PRIMARY_COLOR = {
  HEX: '#F9F7F7',
  RGB: '249, 247, 247'
}
const APP_SECOND_COLOR = {
  HEX: '#DBE2EF',
  RGB: '219, 226, 239'
}
const APP_THIRD_COLOR = {
  HEX: '#3F72AF',
  RGB: '63, 114, 175'
}
const APP_FOURTH_COLOR = {
  HEX: '#112D4E',
  RGB: '17, 45, 78'
}

// Tuan: Palette màu phụ
const APP_SUB_PRIMARY_COLOR = {
	HEX: '#F7FBFC',
	RGB: '247, 251, 252'
}
const APP_SUB_SECOND_COLOR = {
	HEX: '#D6E6F2',
	RGB: '214, 230, 242'
}
const APP_SUB_THIRD_COLOR = {
	HEX: '#B9D7EA',
	RGB: '185, 215, 234'
}
const APP_SUB_FOURTH_COLOR = {
	HEX: '#769FCD',
	RGB: '118, 159, 205'
}

// Tuan: Màu mở rộng
const APP_EXT_PRIMARY_COLOR = {
	HEX: '#ECECEC',
	RGB: '236, 236, 236'
}
const APP_EXT_SECOND_COLOR = {
	HEX: '#5F6C7C',
	RGB: '95, 108, 124'
}

// ==========================
// ===== CODE SEPERATOR =====
// ==========================

const HEX = {
	primary: APP_PRIMARY_COLOR.HEX,
	second: APP_SECOND_COLOR.HEX,
	third: APP_THIRD_COLOR.HEX,
	fourth: APP_FOURTH_COLOR.HEX,
	sub_primary: APP_SUB_PRIMARY_COLOR.HEX,
	sub_second: APP_SUB_SECOND_COLOR.HEX,
	sub_third: APP_SUB_THIRD_COLOR.HEX,
	sub_fourth: APP_SUB_FOURTH_COLOR.HEX,
	ext_primary: APP_EXT_PRIMARY_COLOR.HEX,
	ext_second: APP_EXT_SECOND_COLOR.HEX
}
const RGB = {
	primary: APP_PRIMARY_COLOR.RGB,
	second: APP_SECOND_COLOR.RGB,
	third: APP_THIRD_COLOR.RGB,
	fourth: APP_FOURTH_COLOR.RGB,
	sub_primary: APP_SUB_PRIMARY_COLOR.RGB,
	sub_second: APP_SUB_SECOND_COLOR.RGB,
	sub_third: APP_SUB_THIRD_COLOR.RGB,
	sub_fourth: APP_SUB_FOURTH_COLOR.RGB,
	ext_primary: APP_EXT_PRIMARY_COLOR.RGB,
	ext_second: APP_EXT_SECOND_COLOR.RGB
}

const app_c = {
	HEX,
	RGB
}

export default app_c

/*
const HEX = StyleSheet.create({
	primary: {
	  color: APP_PRIMARY_COLOR.HEX
	},
	second: {
		color: APP_SECOND_COLOR.HEX
	},
	third: {
		color: APP_THIRD_COLOR.HEX
	},
	fourth: {
		color: APP_FOURTH_COLOR.HEX
	},
	sub_primary: {
	  color: APP_SUB_PRIMARY_COLOR.HEX
	},
	sub_second: {
		color: APP_SUB_SECOND_COLOR.HEX
	},
	sub_third: {
		color: APP_SUB_THIRD_COLOR.HEX
	},
	sub_fourth: {
		color: APP_SUB_FOURTH_COLOR.HEX
	},
	ext_primary: {
	  color: APP_EXT_PRIMARY_COLOR.HEX
	},
	ext_second: {
		color: APP_EXT_SECOND_COLOR.HEX
	}
});

const RGB = StyleSheet.create({
	primary: {
	  color: APP_PRIMARY_COLOR.RGB
	},
	second: {
		color: APP_SECOND_COLOR.RGB
	},
	third: {
		color: APP_THIRD_COLOR.RGB
	},
	fourth: {
		color: APP_FOURTH_COLOR.RGB
	},
	sub_primary: {
	  color: APP_SUB_PRIMARY_COLOR.RGB
	},
	sub_second: {
		color: APP_SUB_SECOND_COLOR.RGB
	},
	sub_third: {
		color: APP_SUB_THIRD_COLOR.RGB
	},
	sub_fourth: {
		color: APP_SUB_FOURTH_COLOR.RGB
	},
	ext_primary: {
	  color: APP_EXT_PRIMARY_COLOR.RGB
	},
	ext_second: {
		color: APP_EXT_SECOND_COLOR.RGB
	}
});
*/

// const app_c =  {
// 	HEX,
// 	RGB
// };