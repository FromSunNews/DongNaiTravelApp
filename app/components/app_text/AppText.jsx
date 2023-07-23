import React, { useEffect, useState } from 'react'
import { Text, Linking, StyleProp, TextStyle, TextProps } from 'react-native'

import { useTheme } from 'customHooks/useTheme';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/theme/ThemeSlice';

import ComponentUtility from 'utilities/component';

import { Link } from '@react-navigation/native';

import { app_c, app_typo } from 'globals/styles'
import { ColorAlias } from 'globals/styles/theme';

/**
 * @typedef ToScreenProps
 * @property {string} screenName Tên của screen muốn navigate tới.
 * @property {object} params Params muốn truyền cho screen.
 */

/**
 * @typedef AppTextProps
 * @property {any} children Từ hoặc câu cần in ra màn hình.
 * @property {'normal' | 'italic'} [fontStyle=normal] Kiểu của chữ, bình thường hay là nghiêng.
 * @property {'normal' | 'lighter' | 'bolder'} [weight=normal] Độ đậm của chữ.
 * @property {'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body0' | 'body1' | 'body2' | 'sub0' | 'sub1'} [font=body1] Từ khoá liên quan tới font, được quy định trong typography.js.
 * @property {keyof ColorAlias} [color=onBackground] Từ khoá lên quan tới màu sắc, được quy định trong `color.js`.
 * @property {string} hyperLink Khi link này được truyền vào thì `AppText sẽ giốn như thẻ `a` ở web`.
 * @property {ToScreenProps}  toScreen Một object chứa thông tin của route khác.
 */

/**
 * __Creator__: @NguyenAnhTuan
 * 
 * Đây là một component được tuỳ chỉnh lại từ Text Component của React Native. Dùng để chỉnh font, màu chữ nhanh chóng.
 * Ngoài ra có hỗ trợ thêm cả truyền đường dẫn vào bên trong text.
 * @param {TextProps & AppTextProps} props - Props của component.
 * @returns Trả về `Text` Component có chữ và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const AppText = ({
  children,
  fontStyle = 'normal',
  weight = 'normal',
  font = 'body1',
  color = 'onBackground',
  hyperLink,
  toScreen = { screenName: "", params: {} },
  ...props
  
}) => {
  //theme
  var { theme } = useTheme();

  let stylePropIsArray = props.style instanceof Array;

  let textStyle = React.useMemo(() => (
    {
      ...app_typo.fonts[fontStyle][weight][font],
      color: theme[color]
    }
  ), [fontStyle, weight, font, color, theme]);

  let textCompleteStyle = ComponentUtility.mergeStyle(textStyle, props.style);

  // Sẽ thêm hàm validate url sau, tạm thời dùng điệu kiện hyperLink !== ''
  if(hyperLink && hyperLink !== '') {
    return (
      <Text
        {...props}
        style={[textCompleteStyle, { color: theme.secondary }]}
        onPress={() => Linking.openURL(hyperLink)}
      >{children}
      </Text>
    );
  }

  if(toScreen.screenName !== "") {
    return (
      <Link
        {...props}
        style={textCompleteStyle}
        to={{screen: toScreen.screenName, params: toScreen.params}}
      >
        {children}
      </Link>
    );
  }

  return (
    <Text
      {...props}
      style={textCompleteStyle}
    >{children}
    </Text>
  )
}

export default AppText