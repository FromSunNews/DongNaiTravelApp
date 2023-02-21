import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
  Button,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  Fontisto,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Header, RoundedRectangleButton, BottomSheetScroll } from "components";
import styles from "./ProfileScreenStyle";
import { app_c, app_dms, app_sp } from "globals/styles";
import { choiceSettingImage } from "utilities/choiceSettingImage";

//Đức: sử dụng expo picker để chọn ảnh tử local để upload lên
const imageCover = {
  uri: "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

function Profile() {
  const [openTermCondition, setOpenTermCondition] = useState(false);
  const [image, setImage] = useState(imageCover.uri);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <>
      <ScrollView style={styles.wrapper}>
        <View style={styles.container}>
          <Header headerName="Profile" />
          <View style={{ ...app_dms.screenWidth }}>
            {image && (
              <View>
                <Image
                  source={{ uri: image }}
                  resizeMode="cover"
                  style={styles.imageCover}
                >
                </Image>
                  <TouchableOpacity
                    style={styles.circle_icon}
                    onPress={() => setOpenTermCondition(!openTermCondition)}
                  >
                    <AntDesign name="camerao" style={styles.icon_camera} />
                  </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.profile_avatar}>
            <View style={styles.circle_avatar}>
              <Ionicons
                name="ios-person-circle-outline"
                style={styles.avatar}
                color={app_c.HEX.fourth}
              />
              <TouchableOpacity
                style={styles.avatar_icon}
                onPress={() => setOpenTermCondition(!openTermCondition)}
              >
                <AntDesign
                  name="camerao"
                  style={styles.icon_camera}
                  color={app_c.HEX.fourth}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.user_block}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.user_name}>Người Dùng Năng Nổ</Text>
            </View>
            <View style={styles.user_info_follow}>
              <Text style={styles.user_follower}>5.6k Follower</Text>
              <Text>
                {" "}
                <Entypo name="dot-single" size={20} color={app_c.HEX.fourth} />
              </Text>
              <Text style={styles.user_following}>12 Following</Text>
            </View>
            <RoundedRectangleButton />
            <View style={styles.user_infos}>
              <View style={styles.user_info_block}>
                <Text style={styles.user_info_title}>Bio</Text>
                <Text style={styles.user_bio_content}>
                  Toi la nguoi da di khap 63 tinh thanh o Viet Nam. Chuyen
                  review cac dia diem du lich.
                </Text>
              </View>
            </View>
            <View style={styles.user_infos}>
              <View style={styles.user_info_block}>
                <Text style={styles.user_info_title}>Information</Text>
                <View style={styles.user_info_other}>
                  <AntDesign
                    style={styles.user_info_other_icon}
                    name="enviromento"
                  />
                  <Text style={styles.user_info_other_content}>
                    Live in{" "}
                    <Text style={styles.user_info_address}>
                      Bien Hoa - Dong Nai
                    </Text>
                  </Text>
                </View>
                <View style={styles.user_info_other}>
                  <Feather style={styles.user_info_other_icon} name="globe" />
                  <Text style={styles.user_info_other_content}>
                    nguoidungnang.com
                  </Text>
                </View>
                <View style={styles.user_info_other}>
                  <MaterialCommunityIcons
                    style={styles.user_info_other_icon}
                    name="facebook"
                  />
                  <Text style={styles.user_info_other_content}>
                    Nguoi Dung Nang No{" "}
                  </Text>
                </View>
                <View style={styles.user_info_other}>
                  <Entypo style={styles.user_info_other_icon} name="youtube" />
                  <Text style={styles.user_info_other_content}>
                    Nguoi Dung Nang No
                  </Text>
                </View>
                <View style={styles.user_info_other}>
                  <AntDesign
                    style={styles.user_info_other_icon}
                    name="enviromento"
                  />
                  <Text style={styles.user_info_other_content}>
                    Nguoi Dung Nang No
                  </Text>
                </View>
                <View style={styles.user_info_other}>
                  <Entypo
                    style={styles.user_info_other_icon}
                    name="instagram"
                  />
                  <Text style={styles.user_info_other_content}>ngd.nangno</Text>
                </View>
              </View>
            </View>
            <View style={styles.line_horizontal}></View>
          </View>
          <View style={styles.blog_block}>
            <TouchableOpacity style={styles.btn_create_blog}>
              <MaterialCommunityIcons
                style={{ color: app_c.HEX.ext_second, ...app_sp.ph_1 }}
                name="pencil-outline"
                size={18}
              />
              <Text style={styles.btn_create_blog_name}>Write new blog</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_manage_blog}>
              <Text style={styles.btn_manage_blog_name}>Manage blogs</Text>
            </TouchableOpacity>
            <View style={styles.blogs_list}>
              <View style={styles.blog_title_container}>
                <Text style={styles.blog_title}>Blogs</Text>
              </View>
              <View style={styles.blog_container}>
                <Text>Đây là nơi chứa bài blog</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheetScroll
        haveBtn={false}
        openTermCondition={openTermCondition}
        snapPoints={["25%", "50%", "74%"]}
        closeTermCondition={() => {
          setOpenTermCondition(false);
        }}
        childView={
          <View>
            <TouchableOpacity 
              style={styles.choice_setting_image}
              onPress={pickImage}
            >
              <Entypo
                  name='images'
                  size={25}
                  style={styles.choice_setting_icon}
                />
                <Text style={styles.choice_setting_image_name}>Camera</Text>
              </TouchableOpacity>
            <TouchableOpacity 
              style={styles.choice_setting_image}
              onPress={pickImage}
            >
              <Entypo
                  name='images'
                  size={25}
                  style={styles.choice_setting_icon}
                />
                <Text style={styles.choice_setting_image_name}>Chọn ảnh từ thư viện</Text>
              </TouchableOpacity>
            <TouchableOpacity 
              style={styles.choice_setting_image}
              onPress={pickImage}
            >
              <Entypo
                  name='images'
                  size={25}
                  style={styles.choice_setting_icon}
                />
                <Text style={styles.choice_setting_image_name}>Chỉnh sửa ảnh</Text>
              </TouchableOpacity>
          </View>
          //   choiceSettingImage.map((item) => (
          //   <>
          //     <TouchableOpacity style={styles.choice_setting_image} key={item.id}>
          //       <Entypo
          //         name={item.icon}
          //         size={25}
          //         style={styles.choice_setting_icon}
          //       />
          //       <Text style={styles.choice_setting_image_name}>
          //         {item.nameChoice}
          //       </Text>
          //     </TouchableOpacity>
          //     <Button
          //       title="Pick an image from camera roll"
          //       onPress={pickImage}
          //     />

          //   </>
          // ))
        }
      />
    </>
  );
}

export default Profile;
