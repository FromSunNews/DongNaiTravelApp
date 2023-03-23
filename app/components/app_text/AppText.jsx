import { Text, Linking, StyleProp, TextStyle, TextProps } from 'react-native'
import React from 'react'
import { app_c, app_typo } from 'globals/styles'
import { useNavigation } from '@react-navigation/native';

/**
 * @typedef ToScreenProps
 * @property {string} screenName Tên của screen muốn navigate tới.
 * @property {object} params Params muốn truyền cho screen.
 */

/**
 * @typedef AppTextProps
 * @property {any} props.children Từ hoặc câu cần in ra màn hình.
 * @property {'normal' | 'italic'} [props.fontStyle=normal] Kiểu của chữ, bình thường hay là nghiêng.
 * @property {'normal' | 'lighter' | 'bolder'} [props.weight=normal] Độ đậm của chữ.
 * @property {'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body0' | 'body1' | 'body2' | 'body3' | 'sub0' | 'sub1'} [props.font=body1] Từ khoá liên quan tới font, được quy định trong typography.js.
 * @property {'primary' | 'second' | 'third' | 'fourth' | 'sub_primary' | 'sub_second' | 'sub_third' | 'sub_fourth' | 'ext_primary' | 'ext_second' | 'ext_third'} [props.color=fourth] Từ khoá lên quan tới màu sắc, được quy định trong `color.js`.
 * @property {string} props.hyperLink Khi link này được truyền vào thì `AppText sẽ giốn như thẻ `a` ở web`.
 * @property {ToScreenProps}  props.toScreen Một object chứa thông tin của route khác.
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
  color = 'fourth',
  hyperLink,
  toScreen = { screenName: "", params: {} },
  ...props
  
}) => {
  let textStyle = React.useMemo(() => (
    fontStyle === "normal"
    ? {
      ...app_typo.fonts[fontStyle][weight][font],
      color: app_c.HEX[color],
      fontStyle: fontStyle,
      ...props.style
    }
    : {
      ...app_typo.fonts[fontStyle][weight][font],
      color: app_c.HEX[color],
      fontStyle: fontStyle,
      ...props.style
    }
  ), [fontStyle, weight, font, color, props.style]);

  // Sẽ thêm hàm validate url sau, tạm thời dùng điệu kiện hyperLink !== ''
  if(hyperLink && hyperLink !== '') {
    return (
      <Text
        {...props}
        style={{...app_typo.fonts[fontStyle][weight][font], color: app_c.HEX.sub_fourth, ...props.style}}
        onPress={() => Linking.openURL(hyperLink)}
      >{children}
      </Text>
    );
  }

  if(toScreen.screenName !== "") {
    const navigation = useNavigation();
    return (
      <Text
        {...props}
        style={textStyle}
        onPress={() => navigation.navigate(toScreen.screenName)}
      >{children}
      </Text>
    );
  }

  return (
    <Text
      {...props}
      style={textStyle}
    >{children}
    </Text>
  )
}

export default AppText