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

import { withPreventDoubleClick } from 'hocs/preventDoubleClick'
import AppText from '../app_text/AppText'

import styles, { getButtonColors } from './ButtonsStyles'
import { app_shdw, app_sp, app_sh, app_c } from 'globals/styles'

const default_style = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 30,
  ...app_sp.ph_18,
  ...app_sp.pv_10,
} 

/**
 * @typedef RectangleButtonProps
 * @property {JSX.Element | (isActive: boolean, currentLabelStyle: StyleProp<TextStyle>) => JSX.Element | string} children Children là một JSX.Element hoặc là một function trả về JSX.Element.
 * @property {boolean} [isActive=false] Nút có được ấn hay chưa?
 * @property {boolean} [isTransparent=false] Nút có background color hay không?
 * @property {boolean} [isOnlyContent=false] Nút có padding hay background hay không? Và chỉ có content hay không?
 * @property {'none' | 'opacity' | 'highlight'} [typeOfButton=none] Loại nút.
 * @property {number} border Viền cho nút.
 * @property {'none' | 'capsule' | 'rounded_3' | 'rounded_4' | 'rounded_6' | 'rounded_8' | 'rounded_12' | 'rounded_16'} [overrideShape=none] Hình dáng của nút, shape mặc định là hình chữ nhật.
 * @property {'type_1' | 'type_2' | 'type_3' | 'type_4'} [defaultColor=type_1] Màu nút bình thường (mặc định).
 * @property {'type_1' | 'type_2' | 'type_3' | 'type_4'} [activeColor=type_1] Màu nút khi khi được focus (active).
 * @property {'type_1' | 'type_2' | 'type_3'} [boxShadowType=] Đổ bóng cho button theo loại, xem thêm trong `box-shadow.js`.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Rectangle button là những button hình chữ nhật ở trong app, tuỳ theo container cha mà chiều rộng của nó cũng sẽ thay đổi theo,
 * ngoài ra thì còn hỗ trợ việc "ghi đè shape" của nó như là capsule, rounded.
 * @param {RectangleButtonProps & TouchableHighlightProps & TouchableOpacityProps} props - Props của component.
 * @returns Trả về `TouchableOpacity` | `TouchableWithoutFeedback` | `TouchableHighLight` Component (tuỳ theo lựa chọn).
 */
const RectangleButton = ({
  children,
  isActive = false,
  isTransparent = false,
  isOnlyContent = false,
  typeOfButton = "none",
  overrideShape = "none",
  defaultColor = "type_1",
  activeColor,
  boxShadowType = "",
  border,
  ...props
}) => {
  const isChildrenFunc = typeof children === 'function' && React.isValidElement(children());
  const hasStringChild = Array.isArray(children) ? children.some(child => typeof child === "string") : typeof children === "string";
  const shape = overrideShape !== 'none' ? app_sh[overrideShape] : {};
  const Button = ComponentUtility.getTouchable(typeOfButton);
  const { theme, themeMode } = useTheme();
  
  let ButtonChildren;
  let colors = React.useMemo(() => getButtonColors(themeMode), [themeMode]);
  activeColor = activeColor ? activeColor : defaultColor;
  let { btnColorStyle, lblColorStyle } = {
    btnColorStyle: { backgroundColor: isActive ? colors.active[activeColor].btn : colors.inactive[defaultColor].btn },
    lblColorStyle: { color: isActive ? colors.active[activeColor].lbl : colors.inactive[defaultColor].lbl }
  }
  let contentContainerStyle = {
    ...default_style,
    ...shape,
    ...btnColorStyle
  };

  let currentLabelStyle = lblColorStyle;

  if(isOnlyContent) {
    contentContainerStyle = shape;
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
    currentLabelStyle = colors.disable.type_1;
  }

  contentContainerStyle = ComponentUtility.mergeStyle(contentContainerStyle, props.style);
  ButtonChildren = isChildrenFunc
  ? children(isActive, currentLabelStyle)
  : hasStringChild
    ? <AppText style={currentLabelStyle}>{children}</AppText>
    : children

  props.underlayColor = props.underlayColor ? props.underlayColor : app_c.HEX.sub_third;

  const ButtonEx = withPreventDoubleClick(Button);

  return (
    <ButtonEx
      {...props}
      style={typeOfButton === "none" ? {} : contentContainerStyle}
    >
      {
        typeOfButton === "none"
        ? (
          <View style={contentContainerStyle}>
            {
              <>
                { ButtonChildren }
              </>
            }
          </View>
        )
        : (
          <>
            { ButtonChildren }
          </>
        )
      }
      
    </ButtonEx>
  )
}

export default RectangleButton