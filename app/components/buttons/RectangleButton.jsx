import {
  View,
  TouchableHighlightProps,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native'
import React from 'react'

import ComponentUtility from 'utilities/component'

import AppText from '../app_text/AppText'

import styles from './ButtonsStyles'
import { app_shdw, app_sp, app_sh, app_c } from 'globals/styles'

const default_style = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 30,
  ...app_sp.ph_18,
  ...app_sp.pv_10,
} 

/**
 * @typedef RectangleButtonProps
 * @property {JSX.Element | (isActive: boolean, currentLabelStyle: StyleProp<TextStyle>) => JSX.Element} children Children là một JSX.Element hoặc là một function trả về JSX.Element.
 * @property {boolean} [isActive=false] Nút có được ấn hay chưa?
 * @property {boolean} [isTransparent=false] Nút có background color hay không?
 * @property {boolean} [isOnlyContent=false] Nút có padding hay background hay không? Và chỉ có content hay không?
 * @property {'none' | 'opacity' | 'highlight'} [typeOfButton=none] Loại nút.
 * @property {'none' | 'capsule' | 'rounded_3' | 'rounded_4' | 'rounded_6' | 'rounded_8' | 'rounded_12' | 'rounded_16'} [overrideShape=none] Hình dáng của nút, shape mặc định là hình chữ nhật.
 * @property {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [defaultColor=type_1] Màu nút bình thường (mặc định).
 * @property {'type_1' | 'type_2'} [activeColor=type_1] Màu nút khi khi được focus (active).
 * @property {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [boxShadowType=] Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Rectangle button là những button hình chữ nhật ở trong app, tuỳ theo container cha mà chiều rộng của nó cũng sẽ thay đổi theo,
 * ngoài ra thì còn hỗ trợ việc "ghi đè shape" của nó như là capsule, rounded.
 * @param {RectangleButtonProps & TouchableHighlightProps & TouchableOpacityProps} props - Props của component.
 * @returns Trả về `TouchableOpacity` | `TouchableWithoutFeedback` | `TouchableHighLight` Component (tuỳ theo lựa chọn).
 */
const RectangleButton = ({
  children,
  isActive = false,
  isTransparent = false,
  isOnlyContent = false,
  typeOfButton = "none",
  overrideShape = "none",
  defaultColor = "type_1",
  activeColor = "type_1",
  boxShadowType = "",
  ...props
}) => {
  let isChildrenFunc = typeof children === 'function' && React.isValidElement(children());

  let shape = overrideShape !== 'none' ? app_sh[overrideShape] : {};

  let Button = ComponentUtility.getTouchable(typeOfButton);
  
  let contentContainerStyle = {
    ...default_style,
    ...shape,
    ...(
      isActive
      ? styles[`btn_active_${activeColor}`]
      : styles[`btn_default_${defaultColor}`]
  )};

  let currentLabelStyle = isActive ? styles[`lbl_active_${activeColor}`] : styles[`lbl_default_${defaultColor}`];

  if(isOnlyContent) {
    contentContainerStyle = shape;
  }

  if(isTransparent) {
    contentContainerStyle.backgroundColor = "transparent";
    currentLabelStyle = {};
  }

  if(boxShadowType !== "") {
    contentContainerStyle = Object.assign({}, contentContainerStyle, app_shdw[boxShadowType]);
  }

  if(props.disabled) {
    contentContainerStyle = Object.assign({}, contentContainerStyle, styles.btn_disable);
    currentLabelStyle = styles.lbl_disable;
  }

  contentContainerStyle = ComponentUtility.mergeStyle(contentContainerStyle, props.style);

  props.underlayColor = props.underlayColor ? props.underlayColor : app_c.HEX.sub_third;

  return (
    <Button
      {...props}
      style={typeOfButton === "none" ? {} : contentContainerStyle}
    >
      <View style={typeOfButton === "none" ? contentContainerStyle : {}}>
        {
          isChildrenFunc
          ? children(isActive, currentLabelStyle)
          : children
        }
      </View>
    </Button>
  )
}

export default RectangleButton