import { View, Text } from "react-native";
import React from "react";
import styles from "./ReportsScreenStyle";
import { MaterialIcons,Feather } from "react-native-vector-icons";

import DropDown from "components/drop_down/DropDown";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../redux/language/LanguageSlice";
import useTheme from "customHooks/useTheme";

const ReportsScreen = () => {
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.settingReport
  //theme
  const {themeColor} = useTheme();

  return (
    <View style={[styles.container,{backgroundColor: themeColor.bg_primary}]}>
      <View style={{ ...styles.dropdown_container }}>
        <DropDown
          isParagraph={true}
          name={langData.reports_about_others[langCode]}
          icon={<Feather name="alert-octagon" size={25} />}
          paragraphTitle={langData.report_about_paragraph_title[langCode]}
          children={langData.report_about_children[langCode]}
        />
      </View>
      <View style={{ ...styles.dropdown_container }}>
        <DropDown
          isParagraph={true}
          name={langData.your_alert[langCode]}
          icon={<MaterialIcons name="report-problem" size={25} />}
          paragraphTitle={langData.your_alert_paragraph_title[langCode]}
          children={langData.your_alert_children[langCode]}
        />
      </View>
    </View>
  );
};

export default ReportsScreen;
