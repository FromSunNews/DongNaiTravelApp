import { TouchableOpacity } from 'react-native'
import React from 'react'

import AppText from '../app_text/AppText';

import style from './CapsuleButtonStyle'

/**
 * by @NguyenAnhTuan1912
 * 
 * Tag Button là những button nhỏ ở  trong app, với chức năng là chọn loại cho một chủ đề nào đó.
 * @param {string} text - Từ hoặc câu cần in ra màn hình
 * @param {boolean} isActive - Nút có được ấn hay chưa?
 * @returns Trả về `TouchableOpacity` Component có chữ và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const CapsuleButton = ({children, isActive = false}) => {
  return (
    <TouchableOpacity style={isActive ? style.btn_active : style.btn_inActive}>
      <AppText style={{...(isActive ? style.lbl_active : style.lbl_inactive)}} sz="body6">{children}</AppText>
    </TouchableOpacity>
  )
}

export default CapsuleButton