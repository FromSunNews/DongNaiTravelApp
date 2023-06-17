import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import { styles } from './CustomStatusBarStyles';
import useTheme from 'customHooks/useTheme';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/theme/ThemeSlice';

const CustomStatusBar = ({...props }) => {
  const {themeColor,themeMode} = useTheme();
  return(
  <View style={[styles.statusBar, { backgroundColor:themeColor.bg_second }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={themeColor.bg_second} barStyle = {themeMode === 'light' ? "dark-content" : "light-content"} {...props} />
    </SafeAreaView>
  </View>)
}

export default CustomStatusBar