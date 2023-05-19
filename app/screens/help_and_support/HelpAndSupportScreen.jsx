import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons, AntDesign,MaterialCommunityIcons } from "react-native-vector-icons";

import styles from "./HelpAndSupportScreenStyles";
import DropDown from "components/drop_down/DropDown";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../redux/language/LanguageSlice";
import useTheme from "customHooks/useTheme";

const HelpAndSupportScreen = () => {
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.settingHelpAndSupport
  //theme
  const themeColor = useTheme();

  return (
    <View style={[styles.container,{backgroundColor: themeColor.primary}]}>
      <View style={{ ...styles.dropdown_container }}>
        <DropDown
          name={langData.send_email[langCode]}
          icon={<AntDesign name="mail" size={25} />}
          isDrop={false}
        />
      </View>
      <View style={{ ...styles.dropdown_container }}>
        <DropDown
          name={langData.how_to_use_this_app[langCode]}
          icon={<AntDesign name="questioncircleo" size={25} />}
          isDrop={false}
        />
      </View>
      <View style={{...styles.dropdown_container}}> 
          <DropDown 
            isParagraph={true}
            name={langData.f_a_q[langCode]}
            icon={<MaterialCommunityIcons name="message-question-outline" size={25}/>}
            paragraphTitle={langData.f_a_q_paragraphTitle[langCode]}
            children={langData.f_a_q_children[langCode]}
          />
        </View>
    </View>
  );
};

export default HelpAndSupportScreen;
