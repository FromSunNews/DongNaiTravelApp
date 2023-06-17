import { StyleSheet } from "react-native";

// Tuan: Palette màu chính
const APP_PRIMARY = {
  HEX: "#F9F7F7",
  RGB: "250, 250, 250",
  HEX_DARK: "#112D4E",
};
const APP_SECOND = {
  HEX: "#DBE2EF",
  RGB: "219, 226, 239",
  HEX_DARK: "#3F72AF",
};
const APP_THIRD = {
  HEX: "#3F72AF",
  RGB: "63, 114, 175",
  HEX_DARK: "#DBE2EF",
};
const APP_FOURTH = {
  HEX: "#112D4E",
  RGB: "17, 45, 78",
  HEX_DARK: "#F9F7F7",
};

// Tuan: Palette màu phụ
const SUB_PRIMARY = {
  HEX: "#F7FBFC",
  RGB: "247, 251, 252",
  HEX_DARK: "#769FCD",
};
const SUB_SECOND = {
  HEX: "#D6E6F2",
  RGB: "214, 230, 242",
  HEX_DARK: "#B9D7EA",
};
const SUB_THIRD = {
  HEX: "#B9D7EA",
  RGB: "185, 215, 234",
  HEX_DARK: "#D6E6F2",
};
const SUB_FOURTH = {
  HEX: "#769FCD",
  RGB: "118, 159, 205",
  HEX_DARK: "#F7FBFC",
};

// Tuan: Màu mở rộng
const EXT_PRIMARY = {
  HEX: "#ECECEC",
  RGB: "236, 236, 236",
  HEX_DARK: "#ECECEC",
};
const EXT_SECOND = {
  HEX: "#5F6C7C",
  RGB: "95, 108, 124",
  HEX_DARK: "#5F6C7C",
};
const EXT_THIRD = {
  HEX: "#B4B4B4",
  RGB: "180, 180, 180",
  HEX_DARK: "#B4B4B4",
};

// ===== COLOR BUTTON TAB =====
const BG_GROUP_BUTTON_TAB = {
  HEX: "#112D4E",
  RGB: "180, 180, 180",
  HEX_DARK: "#232323",
};
const ACTIVE_GROUP_BUTTON_TAB = {
  HEX: "#FFFFFF",
  RGB: "180, 180, 180",
  HEX_DARK: "#FFFFFF",
};
const UNACTIVE_GROUP_BUTTON_TAB = {
  HEX: "#B4B4B4",
  RGB: "180, 180, 180",
  HEX_DARK: "#B4B4B4",
};
const MAP_DOT_GROUP_BUTTON_TAB = {
  HEX: "#FFFFFF",
  RGB: "180, 180, 180",
  HEX_DARK: "#FFFFFF",
};
const MAP_MID_GROUP_BUTTON_TAB = {
  HEX: '#3F72AF',
  RGB: "63, 114, 175",
  HEX_DARK: BG_GROUP_BUTTON_TAB.HEX_DARK,
};
const MAP_BORDER_GROUP_BUTTON_TAB = {
  HEX: "#D9D9D9",
  RGB: "63, 114, 175",
  HEX_DARK: "#FAFAFA",
};

// ===== COLOR BACKGROUND =====
const BG_PRIMARY = {
  HEX: "#D9D9D9",
  HEX_DARK: "#000000",
};
const BG_SECOND = {
  HEX: "#FFFFFF",
  HEX_DARK: "#1C1C1E",
};
const BG_TERTIARY = {
  HEX: "#EFEFF4",
  HEX_DARK: "#2C2C2E",
};
// ===== COLOR STATUS =====
const APP_DONE = {
  HEX: "#32D74B",
  HEX_DARK: "#32D74B",
};
const APP_ERROR = {
  HEX: "#FF453A",
  HEX_DARK: "#FF453A",
};
const APP_WAIT = {
  HEX: "#FF9500",
  HEX_DARK: "#FF9500",
};

// ===== CODE SEPERATOR =====
const SEPERATOR = {
  HEX: "#38383A",
  HEX_DARK: "#EFEFF4",
};
// ==========================
const HEX = {
  //background
  bg_primary: BG_PRIMARY.HEX,
  bg_second: BG_SECOND.HEX,
  bg_tertiary: BG_TERTIARY.HEX,
  //seperator
  seperator: SEPERATOR.HEX,
  //color
  primary: APP_PRIMARY.HEX,
  second: APP_SECOND.HEX,
  third: APP_THIRD.HEX,
  fourth: APP_FOURTH.HEX,
  sub_primary: SUB_PRIMARY.HEX,
  sub_second: SUB_SECOND.HEX,
  sub_third: SUB_THIRD.HEX,
  sub_fourth: SUB_FOURTH.HEX,
  ext_primary: EXT_PRIMARY.HEX,
  ext_second: EXT_SECOND.HEX,
  ext_third: EXT_THIRD.HEX,
  //group-button-tab
  bg_tab: BG_GROUP_BUTTON_TAB.HEX,
  active_tab: ACTIVE_GROUP_BUTTON_TAB.HEX,
  dot_tab: MAP_DOT_GROUP_BUTTON_TAB.HEX,
  unactive_tab: UNACTIVE_GROUP_BUTTON_TAB.HEX,
  mid_map_tab: MAP_MID_GROUP_BUTTON_TAB.HEX,
  border_map_tab: MAP_BORDER_GROUP_BUTTON_TAB.HEX,
};
const HEX_DARK = {
  //background
  bg_primary: BG_PRIMARY.HEX_DARK,
  bg_second: BG_SECOND.HEX_DARK,
  bg_tertiary: BG_TERTIARY.HEX_DARK,
  //seperator
  seperator: SEPERATOR.HEX_DARK,
  //colorb  
  primary: APP_PRIMARY.HEX_DARK,
  second: APP_SECOND.HEX_DARK,
  third: APP_THIRD.HEX_DARK,
  fourth: APP_FOURTH.HEX_DARK,
  sub_primary: SUB_PRIMARY.HEX_DARK,
  sub_second: SUB_SECOND.HEX_DARK,
  sub_third: SUB_THIRD.HEX_DARK,
  sub_fourth: SUB_FOURTH.HEX_DARK,
  ext_primary: EXT_PRIMARY.HEX_DARK,
  ext_second: EXT_SECOND.HEX_DARK,
  ext_third: EXT_THIRD.HEX_DARK,
  //group-button-tab
  bg_tab: BG_GROUP_BUTTON_TAB.HEX_DARK,
  active_tab: ACTIVE_GROUP_BUTTON_TAB.HEX_DARK,
  dot_tab: MAP_DOT_GROUP_BUTTON_TAB.HEX_DARK,
  unactive_tab: UNACTIVE_GROUP_BUTTON_TAB.HEX_DARK,
  mid_map_tab: MAP_MID_GROUP_BUTTON_TAB.HEX_DARK,
  border_map_tab: MAP_BORDER_GROUP_BUTTON_TAB.HEX_DARK,
};

const RGB = {
  primary: APP_PRIMARY.RGB,
  second: APP_SECOND.RGB,
  third: APP_THIRD.RGB,
  fourth: APP_FOURTH.RGB,
  sub_primary: SUB_PRIMARY.RGB,
  sub_second: SUB_SECOND.RGB,
  sub_third: SUB_THIRD.RGB,
  sub_fourth: SUB_FOURTH.RGB,
  ext_primary: EXT_PRIMARY.RGB,
  ext_second: EXT_SECOND.RGB,
  xt_third: EXT_THIRD.RGB,
};

const app_c = {
  HEX,
  RGB,
  HEX_DARK,
};

export default app_c;
