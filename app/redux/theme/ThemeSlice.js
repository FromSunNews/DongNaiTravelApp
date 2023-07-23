import { createSlice } from "@reduxjs/toolkit";
import { themes } from "globals/styles/theme";
import { app_c } from "globals/styles";

//Pháp: khởi tạo giá trị mode của giao diện trong redux
const initialState = {
  /**
   * @type {keyof themes}
   */
  mode: "light",
  styles: {
    light: themes.light,
    dark: themes.dark,
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeState: (state) => ({
      ...state,
      mode: state.mode === "light" ? "dark" : "light",
    }),
  },
});

/**
 * Hàm này để chọn ra theme của một object.
 * @param state 
 * @param {keyof themes} themeName tên của theme.
 * @returns {themes[keyof themes]}
 */
export const themeSelector = function (state, themeName) {
  return state.theme.styles[themeName];
}

/**
 * Hàm Hàm này trả về tên của theme hiện tại.
 * @param state 
 * @returns {keyof themes}
 */
export const themeNameSelector = function (state) {
  return state.theme.mode;
}

/**
 * Hàm này dùng để lấy ra theme hiện tại.
 * @param state 
 * @returns 
 */
export const currentThemeSelector = function (state) {
  /**
   * @type {themes[keyof themes]}
   */
  let style = state.theme.styles[themeNameSelector(state)]
   return style
}

// export const selectCurrentMode = (state) => {
//   return state.theme;
// };
// export const selectCurrentStyles = (state) => {
//   return state.styles;
// };

export const { toggleThemeState } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
