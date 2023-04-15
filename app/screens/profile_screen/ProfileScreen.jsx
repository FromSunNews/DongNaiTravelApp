import React from "react";
import { useState ,useRef,useEffect} from "react";
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
  Animated 
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
import * as FileSystem from 'expo-file-system';



import { Header,AppText, AppHeader, RectangleButton } from "components";
import styles from "./ProfileScreenStyle";
import { app_c, app_dms, app_sp } from "globals/styles";
import { choiceSettingImage } from "utilities/choiceSettingImage";
import ModalShowImage from "components/modal_show_image/ModalShowImage";
import { BottomSheetScroll } from "components";
import { HorizontalBlogCard } from "components";
import { updateUserAPI } from "request_api";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateCurrentUser } from "redux/user/UserSlice";
import { updateNotif } from "redux/manifold/ManifoldSlice";
import { Buffer } from 'buffer'

//Đức: sử dụng expo picker để chọn ảnh tử local để upload lên
const imageCover = {
  uri: "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

const userBlogData= [
  {
    id: 'b1',
    user: {
      id: 'user1',
      name: 'Lost Teach',
      avatar: ''
    },
    name: 'Top 10 dia diem neu ghe qua khi du lich o Dong Nai',
    avatar: '',
    createdAt: 1675908513000,
    readTime: 480,
    isLiked: true
  },
  {
    id: 'b2',
    user: {
      id: 'user1',
      name: 'Lost Teach',
      avatar: ''
    },
    name: 'Top 10 dia diem neu ghe qua khi du lich o Dong Nai',
    avatar: '',
    createdAt: 1675908513000,
    readTime: 480,
    isLiked: true
  },
]

const user = {
  userId: 1,
  userName: "Thai Anh Duc",
  userInFo: {
    userFollower: 20,
    userFollowing: 2,
    userAddress: "Bien Hoa - Dong Nai",
  },
  userSocial: {
    userFacebook: "https://www.facebook.com/profile.php?id=100016839395108",
    userYoutube: "https://www.facebook.com/profile.php?id=100016839395108",
    userInstagram: "https://www.instagram.com/thai.a.duc/",
  },
  userBio: "Thích màu hồng",
};


function ProfileScreen({ route, navigation }) {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [openTermCondition, setOpenTermCondition] = useState(false);
  const [image, setImage] = useState(imageCover.uri);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadImageType, setUploadImageType] = useState(null)
  // useEffect(() => {
  //   // request permission to access media library if it hasn't been granted
  //   (async () => {
  //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('Sorry, we need media library permissions to make this work!');
  //     }
  //   })();
  // }, []);

  async function pickImageFromLibrary() {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      setUploadImageType(null)
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: uploadImageType === 'UploadCoverPhoto' ? [4, 3] : [4, 4],
        quality: 0.5,
        base64: true
      });
  
      if (!result.canceled) {
        console.log(result.assets[0])
        //  Khi lấy được uri dạng base64 r thì mới đầu cập nhật ảnh trước để đáp ứng UI
        setSelectedImage(result.assets[0].uri);
        // Sau đó tiếp tục callapi để chuyển base64 về cho BE xử lý

        let dataToUpdate 
        if (uploadImageType === 'UploadCoverPhoto') {
          dataToUpdate = {
            currentUserId: currentUser._id ?? null,
            coverPhoto: result.assets[0].base64
          }
        } else if (uploadImageType === 'UploadAvatar') {
          dataToUpdate = {
            currentUserId: currentUser._id ?? null,
            avatar: result.assets[0].base64
          }
        }
        await updateUserAPI(dataToUpdate).then((dataUser) => {
          // Cập nhật state user
          dispatch(updateCurrentUser(dataUser))
        }).catch((err) => {
          dispatch(updateNotif({
            appearNotificationBottomSheet: true,
            contentNotificationBottomSheet: `An error occurred while uploading the photo!. ${err}`
          }))
        })
      } else {
        setUploadImageType(null)
      }
    }
  }

  // take photo from camera
  // async function pickImageFromCamera() {
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setSelectedImage(result.uri);
  //     saveImage(result.uri);
  //   }
  // }

  // // save image to local storage
  // async function saveImage(uri) {
  //   const filename = uri.split('/').pop(); // get the filename of the image
  //   const destination = `${FileSystem.documentDirectory}${filename}`; // create a path to the destination in local storage
  //   await FileSystem.copyAsync({ from: uri, to: destination }); // copy the image to local storage
  // }
  return (
    <>
      <ScrollView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={{ ...app_dms.screenWidth }}>
            <View>
              <View style={[{ height: 210, width: "100%", overflow:'hidden' ,backgroundColor:'#00000087'}]}>
              {currentUser.coverPhoto && (
                <ModalShowImage url={currentUser.coverPhoto} />
              )}
             
              </View>
              <TouchableOpacity
                style={styles.circle_icon}
                onPress={() => {
                  setUploadImageType('UploadCoverPhoto')
                  setOpenTermCondition(!openTermCondition)
                }}
              >
                <AntDesign name="camerao" style={styles.icon_camera} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profile_avatar}>
            <View style={styles.circle_avatar}>
              {currentUser.avatar && (
                <Image 
                  source={{uri: currentUser.avatar}}
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    resizeMode: 'cover'
                  }}
                  
                />
              )}
              <TouchableOpacity
                style={styles.avatar_icon}
                onPress={() => {
                  setUploadImageType('UploadAvatar')
                  setOpenTermCondition(!openTermCondition)
                }}
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
              <Text style={styles.user_name}>{user.userName}</Text>
            </View>
            <View style={styles.user_info_follow}>
              <Text style={styles.user_follower}>
                {user.userInFo.userFollower} Follower
              </Text>
              <Text>
                <Entypo name="dot-single" size={20} color={app_c.HEX.fourth} />
              </Text>
              <Text style={styles.user_following}>
                {user.userInFo.userFollowing} Following
              </Text>
            </View>
            <View style={styles.round_rectang_button_container}>
              <RectangleButton
                overrideShape="rounded_8"
                isActive
                activeColor="type_1"
                typeOfButton="opacity"
              >
                {(isActive, currentLabelStyle) => (
                  <Text style={currentLabelStyle}>View Stats</Text>
                )}
              </RectangleButton>
              <RectangleButton
                overrideShape="rounded_8"
                typeOfButton="opacity"
                handlePressButton={() => navigation.navigate("EditProfile")}
              >
                {(isActive, currentLabelStyle) => (
                  <Text style={[currentLabelStyle, {paddingHorizontal: 16}]}>
                    <Feather name="edit-2" /> Edit Profile
                  </Text>
                )}
              </RectangleButton>
              <RectangleButton overrideShape="rounded_8" typeOfButton="opacity">
                {(isActive, currentLabelStyle) => (
                  <Text
                    style={[currentLabelStyle]}
                  >
                    <Entypo name="dots-three-vertical" size={20} />
                  </Text>
                )}
              </RectangleButton>
            </View>
            <View style={styles.user_infos}>
              <View style={styles.user_info_block}>
                <Text style={styles.user_info_title}>Bio</Text>
                <Text style={styles.user_bio_content}>{user.userBio}</Text>
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
                    <Text>Live in </Text>
                    <Text style={styles.user_info_address}>
                      {user.userInFo.userAddress}
                    </Text>
                  </Text>
                </View>
                <View style={styles.user_info_other}>
                  <MaterialCommunityIcons
                    style={styles.user_info_other_icon}
                    name="facebook"
                  />
                  <Text
                    key={1}
                    style={styles.user_info_other_content}
                    hyperLink={user.userSocial.userFacebook}
                  >
                    {user.userSocial.userFacebook}
                  </Text>
                </View>
                <View style={styles.user_info_other}>
                  <Entypo
                    style={styles.user_info_other_icon}
                    name="instagram"
                  />
                  <Text
                    key={2}
                    style={styles.user_info_other_content}
                    hyperLink={user.userSocial.userInstagram}
                  >
                    {user.userSocial.userInstagram}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.line_horizontal}></View>
          </View>
          <View style={styles.blog_block}>
            <TouchableOpacity style={styles.btn_create_blog}>
              <MaterialCommunityIcons
                style={{ color: app_c.HEX.ext_second, marginRight: 6 }}
                name="pencil-outline"
                size={18}
              />
              <Text style={styles.btn_create_blog_name}>Write new blog</Text>
            </TouchableOpacity>
            <TouchableOpacity e={styles.btn_manage_blog}>
              <Text style={styles.btn_manage_blog_name}>Manage blogs</Text>
            </TouchableOpacity>
            <View style={styles.blogs_list}>
              <View style={styles.blog_title_container}>
                <Text style={styles.blog_title}>Blogs</Text>
              </View>
              <View style={styles.blog_container}>
                {
                  userBlogData.map(blog=>(
                    <HorizontalBlogCard key={blog.id} blog={blog}/>
                  ))
                }
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
              onPress={pickImageFromLibrary}
            >
              <Entypo
                name="images"
                size={25}
                style={styles.choice_setting_icon}
              />
              <Text style={styles.choice_setting_image_name}>
                Chọn ảnh từ thư viện
              </Text>
            </TouchableOpacity> 
          </View>
        }
      />
    </>
  );
}

export default ProfileScreen;
