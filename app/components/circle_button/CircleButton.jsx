import { TouchableOpacity } from 'react-native'
import React from 'react'

import style from './CircleButtonStyle'

/**
 * by @NguyenAnhTuan1912
 * 
 * CircleButton là các nút ấn hình tròn, các nút ấn này chỉ có icon. Các tham số chuyền vào chính là thứ tự màu
 * đã được quy định từ trước. VD:
 * 
 * * primary - sub_primary - ext_primary
 * * second - sub_second - ext_second
 * * third - sub_third
 * * fourth - sub_fourth
 * 
 * @param {string} btnColor - Màu nền của nút.
 * @param {string} lblColor - Màu của lable của nút.
 * @returns Trả về `TouchableOpacity` Component có Icon trong đó.
 */
const CircleButton = ({ btnColor = 'second', lblColor = 'fourth' }) => {
  return (
    <TouchableOpacity style={style[`btn_inactive_bg_c_${btnColor}`]}>

    </TouchableOpacity>
  )
}

export default CircleButton