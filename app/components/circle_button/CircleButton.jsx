import { TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './CircleButtonStyle'
import { app_c, app_shdw } from 'globals/styles'

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Circle Button là những button nhỏ ở trong app, có hình dạng là một hình tròn. Button này chỉ
 * có icon chứ không có text.
 * @param {object} props - Props của component.
 * @param {boolean} [props.isActive=false] - Nút có được ấn hay chưa?
 * @param {boolean} [props.isDisable=false] - Nút có được bật hay không?
 * @param {boolean} [props.isTransparent=false] - Nút có background color hay không?
 * @param {boolean} [props.isOnlyContent=false] - Nút có container bọc ở ngoài hay là không?
 * @param {'type_1' | 'type_2' | 'type_3'} [props.defaultColor=type_1] - Màu nút bình thường (mặc định).
 * @param {'type_1' | 'type_2'} [props.activeColor=type_1] - Màu nút khi khi được focus (active).
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.boxShadowType=] - Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 * @param {StyleProp<ViewStyle>} [props.style={}] - Custom style cho button, không can thiệp vào các thuộc tính mặc định.
 * @param {(isActive: boolean, currentLabelStyle: StyleSheet) => JSX.Element} props.setIcon - Function trả về một JSX.Element.
 * @param {() => void} props.handlePressButton - Function xử lý sự kiện cho Capsule button.
 * @returns Trả về `TouchableOpacity` Component có chữ và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const CircleButton = ({
  isActive = false,
  isDisable = false,
  isTransparent = false,
  isOnlyContent = false,
  defaultColor = "type_1",
  activeColor = "type_1",
  boxShadowType = "",
  style = {},
  setIcon,
  handlePressButton = () => {}
}) => {
  let canSetIcon = typeof setIcon === 'function';

  if(isDisable) {
    return (
      <TouchableOpacity
      disabled={isDisable}
      style={{...style, ...styles.btn_disable}}
    >
      {canSetIcon && setIcon(isActive = false, styles.lbl_disable)}
    </TouchableOpacity>
    );
  }

  let currentButtonStyle = {...style, ...(isActive ? styles[`btn_active_${activeColor}`] : styles[`btn_default_${defaultColor}`])};
  let currentLabelStyle = isActive ? styles[`lbl_active_${activeColor}`]: styles[`lbl_default_${defaultColor}`];

  if(isOnlyContent) {
    currentButtonStyle = style;
  }

  if(isTransparent) {
    currentButtonStyle = {...style, ...styles.btn_transparent};
  }

  if(boxShadowType !== "") {
    currentButtonStyle = {...currentButtonStyle, ...app_shdw[boxShadowType]}
  }

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={currentButtonStyle}
      onPress={handlePressButton}
    >
      {canSetIcon && setIcon(isActive, currentLabelStyle)}
    </TouchableOpacity>
  )
}

export default CircleButton