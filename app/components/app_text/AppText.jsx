import { Text } from 'react-native'
import React from 'react'

import { app_c, app_typo } from 'globals/styles'

/**
 * by @NguyenAnhTuan1912
 * 
 * Đây là một component được tuỳ chỉnh lại từ Text Component của React Native. Với mục đích là có thể
 * tuỳ chỉnh cỡ chữ `sz`.
 * @param {string} children - Từ hoặc câu cần in ra màn hình.
 * @param {StyleSheet} style - Style cho component.
 * @param {number} numberOfLines - thông số này giúp mình custom dòng hiển thị ở trong Text (wrap text), và đi cùng là Ellipse Mode
 * @param {string} sz - Là từ có dạng `sz_n`, với n là số từ 1 đến 8.
 * * sz_1 = 7
 * * sz_2 = 9
 * * sz_3 = 12
 * * sz_4 = 14
 * * sz_5 = 16
 * * sz_6 = 18
 * * sz_7 = 32
 * * sz_8 = 50
 * @returns Trả về `Text` Component có chữ và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const AppText = ({children, style = {color: app_c.HEX.ext_second}, numberOfLines = 0, sz = 'sz_5'}) => {
  return (
    <Text style={{...app_typo[sz], ...style}} numberOfLines={numberOfLines}>{children}</Text>
  )
}

export default AppText