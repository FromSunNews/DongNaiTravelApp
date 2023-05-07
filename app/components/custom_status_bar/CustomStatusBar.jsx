import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import { styles } from './CustomStatusBarStyles';

const CustomStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
)

export default CustomStatusBar