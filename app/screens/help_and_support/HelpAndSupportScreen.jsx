import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons, AntDesign,MaterialCommunityIcons } from "react-native-vector-icons";

import styles from "./HelpAndSupportScreenStyles";
import DropDown from "components/drop_down/DropDown";

const HelpAndSupportScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.dropdown_container }}>
        <DropDown
          name={"Send e-mail"}
          icon={<AntDesign name="mail" size={25} />}
          isDrop={false}
        />
      </View>
      <View style={{ ...styles.dropdown_container }}>
        <DropDown
          name={"How to use this app ?"}
          icon={<AntDesign name="questioncircleo" size={25} />}
          isDrop={false}
        />
      </View>
      <View style={{...styles.dropdown_container}}> 
          <DropDown 
            isParagraph={true}
            name={"F.A.Q"}
            icon={<MaterialCommunityIcons name="message-question-outline" size={25}/>}
            paragraphTitle={"Ứng dụng DongNai Travel của trường đại học Công Nghệ Đồng Nai đạt giải nhất cuộc thi sáng tạo khoa học công nghệ"}
            children={"Nhóm nghiên cứu sản phẩm ứng dụng công nghệ của trường đại học Công Nghệ Đồng Nai vừa xuất sắc nhận được giải nhất sáng tạo khoa học công nghệ do tỉnh tổ chức"}
          />
        </View>
    </View>
  );
};

export default HelpAndSupportScreen;
