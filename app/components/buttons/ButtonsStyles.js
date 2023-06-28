import { StyleSheet } from "react-native"

import { themes } from "globals/styles/theme";
import { app_c, app_sh, app_sp } from "globals/styles";

/**
 * Hàm này dùng để lấy trong màu cho buttons theo type. Một button sẽ có 3 loại cặp màu
 * `active`, `inactive` và một màu đặc biệt là disable.
 * - `active`: là màu của button khi được focus, press hoặc checked.
 * - `inactive`: là màu bình thường của button.
 * Hiện tại thì mình có 3 màu phân cấp là primary, secondary và tertiary => 3 types. Nên
 * `active` và `inactive` sẽ có 3 types (riêng disable chỉ có 1).
 * 
 * Và một button sẽ có một cặp màu như sau (nếu chỉ tính một loại cặp màu):
 * - `label`: nhãn của button, gồm chữ và icon...
 * - `background`: màu nền của button...
 * @param {"light" | "dark"} themeMode
 */
export function getButtonColors(themeMode) {
  return {
    disable: {
      type_1: {
        lbl: themes[themeMode].onSubOutline,
        btn: themes[themeMode].onSecondary
      }
    },
    active: {
      type_1: {
        lbl: themes[themeMode].onPrimary,
        btn: themes[themeMode].primary
      },
      type_2: {
        lbl: themes[themeMode].onSecondary,
        btn: themes[themeMode].secondary
      },
      type_3: {
        lbl: themes[themeMode].onTertiary,
        btn: themes[themeMode].tertiary
      },
      type_4: {
        lbl: themes[themeMode].background,
        btn: themes[themeMode].onBackground
      }
    },
    inactive: {
      type_1: {
        lbl: themes[themeMode].primary,
        btn: themes[themeMode].onPrimary
      },
      type_2: {
        lbl: themes[themeMode].secondary,
        btn: themes[themeMode].onSecondary
      },
      type_3: {
        lbl: themes[themeMode].tertiary,
        btn: themes[themeMode].onTertiary
      },
      type_4: {
        lbl: themes[themeMode].onBackground,
        btn: themes[themeMode].background
      }
    }
  }
}

const styles = StyleSheet.create({
  btn_inactive: {
    backgroundColor: app_c.HEX.ext_primary
  },

  btn_disable: {
    backgroundColor: app_c.HEX.ext_primary,
  },

  lbl_disable: {
    color: app_c.HEX.ext_third
  },

  btn_active_type_1: {
    backgroundColor: app_c.HEX.fourth
  },

  btn_active_type_1_dark: {
    backgroundColor: app_c.HEX_DARK.fourth,
  },

  lbl_active_type_1: {
    color: app_c.HEX.primary
  },
  
  lbl_active_type_1_dark: {
    color: app_c.HEX.fourth
  },

  btn_active_type_2: {
    backgroundColor: app_c.HEX.third
  },

  lbl_active_type_2: {
    color: app_c.HEX.primary
  },

  btn_default_type_1: {
    backgroundColor: app_c.HEX.bg_second
  },
  btn_default_type_1_dark: {
    backgroundColor: app_c.HEX_DARK.bg_second
  },
  btn_default_type_1_dark: {
    backgroundColor: app_c.HEX_DARK.bg_tertiary
  },

  lbl_default_type_1: {
    color: app_c.HEX.fourth
  },

  btn_default_type_2: {
    backgroundColor: app_c.HEX.primary
  },

  btn_default_type_2_dark: {
    backgroundColor: app_c.HEX_DARK.primary
  },

  lbl_default_type_2: {
    color: app_c.HEX.fourth
  },

  btn_default_type_3: {
    backgroundColor: app_c.HEX.bg_tertiary
  },
  btn_default_type_3_dark: {
    backgroundColor: app_c.HEX_DARK.bg_tertiary
  },

  lbl_default_type_3: {
    color: app_c.HEX.fourth
  },

  btn_default_type_4: {
    backgroundColor: app_c.HEX.fourth
  },

  lbl_default_type_4: {
    color: app_c.HEX.primary
  },

  btn_default_type_5: {
    backgroundColor: app_c.HEX.third
  },

  lbl_default_type_5: {
    color: app_c.HEX.primary
  },
  ///btn card-blog
  btn_default_heart: {
    backgroundColor: app_c.HEX.second
  },
  btn_default_heart_dark: {
    backgroundColor: app_c.HEX_DARK.ext_second
  },
  lbl_default_heart: {
    color: app_c.HEX.fourth
  },
  lbl_default_heart_dark: {
    color: app_c.HEX_DARK.third
  },
});

export default styles