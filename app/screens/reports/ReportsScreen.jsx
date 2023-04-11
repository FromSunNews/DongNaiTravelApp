import { View, Text } from "react-native";
import React from "react";
import styles from "./ReportsScreenStyle";
import { MaterialIcons,Feather } from "react-native-vector-icons";

import DropDown from "components/drop_down/DropDown";

const ReportsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.dropdown_container }}>
        <DropDown
          isParagraph={true}
          name={"Reports about others"}
          icon={<Feather name="alert-octagon" size={25} />}
          paragraphTitle={
            "Ứng dụng DongNai Travel của trường đại học Công Nghệ Đồng Nai đạt giải nhất cuộc thi sáng tạo khoa học công nghệ"
          }
          children={
            "Nhóm nghiên cứu sản phẩm ứng dụng công nghệ của trường đại học Công Nghệ Đồng Nai vừa xuất sắc nhận được giải nhất sáng tạo khoa học công nghệ do tỉnh tổ chức"
          }
        />
      </View>
      <View style={{ ...styles.dropdown_container }}>
        <DropDown
          isParagraph={true}
          name={"Your Alerts"}
          icon={<MaterialIcons name="report-problem" size={25} />}
          paragraphTitle={
            "Ứng dụng DongNai Travel của trường đại học Công Nghệ Đồng Nai đạt giải nhất cuộc thi sáng tạo khoa học công nghệ"
          }
          children={
            "Nhóm nghiên cứu sản phẩm ứng dụng công nghệ của trường đại học Công Nghệ Đồng Nai vừa xuất sắc nhận được giải nhất sáng tạo khoa học công nghệ do tỉnh tổ chức"
          }
        />
      </View>
    </View>
  );
};

export default ReportsScreen;
