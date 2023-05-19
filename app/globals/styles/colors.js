import { StyleSheet } from "react-native";

// Tuan: Palette màu chính
const APP_PRIMARY_COLOR = {
  HEX: "#FAFAFA",
  RGB: "250, 250, 250",
  HEX_DARK: "#1E1E1E",
  //   #151824
};
const APP_SECOND_COLOR = {
  HEX: "#DBE2EF",
  RGB: "219, 226, 239",
  HEX_DARK: "#222738",
  //222738
};
const APP_THIRD_COLOR = {
  HEX: "#3F72AF",
  RGB: "63, 114, 175",
  HEX_DARK: "#FFFFFF",
};
const APP_FOURTH_COLOR = {
  HEX: "#112D4E",
  RGB: "17, 45, 78",
  HEX_DARK: "#FFFFFF",
};

// Tuan: Palette màu phụ
const APP_SUB_PRIMARY_COLOR = {
  HEX: "#F7FBFC",
  RGB: "247, 251, 252",
  HEX_DARK: "#112D4E",
};
const APP_SUB_SECOND_COLOR = {
  HEX: "#D6E6F2",
  RGB: "214, 230, 242",
  HEX_DARK: "#112D4E",
};
const APP_SUB_THIRD_COLOR = {
  HEX: "#B9D7EA",
  RGB: "185, 215, 234",
  HEX_DARK: "#B4B4B4",
};
const APP_SUB_FOURTH_COLOR = {
  HEX: "#769FCD",
  RGB: "118, 159, 205",
  HEX_DARK: "#112D4E",
};

// Tuan: Màu mở rộng
const APP_EXT_PRIMARY_COLOR = {
  HEX: "#ECECEC",
  RGB: "236, 236, 236",
  HEX_DARK: "#222738",
};
const APP_EXT_SECOND_COLOR = {
  HEX: "#5F6C7C",
  RGB: "95, 108, 124",
  HEX_DARK: "#FAFAFA",
};
const APP_EXT_THIRD_COLOR = {
  HEX: "#B4B4B4",
  RGB: "180, 180, 180",
  HEX_DARK: "#FFFFFF",
};
//Phap: mau cho group-button-tab
const APP_EXT_BG_GROUP_BUTTON_TAB = {
  HEX: "#112D4E",
  RGB: "180, 180, 180",
  HEX_DARK: "#232323",
};
const APP_EXT_ACTIVE_GROUP_BUTTON_TAB = {
  HEX: "#FFFFFF",
  RGB: "180, 180, 180",
  HEX_DARK: "#FFFFFF",
};
const APP_EXT_UNACTIVE_GROUP_BUTTON_TAB = {
  HEX: "#B4B4B4",
  RGB: "180, 180, 180",
  HEX_DARK: "#B4B4B4",
};
const APP_EXT_DOT_GROUP_BUTTON_TAB = {
  HEX: "#FFFFFF",
  RGB: "180, 180, 180",
  HEX_DARK: "#FFFFFF",
};
const APP_EXT_MAP_MID_GROUP_BUTTON_TAB = {
  HEX: "#FFFFFF",
  RGB: "63, 114, 175",
  HEX_DARK: "#FFFFFF",
};
const APP_EXT_MAP_BORDER_GROUP_BUTTON_TAB = {
  HEX: "#DBE2EF",
  RGB: "63, 114, 175",
  HEX_DARK: "#FAFAFA",
};

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
  ext_second: APP_EXT_SECOND_COLOR.HEX,
  ext_third: APP_EXT_THIRD_COLOR.HEX,
  //group-button-tab
  ext_bg_tab: APP_EXT_BG_GROUP_BUTTON_TAB.HEX,
  ext_active_tab: APP_EXT_ACTIVE_GROUP_BUTTON_TAB.HEX,
  ext_dot_tab: APP_EXT_DOT_GROUP_BUTTON_TAB.HEX,
  ext_unactive_tab: APP_EXT_UNACTIVE_GROUP_BUTTON_TAB.HEX,
  ext_mid_map_tab: APP_EXT_MAP_MID_GROUP_BUTTON_TAB.HEX,
  ext_border_map_tab: APP_EXT_MAP_BORDER_GROUP_BUTTON_TAB.HEX,
};
const HEX_DARK = {
  primary: APP_PRIMARY_COLOR.HEX_DARK,
  second: APP_SECOND_COLOR.HEX_DARK,
  third: APP_THIRD_COLOR.HEX_DARK,
  fourth: APP_FOURTH_COLOR.HEX_DARK,
  sub_primary: APP_SUB_PRIMARY_COLOR.HEX_DARK,
  sub_second: APP_SUB_SECOND_COLOR.HEX_DARK,
  sub_third: APP_SUB_THIRD_COLOR.HEX_DARK,
  sub_fourth: APP_SUB_FOURTH_COLOR.HEX_DARK,
  ext_primary: APP_EXT_PRIMARY_COLOR.HEX_DARK,
  ext_second: APP_EXT_SECOND_COLOR.HEX_DARK,
  ext_third: APP_EXT_THIRD_COLOR.HEX_DARK,
  //group-button-tab
  ext_bg_tab: APP_EXT_BG_GROUP_BUTTON_TAB.HEX_DARK,
  ext_active_tab: APP_EXT_ACTIVE_GROUP_BUTTON_TAB.HEX_DARK,
  ext_dot_tab: APP_EXT_DOT_GROUP_BUTTON_TAB.HEX_DARK,
  ext_unactive_tab: APP_EXT_UNACTIVE_GROUP_BUTTON_TAB.HEX_DARK,
  ext_mid_map_tab: APP_EXT_MAP_MID_GROUP_BUTTON_TAB.HEX_DARK,
  ext_border_map_tab: APP_EXT_MAP_BORDER_GROUP_BUTTON_TAB.HEX_DARK,
};

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
  ext_second: APP_EXT_SECOND_COLOR.RGB,
  xt_third: APP_EXT_THIRD_COLOR.RGB,
};

const app_c = {
  HEX,
  RGB,
  HEX_DARK,
};

export default app_c;
