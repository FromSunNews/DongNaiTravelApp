import { AppText } from "components";
import React, { useState, useRef, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Entypo, AntDesign } from "react-native-vector-icons";

import { app_c, app_typo } from "globals/styles";
import styles from "./DropDownStyle";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentNotifications, updateComments, updateFromFollowing ,updateEvents} from "redux/setting/SettingSlice";
import { useEffect } from "react";

const options = [
  {
    label: "Bật",
    value: true,
  },
  {
    label: "Tắt",
    value: false,
  },
];



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
  const notifications=useSelector(selectCurrentNotifications)
  const dispatch = useDispatch()
  
  const[count,setCount]=useState(0)

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [btnBgColor, setBtnBgColor] = useState(app_c.HEX.ext_primary);
 

  useEffect(() => {
    if (idOption ==='UPDATE_FROM_FOLLOWING' ) {
      setSelectedOption(notifications.updateFromFollowing)
    }
    if (idOption === 'COMMENTS') {
      setSelectedOption(notifications.updateComments)
    }
    if (idOption === 'EVENTS') {
      setSelectedOption(notifications.updateEvents)
    }
  }, [])


  const handleOptionChange = () => {
    const data = !selectedOption
    // cat nhat giao die
    setSelectedOption(data)
    // cat nhat state
    if(idOption ==='UPDATE_FROM_FOLLOWING')
    {
      console.log( `FromFollowing ${data}`)
      dispatch(updateFromFollowing(data))
    }
    if(idOption ==='COMMENTS')
    {
      console.log( `Comment ${data}`)
      dispatch(updateComments(data))
    }
    if(idOption ==='EVENTS')
    {
      console.log( `Event ${data}`)
      dispatch(updateEvents(data))
    }
    console.log(notifications)
    setCount(count+1)
    console.log(count)
  };

  // Thêm dòng này để cho phép LayoutAnimation hoạt động trên Android
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // set background color for dropdown when onPress
    if (!isOpen) {
      setBtnBgColor(app_c.HEX.sub_third);
    } else {
      setBtnBgColor(app_c.HEX.ext_primary);
    }
    if (!isDrop) {
      handlePressButton(),
      setBtnBgColor(app_c.HEX.ext_primary);
    }
    // Sử dụng hàm `LayoutAnimation.configureNext` để thiết lập kiểu animation cho dropdown
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={{ ...styles.dropdown_btn, backgroundColor: btnBgColor }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "90%",
          }}
        >
          <Text style={{ ...styles.dropdown_label }}>
            {icon}
            <View style={{ alignItems: "center", paddingLeft: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: app_c.HEX.fourth,
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
              {!selectedOption ? (
                <AppText style={{...styles.dropdown_label,...styles.dropdown_label_mode,}}>Bật</AppText>
              ) : (
                <AppText style={{...styles.dropdown_label,...styles.dropdown_label_mode,}}>Tắt</AppText>
              )}
            </View>
          )}
        </View>
        {isOpen && isDrop ? (
          <AntDesign name="down" size={22} color={app_c.HEX.fourth} />
        ) : (
          <AntDesign name="right" size={22} color={app_c.HEX.fourth} />
        )}
      </TouchableOpacity>
      {isOpen && isDrop && (
        <View style={{ paddingTop: 12 }}>
          {isMode &&
            <>
              <TouchableOpacity
                onPress={() => handleOptionChange()}
              >
                <View style={styles.dropdown_content}>
                  <View style={styles.circle_outline}>
                    {!selectedOption && <View style={styles.circle}></View> }
                  </View>
                  <Text style={styles.option_name}>{!selectedOption ? 'Bật' : 'Tắt'}</Text>
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
                  color: app_c.HEX.fourth,
                  paddingBottom: 4,
                }}
              >
                {paragraphTitle}
              </Text>
              <Text
                style={{
                  ...app_typo.fonts.normal.normal.sub0,
                  color: app_c.HEX.fourth,
                }}
              >
                {children}
              </Text>
            </View>
          )}
          <View
            style={{
              borderBottomWidth: 1.5,
              borderBottomColor: app_c.HEX.ext_third,
              marginTop: 12,
            }}
          ></View>
        </View>
      )}
    </View>
  );
};

export default memo(DropDown) ;
