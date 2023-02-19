import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View
} from 'react-native'
import React from 'react'

import styles from './ButtonsStyles'
import { app_shdw, app_sh, app_sp, app_c } from 'globals/styles'

const default_style = {
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 30,
  maxWidth: 100,
  maxHeight: 100,
  aspectRatio: 1,
  ...app_sh.circle,
  ...app_sp.p_10,
};

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Circle Button là những button nhỏ ở trong app, có hình dạng là một hình tròn. Button này chỉ
 * có icon.
 * @param {object} props - Props của component.
 * @param {boolean} [props.isActive=false] - Nút có được ấn hay chưa?
 * @param {boolean} [props.isDisable=false] - Nút có được bật hay không?
 * @param {boolean} [props.isTransparent=false] - Nút có background color hay không?
 * @param {boolean} [props.isOnlyContent=false] - Nút có container bọc ở ngoài hay là không?
 * @param {'none' | 'opacity' | 'highlight'} [props.typeOfButton=none] - Loại nút.
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.defaultColor=type_1] - Màu nút bình thường (mặc định).
 * @param {'type_1' | 'type_2'} [props.activeColor=type_1] - Màu nút khi khi được focus (active).
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.boxShadowType=] - Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 * @param {StyleProp<ViewStyle>} [props.style={}] - Custom style cho button, không can thiệp vào các thuộc tính mặc định.
 * @param {(isActive, currentLabelStyle) => JSX.Element} props.setIcon - Custom style cho button, không can thiệp vào các thuộc tính mặc định.
 * @param {() => void} props.handlePressButton - Function xử lý sự kiện cho Capsule button.
 * @returns Trả về `TouchableOpacity` | `TouchableWithoutFeedback` | `TouchableHighLight` Component (tuỳ theo lựa chọn).
 */
const CircleButton = ({
  isActive = false,
  isDisable = false,
  isTransparent = false,
  isOnlyContent = false,
  typeOfButton = "none",
  defaultColor = "type_1",
  activeColor = "type_1",
  boxShadowType = "",
  style = {},
  setIcon,
  handlePressButton = () => {}
}) => {
  let canSetIcon = typeof setIcon === 'function' && React.isValidElement(setIcon());

  if(isDisable) {
    return (
      <TouchableWithoutFeedback
        disabled={isDisable}
      >
        <View style={{...default_style, ...style, ...styles.btn_disable}}>
          {canSetIcon && setIcon(isActive, {})}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  let currentButtonStyle = {
    ...default_style,
    ...style,
    ...(
      isActive
      ? styles[`btn_active_${activeColor}`]
      : styles[`btn_default_${defaultColor}`]
  )};
  let currentLabelStyle = isActive ? styles[`lbl_active_${activeColor}`] : styles[`lbl_default_${defaultColor}`];

  if(isOnlyContent) {
    currentButtonStyle = style;
  }

  if(isTransparent) {
    currentButtonStyle = {...default_style, ...style};
    currentLabelStyle = {};
  }

  if(boxShadowType !== "") {
    currentButtonStyle = {...currentButtonStyle, ...app_shdw[boxShadowType]}
  }

  let ButtonComponent = TouchableWithoutFeedback;
  let ButtonComponentProps = {
    style: currentButtonStyle
  };

  if(typeOfButton === "opacity") {
    ButtonComponent = TouchableOpacity;
    ButtonComponentProps = {
      style: currentButtonStyle
    }
  }

  if(typeOfButton === "highlight") {
    ButtonComponent = TouchableHighlight;
    ButtonComponentProps = {
      underlayColor: app_c.HEX.ext_third,
      style: currentButtonStyle
    }
  }

  return (
    <ButtonComponent
      {...ButtonComponentProps}
      onPress={handlePressButton}
    >
      <View style={typeOfButton === "highlight" || typeOfButton === "opacity" ? {flex: 1, justifyContent: 'center', alignItems: 'center'} : {...currentButtonStyle}}>
          {canSetIcon && setIcon(isActive, currentLabelStyle)}
      </View>
    </ButtonComponent>
  )
}

export default CircleButton