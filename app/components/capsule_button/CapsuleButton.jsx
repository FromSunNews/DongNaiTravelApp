import { TouchableOpacity, View } from 'react-native'
import React from 'react'

import AppText from '../app_text/AppText'

import styles from './CapsuleButtonStyles'
import { app_c, app_shdw, app_sp } from 'globals/styles'

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Capsule Button là những button nhỏ ở trong app, hình dạng của nút này giống với một viên thuốc nén.
 * @param {object} props - Props của component.
 * @param {string} props.children - Từ hoặc câu cần in ra màn hình
 * @param {boolean} [props.isActive=false] - Nút có được ấn hay chưa?
 * @param {boolean} [props.isDisable=false] - Nút có được bật hay không?
 * @param {boolean} [props.isTransparent=false] - Nút có background color hay không?
 * @param {boolean} [props.isOnlyContent=false] - Nút có container bọc ở ngoài hay là không?
 * @param {'type_1' | 'type_2' | 'type_3'} [props.defaultColor=type_1] - Màu nút bình thường (mặc định).
 * @param {'type_1' | 'type_2'} [props.activeColor=type_1] - Màu nút khi khi được focus (active).
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.boxShadowType=] - Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 * @param {string} [props.font=body6] - Font chữ, xem thêm trong `typography.js`.
 * @param {StyleProp<ViewStyle>} [props.style={}] - Custom style cho button, không can thiệp vào các thuộc tính mặc định.
 * @param {(isActive: boolean, currentLabelStyle: StyleProp<TextStyle>) => JSX.Element} props.setIcon - Function trả về một JSX.Element.
 * @param {() => void} props.handlePressButton - Function xử lý sự kiện cho Capsule button.
 * @returns Trả về `TouchableOpacity` Component có chữ và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const CapsuleButton = ({
  children,
  isActive = false,
  isDisable = false,
  isTransparent = false,
  isOnlyContent = false,
  defaultColor = "type_1",
  activeColor = "type_1",
  boxShadowType = "",
  fontOfText = "body6",
  style = {},
  setIcon,
  handlePressButton = () => {}
}) => {
  let canSetIcon = typeof setIcon === 'function' && React.isValidElement(setIcon());

  if(isDisable) {
    return (
      <TouchableOpacity
        disabled={isDisable}
        style={{...style, ...styles.btn_disable}}
      >
        {canSetIcon && setIcon(isActive, currentLabelStyle)}
        {
          canSetIcon
          ? <AppText style={{...app_sp.ms_8, ...styles.lbl_disable}} font={fontOfText}>{children}</AppText>
          : <AppText style={styles.lbl_disable} font={fontOfText}>{children}</AppText>
        }
      </TouchableOpacity>
    );
  }
  
  let currentButtonStyle = {...style, ...(isActive ? styles[`btn_active_${activeColor}`] : styles[`btn_default_${defaultColor}`])};
  let currentLabelStyle = isActive ? styles[`lbl_active_${activeColor}`] : styles[`lbl_default_${defaultColor}`];

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
      {
        canSetIcon
        ? <AppText style={{...app_sp.ms_8, ...currentLabelStyle}} font={fontOfText}>{children}</AppText>
        : <AppText style={currentLabelStyle} font={fontOfText}>{children}</AppText>
      }
    </TouchableOpacity>
  )
}

export default CapsuleButton