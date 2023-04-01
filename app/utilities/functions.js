import { 
  getFocusedRouteNameFromRoute,
  RouteProp,
  ParamListBase
} from "@react-navigation/native";

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Hàm trả về tên của một route đang được active. Nếu như muốn setup title cho cho các screen trong navigator con, ví dụ như là
 * một Stack navigator nằm trong screen của Tab navigator, thì dùng hàm này cho thuộc tính `options` của Tab screen.
 * 
 * __How to use?__
 * @example
 * ```jsx
 * <Tab.Screen
 *  options={({route}) => (
 *    {
 *      title: FunctionsUtility.getHeaderTitle(route)
 *    }
 *  )}
 * />
 * ```
 *
 * @param {RouteProp<ParamListBase, string>} route Tên của route.
 * @returns Trả về tên của route đang được active.
 */
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  return routeName;
}

const FunctionsUtility = {
  getHeaderTitle
}

export default FunctionsUtility;