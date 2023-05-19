import { createSlice } from "@reduxjs/toolkit";
import { app_c } from "globals/styles";

//Pháp: khởi tạo giá trị mode của giao diện trong redux
const initialState = {
  mode: "light",
  styles: {
    light: app_c.HEX,
    dark: app_c.HEX_DARK,
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => ({
      ...state,
      mode: state.mode === "light" ? "dark" : "light",
    }),
  },
});

export const selectCurrentMode = (state) => {
  return state.theme;
};
export const selectCurrentStyles = (state) => {
  return state.styles;
};

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
