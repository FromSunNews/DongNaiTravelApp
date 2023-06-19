import { useSelector } from "react-redux";
import { selectCurrentMode } from "redux/theme/ThemeSlice";


const useTheme = () => {
	 //lay ra mode hien tai :{mode: light || dark}
	const mode = useSelector(selectCurrentMode).mode 	
	//lay css tra ve tu store
	const styles = useSelector((state) => state.theme.styles)
	const getStyle = () => {
		return {
			themeColor: styles[mode],
			themeMode: mode
		} //tra ve css: styles[light || dark]
	}
	
	return getStyle();
}

export default useTheme;