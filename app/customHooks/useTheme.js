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
  const dispatch = useDispatch();

  return {
    theme,
    toggleTheme: function() { return dispatch(toggleThemeState()) }
  }
}

const { theme } = useTheme();