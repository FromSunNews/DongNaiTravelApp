import { AppText } from "components"
import React, { useState, useRef, memo } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native"
import { Entypo, AntDesign } from "react-native-vector-icons"

import { app_c, app_typo } from "globals/styles"
import styles from "./DropDownStyle"
import { selectCurrentSetting, updateDarkMode, updateNotification } from "redux/setting/SettingSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { selectCurrentLanguage } from "../../redux/language/LanguageSlice"
import { toggleTheme } from "redux/theme/ThemeSlice"
import useTheme from "customHooks/useTheme"

const DropDown = ({
  name,
  isMode = false,
  isParagraph = false,
  children,
  icon,
  isDrop = true,
  handlePressButton = () => {},
  paragraphTitle,
  idOption,
  isFromFollowing=false,
  isComment,
  isEvent,
}) => {
  const langCode = useSelector(selectCurrentLanguage).languageCode
  //theme
  var themeColor = useTheme();
  //current setting
  const currentSetting = useSelector(selectCurrentSetting)
  const dispatch = useDispatch()
  
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [btnBgColor, setBtnBgColor] = useState(themeColor.ext_primary)
 

  useEffect(() => {
    if (idOption ==='UPDATE_FROM_FOLLOWING' ) {
      setSelectedOption(currentSetting.notification.updateFromFollowing)
    }
    if (idOption === 'COMMENTS') {
      setSelectedOption(currentSetting.notification.comments)
    }
    if (idOption === 'EVENTS') {
      setSelectedOption(currentSetting.notification.events)
    }
    if (idOption === 'DARK_MODE') {
      setSelectedOption(currentSetting?.darkMode)
    }
  }, [currentSetting,themeColor]) //theme Color rang` buoc khi mau theme bi thay doi se re-render lai giao dien

  const handleOptionChange = () => {
    let data 
    // cat nhat state
    if (idOption === 'DARK_MODE') {
      console.log( `DARK_MODE`)
      data = !selectedOption
      dispatch(updateDarkMode(data))
      dispatch(toggleTheme()) //button thay doi theme
    } else {
      if (idOption ==='UPDATE_FROM_FOLLOWING')
      {
        console.log( `FromFollowing`)
        data = {
          ...currentSetting.notification,
          updateFromFollowing: !selectedOption
        }
      }
      if (idOption ==='COMMENTS')
      {
        console.log( `Comment`)
        data = {
          ...currentSetting.notification,
          comments: !selectedOption
        }
      }
      if (idOption ==='EVENTS')
      {
        console.log( `Event`)
        data = {
          ...currentSetting.notification,
          events: !selectedOption
        }
      }
      console.log("🚀 ~ file: DropDown.jsx:85 ~ handleOptionChange ~ data:", data)
      dispatch(updateNotification(data))
    }
  }

  // Thêm dòng này để cho phép LayoutAnimation hoạt động trên Android
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    // set background color for dropdown when onPress
    if (!isOpen) {
      // setBtnBgColor(themeColor.sub_third)
    } else {
      // setBtnBgColor(themeColor.ext_primary)
    }
    if (!isDrop) {
      handlePressButton()
      // setBtnBgColor(themeColor.ext_primary)
    }
    // Sử dụng hàm `LayoutAnimation.configureNext` để thiết lập kiểu animation cho dropdown
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={{ ...styles.dropdown_btn, backgroundColor: app_c.HEX.ext_primary }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "90%",
          }}
        >
          <Text style={{ ...styles.dropdown_label,color:themeColor.fourth}}>
            {icon}
            <View style={{ alignItems: "center", paddingLeft: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: themeColor.fourth,
                  fontWeight: "500",
                }}
              >
                {name}
              </Text>
            </View>
          </Text>
          {isMode && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedOption ? (
                <AppText style={{...styles.dropdown_label,...styles.dropdown_label_mode,color:themeColor.fourth}}>{langCode === 'vi' ? 'Bật' : 'On'}</AppText>
              ) : (
                <AppText style={{...styles.dropdown_label,...styles.dropdown_label_mode,color:themeColor.fourth}}>{langCode === 'vi' ? 'Tắt' : 'Off'}</AppText>
              )}
            </View>
          )}
        </View>
        {isOpen && isDrop ? (
          <AntDesign name="down" size={22} color={themeColor.fourth} />
        ) : (
          <AntDesign name="right" size={22} color={themeColor.fourth} />
        )}
      </TouchableOpacity>
      {isOpen && isDrop && (
        <View style={{ paddingTop: 12 }}>
          {isMode &&
            <>
              <TouchableOpacity
                onPress={() => {
                  if (!selectedOption)
                    handleOptionChange()
                }}
              >
                <View style={styles.dropdown_content}>
                <View style={[styles.circle_outline, { borderColor: themeColor.fourth }]}>
                  {selectedOption && <View style={[styles.circle, { backgroundColor: themeColor.fourth }]}></View> }
                  </View>
                  <Text style={[styles.option_name,{color:themeColor.fourth}]}>{langCode === 'vi' ? 'Bật' : 'On'}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (selectedOption)
                    handleOptionChange()
                }}
              >
                <View style={styles.dropdown_content}>
                  <View style={[styles.circle_outline,{borderColor: themeColor.fourth}]}>
                    {!selectedOption && <View style={[styles.circle, {backgroundColor: themeColor.fourth}]}></View> }
                  </View>
                  <Text style={[styles.option_name,{color:themeColor.fourth}]}>{langCode === 'vi' ? 'Tắt' : 'Off'}</Text>
                </View>
              </TouchableOpacity>
            </>
          }
          {isParagraph && (
            <View style={{ paddingLeft: 12 }}>
              <Text
                numberOfLines={2}
                style={{
                  ...app_typo.fonts.normal.bolder.h5,
                  color: themeColor.fourth,
                  paddingBottom: 4,
                }}
              >
                {paragraphTitle}
              </Text>
              <Text
                style={{
                  ...app_typo.fonts.normal.normal.sub0,
                  color: themeColor.fourth
                }}
              >
                {children}
              </Text>
            </View>
          )}
          <View
            style={{
              borderBottomWidth: 1.5,
              borderBottomColor: themeColor.ext_third,
              marginTop: 12,
            }}
          ></View>
        </View>
      )}
    </View>
  )
}

export default memo(DropDown) 
