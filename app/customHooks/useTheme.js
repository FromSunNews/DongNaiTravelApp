import { useSelector, useDispatch } from "react-redux";
import {
	themeNameSelector,
  themeSelector,
  currentThemeSelector,
  toggleThemeState
} from "redux/theme/ThemeSlice";

/**
 * Hook này trả về `theme` và `toggleTheme`
 * @returns 
 */
export function useTheme() {
  const theme = useSelector(currentThemeSelector);
  const themeMode = useSelector(themeNameSelector);
  const dispatch = useDispatch();

  return {
    theme,
    themeMode,
    toggleTheme: function() { return dispatch(toggleThemeState()) }
  }
}