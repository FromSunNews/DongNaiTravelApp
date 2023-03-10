import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native'

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Function nhận vào một 
 * @param {'highlight' | 'opacity'} type Kiểu của touchable. Bao gồm 3 kiểu là `highlight`, `opacity`
 * @returns Một Touchable tương ứng với type. Nếu như type không là `highlight` hoặc `opacity` thì sẽ trả về `TouchableWithoutFeedback`
 */
function getTouchable (type) {
  switch(type) {
    case "highlight": return TouchableHighlight;
    case "opacity": return TouchableOpacity;
    default: return TouchableWithoutFeedback;
  }
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Function này cần dùng khi một component có default style và có thể style riêng đè lên default style.
 * Lợi dụng cơ chế style của React Native (flat array về thành object, loại bỏ những properties trùng - lấy các properties ở đằng sau).
 * 
 * Tuy nhiên thì khi viết style cho component, thì hạn chế nested style vào trong sâu quá, bởi vì có thể làm giảm đi performance của JS.
 * @param {StyleProp<ViewStyle | TextStyle> | Array<StyleProp<ViewStyle | TextStyle>>} baseStyle Style mặc định của một component.
 * @param {Array<StyleProp<ViewStyle | TextStyle>>} otherStyles Style muốn tuỳ chỉnh cho component đó.
 * @returns Một mảng gồm các style đã được trộn lẫn với nhau.
 */
function mergeStyle(baseStyle, ...otherStyles) {
  let completeStyle = [baseStyle];
  completeStyle = completeStyle.concat(otherStyles);
  return completeStyle
}

const ComponentUtility = {
  getTouchable,
  mergeStyle
}

export default ComponentUtility