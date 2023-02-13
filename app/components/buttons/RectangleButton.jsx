import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View
} from 'react-native'
import React from 'react'

import AppText from '../app_text/AppText'

import styles from './ButtonsStyles'
import { app_shdw, app_sp, app_sh, app_c } from 'globals/styles'

const default_style = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  ...app_sp.ph_18,
  ...app_sp.pv_8,
} 

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Rectangle button là những button hình chữ nhật ở trong app, tuỳ theo container cha mà chiều rộng của nó cũng sẽ thay đổi theo,
 * ngoài ra thì còn hỗ trợ việc "ghi đè shape" của nó như là capsule, rounded.
 * @param {object} props - Props của component.
 * @param {JSX.Element | (isActive, currentLabelStyle) => JSX.Element} props.children - Children là một JSX.Element hoặc là một function trả về JSX.Element.
 * @param {boolean} [props.isActive=false] - Nút có được ấn hay chưa?
 * @param {boolean} [props.isDisable=false] - Nút có được bật hay không?
 * @param {boolean} [props.isTransparent=false] - Nút có background color hay không?
 * @param {boolean} [props.isOnlyContent=false] - Nút có container bọc ở ngoài hay là không?
 * @param {'none' | 'opacity' | 'highlight'} [props.typeOfButton=none] - Loại nút.
 * @param {'none' | 'capsule' | 'rounded_3' | 'rounded_4' | 'rounded_6' | 'rounded_8' | 'rounded_12' | 'rounded_16'} [props.overrideShape=none] - Hình dáng của nút, shape mặc định là hình chữ nhật.
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.defaultColor=type_1] - Màu nút bình thường (mặc định).
 * @param {'type_1' | 'type_2'} [props.activeColor=type_1] - Màu nút khi khi được focus (active).
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.boxShadowType=] - Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 * @param {StyleProp<ViewStyle>} [props.style={}] - Custom style cho button, không can thiệp vào các thuộc tính mặc định.
 * @param {() => void} props.handlePressButton - Function xử lý sự kiện cho Capsule button.
 * @returns Trả về `TouchableOpacity` | `TouchableWithoutFeedback` | `TouchableHighLight` Component (tuỳ theo lựa chọn).
 */
const RectangleButton = ({
  children,
  isActive = false,
  isDisable = false,
  isTransparent = false,
  isOnlyContent = false,
  typeOfButton = "none",
  overrideShape = "none",
  defaultColor = "type_1",
  activeColor = "type_1",
  boxShadowType = "",
  style = {},
  handlePressButton = () => {}
}) => {
  let isChildrenFunc = typeof children === 'function' && React.isValidElement(children());
  let shape = overrideShape !== 'none' ? app_sh[overrideShape] : {};

  if(isDisable) {
    return (
      <TouchableWithoutFeedback disabled={isDisable}>
        <View style={{...style, ...default_style, ...styles.btn_disable}}>
          {
            isChildrenFunc
            ? children(isActive, {})
            : children
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  let currentButtonStyle = {
    ...default_style,
    ...style,
    ...shape,
    ...(
      isActive
      ? styles[`btn_active_${activeColor}`]
      : styles[`btn_default_${defaultColor}`]
  )};
  let currentLabelStyle = isActive ? styles[`lbl_active_${activeColor}`] : styles[`lbl_default_${defaultColor}`];

  if(isOnlyContent) {
    currentButtonStyle = {...shape, ...style};
  }

  if(isTransparent) {
    currentButtonStyle = {...default_style, ...shape, ...style};
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
      <View style={typeOfButton === "highlight" || typeOfButton === "opacity" ? {flexDirection: 'row'} : {...currentButtonStyle}}>
        {
          isChildrenFunc
          ? children(isActive, currentLabelStyle)
          : children
        }
      </View>
    </ButtonComponent>
  )
}

export default RectangleButton