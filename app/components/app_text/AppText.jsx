import { Text, Linking } from 'react-native'
import React from 'react'
import { app_c, app_typo } from 'globals/styles'
import { useNavigation } from '@react-navigation/native';

/**
 * __Creator__: @NguyenAnhTuan
 * 
 * Đây là một component được tuỳ chỉnh lại từ Text Component của React Native. Dùng để chỉnh font, màu chữ.
 * Ngoài ra có hỗ trợ thêm cả truyền đường dẫn vào bên trong text.
 * @param {object} props - Props của component.
 * @param {any} props.children - Từ hoặc câu cần in ra màn hình.
 * @param {number} [props.numberOfLines=0] - Thông số này giúp mình custom dòng hiển thị ở trong Text (wrap text), và đi cùng là wrap-text mặc định là Ellipse Mode.
 * @param {'normal' | 'italic'} [props.fontStyle=normal] - Kiểu của chữ, bình thường hay là nghiêng.
 * @param {'normal' | 'lighter' | 'bolder'} [props.weight=normal] - Độ đậm của chữ.
 * @param {'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body0' | 'body1' | 'body2' | 'body3' | 'sub0' | 'sub1'} [props.font=body1] - Từ khoá liên quan tới font, được quy định trong typography.js.
 * @param {'primary' | 'second' | 'third' | 'fourth' | 'sub_primary' | 'sub_second' | 'sub_third' | 'sub_fourth' | 'ext_primary' | 'ext_second' | 'ext_third'} [props.color=fourth] - Từ khoá lên quan tới màu sắc, được quy định trong `color.js`.
 * @param {string} props.hyperLink - Khi link này được truyền vào thì `AppText sẽ giốn như thẻ `a` ở web`.
 * @param {object}  props.toScreen - Một object chứa thông tin của route khác.
 * @param {string}  props.toScreen.screenName - Tên của screen muốn navigate tới.
 * @param {object}  props.toScreen.params - Params muốn truyền cho screen.
 * @param {StyleProp<TextStyle>} [props.style={}] - Style cho component.
 * @returns Trả về `Text` Component có chữ và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const AppText = ({
  children,
  numberOfLines = 0,
  fontStyle = 'normal',
  weight = 'normal',
  font = 'body1',
  color = 'fourth',
  hyperLink,
  toScreen = { screenName: "", params: {} },
  style = {}
}) => {
  let textStyle = React.useMemo(() => (
    fontStyle === "normal"
    ? {
      ...app_typo.fonts[fontStyle][weight][font],
      color: app_c.HEX[color],
      fontStyle: fontStyle,
      ...style
    }
    : {
      ...app_typo.fonts[fontStyle][weight][font],
      color: app_c.HEX[color],
      fontStyle: fontStyle,
      ...style
    }
  ), [fontStyle, weight, font, color, style]);

  // Sẽ thêm hàm validate url sau, tạm thời dùng điệu kiện hyperLink !== ''
  if(hyperLink && hyperLink !== '') {
    return (
      <Text
        style={{...app_typo.fonts[fontStyle][weight][font], color: app_c.HEX.sub_fourth, ...style}}
        onPress={() => Linking.openURL(hyperLink)}
      >{children}
      </Text>
    );
  }

  if(toScreen.screenName !== "") {
    const navigation = useNavigation();
    return (
      <Text
        style={textStyle}
        onPress={() => navigation.navigate(toScreen.screenName)}
      >{children}
      </Text>
    );
  }

  return (
    <Text
      style={textStyle}
      numberOfLines={numberOfLines}
    >{children}
    </Text>
  )
}

export default AppText