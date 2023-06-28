import {
  View,
  TouchableHighlightProps,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native'
import React from 'react'

import { useTheme } from 'customHooks/useTheme'

import ComponentUtility from 'utilities/component'

import styles, { getButtonColors } from './ButtonsStyles'
import { app_shdw, app_sh, app_sp, app_c } from 'globals/styles'
import AppText from 'components/app_text/AppText'

const default_style = {
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 30,
  minHeight: 30,
  ...app_sh.circle,
  ...app_sp.p_10,
};

/**
 * @typedef CircleButtonProps
 * @property {JSX.Element | (isActive: boolean, currentLabelStyle: StyleProp<TextStyle>) => JSX.Element} props.setIcon - Custom style cho button, không can thiệp vào các thuộc tính mặc định.
 * @property {boolean} [isActive=false] Nút có được ấn hay chưa?
 * @property {boolean} [isTransparent=false] Nút có background color hay không?
 * @property {boolean} [isOnlyContent=false] Nút có padding hay background hay không? Và chỉ có content hay không?
 * @property {number} border Viền cho nút.
 * @property {'none' | 'opacity' | 'highlight'} [typeOfButton=none] Loại nút.
 * @property {'type_1' | 'type_2' | 'type_3' | 'type_4'} [defaultColor=type_1] Màu nút bình thường (mặc định).
 * @property {'type_1' | 'type_2' | 'type_3' | 'type_4'} [activeColor=type_1] Màu nút khi khi được focus (active).
 * @property {'type_1' | 'type_2' | 'type_3'} [boxShadowType=] Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Circle Button là những button nhỏ ở trong app, có hình dạng là một hình tròn. Button này chỉ
 * có icon.
 * @param {CircleButtonProps & TouchableHighlightProps & TouchableOpacityProps} props Props của component.
 * @returns Trả về `TouchableOpacity` | `TouchableWithoutFeedback` | `TouchableHighLight` Component (tuỳ theo lựa chọn).
 */
const CircleButton = ({
  isActive = false,
  isTransparent = false,
  isOnlyContent = false,
  typeOfButton = "none",
  defaultColor = "type_1",
  activeColor,
  boxShadowType = "",
  setIcon,
  ...props
}) => {
  const isSetIconFunction = typeof setIcon === 'function' && React.isValidElement(setIcon());
  const isSetIconElement = React.isValidElement(setIcon);
  const { theme, themeMode } = useTheme();
  const Button = ComponentUtility.getTouchable(typeOfButton);

  let colors = React.useMemo(() => getButtonColors(themeMode), [themeMode]);
  activeColor = activeColor ? activeColor : defaultColor;
  let { btnColorStyle, lblColorStyle } = {
    btnColorStyle: { backgroundColor: isActive ? colors.active[activeColor].btn : colors.inactive[defaultColor].btn },
    lblColorStyle: { color: isActive ? colors.active[activeColor].lbl : colors.inactive[defaultColor].lbl }
  }
  let contentContainerStyle = {
    ...default_style,
    ...btnColorStyle
  };
  
  let currentLabelStyle = lblColorStyle;

  if(isOnlyContent) {
    contentContainerStyle = {};
  }

  if(isTransparent) {
    contentContainerStyle.backgroundColor = "transparent";
    currentLabelStyle = {};
  }

  if(boxShadowType !== "") {
    contentContainerStyle = Object.assign({}, contentContainerStyle, app_shdw[boxShadowType]);
  }

  if(props.disabled) {
    contentContainerStyle = Object.assign({}, contentContainerStyle, styles.btn_disable);
    currentLabelStyle = styles.lbl_disable;
  }

  contentContainerStyle = ComponentUtility.mergeStyle(contentContainerStyle, props.style);

  props.underlayColor = props.underlayColor ? props.underlayColor : app_c.HEX.sub_third;

  return (
    <Button
      {...props}
      style={typeOfButton === "none" ? {} : contentContainerStyle}
    >
      <View style={typeOfButton === "none" ? contentContainerStyle : {}}>
        {
          isSetIconFunction
            ? setIcon(isActive, currentLabelStyle)
            : isSetIconElement && <AppText style={currentLabelStyle}>{setIcon}</AppText>
        }
      </View>
    </Button>
  )
}

export default CircleButton