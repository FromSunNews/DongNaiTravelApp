
import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, Fontisto, Entypo, Feather, MaterialCommunityIcons } from 'react-native-vector-icons'
import { Header, RoundedRectangleButton } from "components";
import styles from "./ProfileScreenStyle";
import { app_c, app_dms, app_sp } from "globals/styles";
const imageCover = require('../../assets/images/imageCover.png');


function Profile() {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
      <Header headerName='Profile' />
        <View>
          <ImageBackground source={imageCover} resizeMode="cover" style={styles.imageCover}>
            <TouchableOpacity style={styles.circle_icon}><AntDesign name="camerao" style={styles.icon_camera} /></TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.profile_avatar}>
          <View style={styles.circle_avatar}>
            <Ionicons name="ios-person-circle-outline" style={styles.avatar} color={app_c.HEX.fourth} />
            <TouchableOpacity style={styles.avatar_icon}>
              <AntDesign name="camerao" style={styles.icon_camera} color={app_c.HEX.fourth} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.user_block}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.user_name}>Người Dùng Năng Nổ</Text>
          </View>
          <View style={styles.user_info_follow}>
            <Text style={styles.user_follower}>5.6k Follower</Text>
            <Text> <Entypo name="dot-single" size={20} color={app_c.HEX.fourth} /></Text>
            <Text style={styles.user_following}>12 Following</Text>
          </View>
          <RoundedRectangleButton />
          <View style={styles.user_infos}>
            <View style={styles.user_info_block}>
              <Text style={styles.user_info_title}>Bio</Text>
              <Text style={styles.user_bio_content}>
                Toi la nguoi da di khap 63 tinh thanh o Viet Nam. Chuyen review cac dia diem du lich.
              </Text>
            </View >
          </View>
          <View style={styles.user_infos}>
            <View style={styles.user_info_block}>
              <Text style={styles.user_info_title}>Information</Text>
              <View style={styles.user_info_other}>
                <AntDesign style={styles.user_info_other_icon} name="enviromento" />
                <Text style={styles.user_info_other_content}>Live in <Text style={styles.user_info_address}>Bien Hoa - Dong Nai</Text></Text>
              </View>
              <View style={styles.user_info_other}>
                <Feather style={styles.user_info_other_icon} name="globe" />
                <Text style={styles.user_info_other_content}>nguoidungnang.com</Text>
              </View>
              <View style={styles.user_info_other}>
                <MaterialCommunityIcons style={styles.user_info_other_icon} name="facebook" />
                <Text style={styles.user_info_other_content}>Nguoi Dung Nang No </Text>
              </View>
              <View style={styles.user_info_other}>
                <Entypo style={styles.user_info_other_icon} name="youtube" />
                <Text style={styles.user_info_other_content}>Nguoi Dung Nang No</Text>
              </View>
              <View style={styles.user_info_other}>
                <AntDesign style={styles.user_info_other_icon} name="enviromento" />
                <Text style={styles.user_info_other_content}>Nguoi Dung Nang No</Text>
              </View>
              <View style={styles.user_info_other}>
                <Entypo style={styles.user_info_other_icon} name="instagram" />
                <Text style={styles.user_info_other_content}>ngd.nangno</Text>
              </View>
            </View >
          </View>
          <View style={styles.line_horizontal}></View>
        </View>
        <View style={styles.blog_block}>
          <TouchableOpacity style={styles.btn_create_blog}>
            <MaterialCommunityIcons style={{color:app_c.HEX.ext_second,...app_sp.ph_1}} name="pencil-outline" size={18}/>
            <Text style={styles.btn_create_blog_name}>Write new blog</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_manage_blog}>
            <Text style={styles.btn_manage_blog_name}>Manage blogs</Text>
          </TouchableOpacity>
          <View style={styles.blogs_list}>
            <View style={styles.blog_title_container}>
              <Text style={styles.blog_title}>Blogs</Text>
            </View>
            <View style={styles.blog_container}><Text>Đây là nơi chứa bài blog</Text></View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile; 
