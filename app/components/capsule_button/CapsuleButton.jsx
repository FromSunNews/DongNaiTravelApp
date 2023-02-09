import { TouchableOpacity, View } from 'react-native'
import React from 'react'

import AppText from '../app_text/AppText'

import styles from './CapsuleButtonStyles'
import { app_c, app_shdw } from 'globals/styles'

/**
 * __Creator__: Nguyen Anh Tuan.
 * 
 * Capsule Button là những button nhỏ ở trong app, hình dạng của nút này giống với một viên thuốc nén.
 * @param {object} props - Props của component.
 * @param {string} props.children - Từ hoặc câu cần in ra màn hình
 * @param {boolean} [props.isActive=false] - Nút có được ấn hay chưa?
 * @param {boolean} [props.isDisable=false] - Nút có được bật hay không?
 * @param {'type_1' | 'type_2' | 'type_3'} [props.defaultColor=type_1] - Màu nút bình thường (mặc định).
 * @param {'type_1' | 'type_2'} [props.activeColor=type_1] - Màu nút khi khi được focus (active).
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.boxShadowType=] - Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 * @param {string} [props.font=body6] - Font chữ, xem thêm trong `typography.js`.
 * @param {(isActive: boolean, currentLabelStyle: StyleSheet) => JSX.Element} props.setIcon - Function trả về một JSX.Element.
 * @param {() => void} props.handlePressButton - Function xử lý sự kiện cho Capsule button.
 * @returns Trả về `TouchableOpacity` Component có chữ và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const CapsuleButton = ({
  children,
  isActive = false,
  isDisable = false,
  defaultColor = "type_1",
  activeColor = "type_1",
  boxShadowType = "",
  fontOfText = "body6",
  setIcon,
  handlePressButton = () => {}
}) => {
  let canSetIcon = typeof setIcon === 'function';

  if(isDisable) {
    return (
      <TouchableOpacity
        disabled={isDisable}
        style={styles.btn_caps_disable}
      >
        {canSetIcon && setIcon(isActive = false, styles.lbl_disable)}
        {canSetIcon && <View style={{width: 8}}></View>}
        <AppText style={styles.lbl_disable} font={fontOfText}>{children}</AppText>
      </TouchableOpacity>
    );
  }
  
  let currentButtonStyle = isActive ? styles[`btn_caps_active_${activeColor}`] : styles[`btn_caps_default_${defaultColor}`];
  let currentLabelStyle = isActive ? styles[`lbl_active_${activeColor}`]: styles[`lbl_default_${defaultColor}`];

  if(boxShadowType !== "") {
    currentButtonStyle = isActive
      ? {...styles[`btn_caps_active_${activeColor}`], ...app_shdw[boxShadowType]}
      : {...styles[`btn_caps_default_${defaultColor}`], ...app_shdw[boxShadowType]};
  }

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={currentButtonStyle}
      onPress={handlePressButton}
    >
      {canSetIcon && setIcon(isActive, currentLabelStyle)}
      {canSetIcon && <View style={{width: 8}}></View>}
      <AppText style={currentLabelStyle} font={fontOfText}>{children}</AppText>
    </TouchableOpacity>
  )
}

export default CapsuleButton