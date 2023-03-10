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

import styles from './ButtonsStyles'
import { app_shdw, app_sh, app_sp, app_c } from 'globals/styles'

const default_style = {
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 30,
  minHeight: 30,
  ...app_sh.circle,
  ...app_sp.p_10,
};

/**
 * @typedef CircleButtonProps
 * @property {JSX.Element | (isActive: boolean, currentLabelStyle: StyleProp<TextStyle>) => JSX.Element} props.setIcon - Custom style cho button, không can thiệp vào các thuộc tính mặc định.
 * @property {boolean} [isActive=false] Nút có được ấn hay chưa?
 * @property {boolean} [isTransparent=false] Nút có background color hay không?
 * @property {boolean} [isOnlyContent=false] Nút có padding hay background hay không? Và chỉ có content hay không?
 * @property {'none' | 'opacity' | 'highlight'} [typeOfButton=none] Loại nút.
 * @property {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [defaultColor=type_1] Màu nút bình thường (mặc định).
 * @property {'type_1' | 'type_2'} [activeColor=type_1] Màu nút khi khi được focus (active).
 * @property {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [boxShadowType=] Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Circle Button là những button nhỏ ở trong app, có hình dạng là một hình tròn. Button này chỉ
 * có icon.
 * @param {CircleButtonProps & TouchableHighlightProps & TouchableOpacityProps} props Props của component.
 * @returns Trả về `TouchableOpacity` | `TouchableWithoutFeedback` | `TouchableHighLight` Component (tuỳ theo lựa chọn).
 */
const CircleButton = ({
  isActive = false,
  isTransparent = false,
  isOnlyContent = false,
  typeOfButton = "none",
  defaultColor = "type_1",
  activeColor = "type_1",
  boxShadowType = "",
  setIcon,
  ...props
}) => {
  let canSetIcon = typeof setIcon === 'function' && React.isValidElement(setIcon());

  let Button = ComponentUtility.getTouchable(typeOfButton);
  
  let contentContainerStyle = {
    ...default_style,
    ...(
      isActive
      ? styles[`btn_active_${activeColor}`]
      : styles[`btn_default_${defaultColor}`]
  )};

  let currentLabelStyle = isActive ? styles[`lbl_active_${activeColor}`] : styles[`lbl_default_${defaultColor}`];

  if(isOnlyContent) {
    contentContainerStyle = {};
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
        {canSetIcon && setIcon(isActive, currentLabelStyle)}
      </View>
    </Button>
  )
}

export default CircleButton