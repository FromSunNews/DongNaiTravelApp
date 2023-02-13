import { 
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ImageBackground,
  Linking,
  StyleSheet
} from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import AppText from '../app_text/AppText'

import styles from './ButtonsStyles'
import { app_sp, app_sh, app_c } from 'globals/styles'

const default_style = {
  width: '100%',
  minHeight: 72,
  overflow: 'hidden',
  ...app_sh.rounded_8
}

const banner_button_styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...app_sp.p_12,
  },
  
  lbl_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%'
  },
});

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Banner Button là một nút lớn trong app, có thể có background (ảnh), button này bao gồm 2 icon (trái và phải), text và background.
 * Được sử dụng ở những nơi đặc biệt, thường là để đi tới một nơi nào đó (như screen khác, app khác).
 * @param {object} props - Props của component.
 * @param {string} props.children - là slogan, quote các thứ của banner.
 * @param {boolean} [props.isActive=false] - Nút có được ấn hay chưa?
 * @param {boolean} [props.isDisable=false] - Nút có được bật hay không?
 * @param {boolean} [props.isTransparent=false] - Nút có background color hay không?
 * @param {boolean} [props.isOnlyContent=false] - Nút có container bọc ở ngoài hay là không?
 * @param {boolean} [props.isChangeColorWhenActive=false] - Khi được active (focus) thì nút có đổi màu không hay không? Mặc định là không.
 * @param {'none' | 'opacity' | 'highlight'} [props.typeOfButton=none] - Loại nút.
 * @param {'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5'} [props.defaultColor=type_1] - Màu nút bình thường (mặc định).
 * @param {'type_1' | 'type_2'} [props.activeColor=type_1] - Màu nút khi khi được focus (active).
 * @param {string} [props.imageUrl=] - đường dẫn ảnh làm background cho button.
 * @param {string} [props.fontOfText=body3] - Font chữ, xem thêm trong `typography.js`.
 * @param {string}  props.hyperLink - Function xử lý việc navigate sang app khác.
 * @param {object}  props.toScreen - Một object chứa thông tin của route khác.
 * @param {string}  props.toScreen.screenName - Tên của screen muốn navigate tới.
 * @param {object}  props.toScreen.params - Params muốn truyền cho screen.
 * @param {StyleProp<ViewStyle>} [props.style={}] - Custom style cho button, không can thiệp vào các thuộc tính mặc định.
 * @param {(isActive: boolean, currentLabelStyle: StyleProp<TextStyle>) => JSX.Element} props.setLeftIcon - Function set icon bên trái cho nút.
 * @param {(isActive: boolean, currentLabelStyle: StyleProp<TextStyle>) => JSX.Element} props.setRightIcon - Function set icon bên trái cho nút.
 * @param {() => void} props.handlePressButton - Function xử lý sự kiện cho Banner button.
 * @returns Trả về `TouchableOpacity` Component có chữ, ảnh, icon và style (bao gồm fontSize đã được tuỳ chỉnh).
 */
const BannerButton = ({
  children,
  isActive = false,
  isDisable = false,
  isTransparent = false,
  isOnlyContent = false,
  isChangeColorWhenActive = false,
  typeOfButton = "none",
  defaultColor = "type_1",
  activeColor = "type_1",
  fontOfText = "body3",
  imageUrl = "",
  hyperLink,
  toScreen = { screenName: "", params: {} },
  style = {},
  setLeftIcon,
  setRightIcon,
  handlePressButton
}) => {
  let canLoadLeftIcon = typeof setLeftIcon === 'function' && React.isValidElement(setLeftIcon());
  let canLoadRightIcon = typeof setRightIcon === 'function' && React.isValidElement(setRightIcon());

  if(isDisable) {
    return (
      <TouchableOpacity
        disabled={isDisable}
        style={{...style, ...default_style, ...styles.btn_disable}}
      >
        <ImageBackground source={{url: `${imageUrl}`}} resizeMode="cover" style={banner_button_styles.image}>
          <View style={banner_button_styles.lbl_container}>
            {canLoadLeftIcon && setLeftIcon(isActive = false, styles.lbl_disable)}
            {
              canLoadLeftIcon
              ? <AppText font={fontOfText} style={{...styles.lbl_disable, ...app_sp.ms_8}} numberOfLines={2}>{children}</AppText>
              : <AppText font={fontOfText} style={styles.lbl_disable} numberOfLines={2}>{children}</AppText>
            }
          </View>
          {canLoadRightIcon && setRightIcon(isActive = false, styles.lbl_disable)}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  
  let handlePressBannerButton = handlePressButton;
  let currentButtonStyle = currentButtonStyle = {...style, ...default_style, ...styles[`btn_default_${defaultColor}`]};
  let currentLabelStyle = currentLabelStyle = styles[`lbl_default_${defaultColor}`];

  if(isChangeColorWhenActive) {
    currentButtonStyle = {
      ...style,
      ...default_style,
      ...(
        isActive
        ? styles[`btn_active_${activeColor}`]
        : styles[`btn_default_${defaultColor}`]
    )};
    currentLabelStyle = isActive ? styles[`lbl_active_${activeColor}`] : styles[`lbl_default_${defaultColor}`];
  }

  if(isOnlyContent) {
    currentButtonStyle = style;
  }

  if(isTransparent) {
    currentButtonStyle = {...style, ...default_style};
  }
  
  // Valid sau
  // Vì không thể ghi đè việc navigate của button, cho nên việc navigate sang app khác sẽ được ưu tiên hơn.
  if(hyperLink !== "" && hyperLink !== undefined) {
    handlePressBannerButton = () => {
      Linking.openURL(hyperLink);
    }
  }
  
  // Valid sau
  if(toScreen.screenName !== "" && toScreen.screenName !== undefined) {
    const navigation = useNavigation();
    handlePressBannerButton = () => {
      navigation.navigate(toScreen.screenName);
    }
  }

  let ButtonComponent = TouchableWithoutFeedback;
  let ButtonComponentProps;

  if(typeOfButton === "opacity") {
    ButtonComponent = TouchableOpacity;
  }

  if(typeOfButton === "highlight") {
    ButtonComponent = TouchableHighlight;
    ButtonComponentProps = {
      underlayColor: app_c.HEX.ext_third,
      style: currentButtonStyle
    }
  }

  return (
    <ButtonComponent
      {...ButtonComponentProps}
      onPress={handlePressBannerButton}
    >
      <View style={typeOfButton === "highlight" ? {flex: 1, flexDirection: 'row'} : currentButtonStyle}>
        <ImageBackground source={{url: `${imageUrl}`}} resizeMode="cover" style={banner_button_styles.image}>
          <View style={banner_button_styles.lbl_container}>
            {canLoadLeftIcon && setLeftIcon(isActive = false, currentLabelStyle)}
            {
                canLoadLeftIcon
                ? <AppText font={fontOfText} style={{...currentLabelStyle, ...app_sp.ms_8}} numberOfLines={2}>{children}</AppText>
                : <AppText font={fontOfText} style={currentLabelStyle} numberOfLines={2}>{children}</AppText>
              }
          </View>
          {canLoadRightIcon && setRightIcon(isActive, currentLabelStyle)}
        </ImageBackground>
      </View>
    </ButtonComponent>
  )
}

export default BannerButton