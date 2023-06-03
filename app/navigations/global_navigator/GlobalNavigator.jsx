import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import {
  AppHeader
} from 'components'
import SearchScreen from "screens/search/SearchScreen";
import PlaceDetailScreen from "screens/place_detail/PlaceDetailScreen";

const GlobalStack = createNativeStackNavigator();

/**
 * Navigator này dùng để hiển thị các screen global, là những screen không cần đăng nhập vẫn dùng được. Ngoài ra thì
 * nó còn chứa Search, và một số screen xem thông tin chi tiết.
 * @returns 
 */
const GlobalNavigator = () => {
  return (
    <GlobalStack.Navigator>
      <GlobalStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false
          // header: props => (
          //   <AppHeader
          //     {...props}
          //     setRightPart={() => null}
          //   />
          // )
        }}
      />

      <GlobalStack.Screen
        name="PlaceDetailScreen"
        component={PlaceDetailScreen}
        options={{
          header: AppHeader,
          headerTransparent: true,
        }}
      />
    </GlobalStack.Navigator>
  );
}

export default GlobalNavigator