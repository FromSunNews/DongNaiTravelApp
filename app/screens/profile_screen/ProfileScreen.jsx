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
import { createNewNotifAPI } from "../../request_api";
import { socketIoInstance } from "../../../App";
import { useRoute } from "@react-navigation/native";
import { cloneDeep } from 'lodash'
import { selectCurrentLanguage } from "../../redux/language/LanguageSlice";
import useTheme from "customHooks/useTheme";
import { selectCurrentMode } from "redux/theme/ThemeSlice";

function ProfileScreen({ route, navigation}) {
  const userSelector = useSelector(selectCurrentUser)
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.blogScreenSetting
  //theme
  const themeMode = useSelector(selectCurrentMode).mode
  console.log("🚀 ~ file: ProfileScreen.jsx:56 ~ ProfileScreen ~ themeMode:", themeMode)
  const themeColor = useTheme();
  
  const [currentUser, setCurrentUser] = useState(null)
  const [isFollowed, setIsFollowed] = useState(null)
  const [isMyProfile, setIsMyProfile] = useState(null)

  const dispatch = useDispatch()
  const [openTermCondition, setOpenTermCondition] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadImageType, setUploadImageType] = useState(null)
  
  useEffect(() =>{
    // nếu có userVisited có nghĩa là đang xem profile của thằng khác
    if (route.params?.userVisited) {
      console.log("===========================================route.params?.userVisited=====================================================")
      
      setCurrentUser(route.params?.userVisited)
      const exsistId = userSelector.followingIds.find(id => id === route.params?.userVisited._id)
      if (exsistId) 
        setIsFollowed(true)
      else 
        setIsFollowed(false)

      setIsMyProfile(false)
    } else {
      console.log("====================================user=========================================================")
      console.log("🚀 ~ file: ProfileScreen.jsx:65 ~ useEffect ~ userSelector:", userSelector)
      setCurrentUser(userSelector)
      setIsMyProfile(true)
    }
  }, [])

  useEffect(() =>{
    // khi user thay đổi thì set lại giá trị
    if (!route.params?.userVisited) {
      setCurrentUser(userSelector)
      setIsMyProfile(true)
    }
  }, [userSelector])

  useEffect(() =>{
    // khi userVisited thay đổi thì set lại giá trị (thường là khi nhấp vào một cái profile mà nó đã chauws thông tin thằng khác trước đó)
    if (route.params?.userVisited) {
      setCurrentUser(route.params?.userVisited)
      setIsMyProfile(false)
      const exsistId = userSelector.followingIds.find(id => id === route.params?.userVisited._id)
      if (exsistId) 
        setIsFollowed(true)
      else 
        setIsFollowed(false)
    }
  }, [route.params?.userVisited])

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
          dispatch(updateCurrentUser(dataUser.updatedUser))
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

  
  const handleFollowUser = async () => {
    //  Thang phuong 111
    const userId = '643e346dc7320343a784522b'
    const {_id, displayName, avatar} = userSelector
    const data = {
      // userReceivedId: currentUser._id,
      userReceivedId: currentUser._id,
      userSentId: _id,
      typeNofif: 'FOLLOW',
      userSent: {
        _id,
        displayName,
        avatar
      },
      desc: {
        en: 'She has started following your profile',
        vi: 'Cô ấy đã bắt đầu theo dõi trang cá nhân của bạn'
      }
    }
    // Khi bấm vào Follow user thì truyền _id của user mình muốn follow về BE
    await createNewNotifAPI(data).then((dataUser) => {
      console.log("🚀 ~ file: ProfileScreen.jsx:109 ~ awaitupdateUserAPI ~ dataUser:", dataUser)
      // Cập nhật state user
      if (dataUser.userSent) {
        dispatch(updateCurrentUser(dataUser.userSent))
      }
      if (dataUser.notif && dataUser.userReceived) {
        // set lại userCurrent(đây là user mình đang follow)
        setCurrentUser(dataUser.userReceived)
        setIsFollowed(true)
        
        // Sau đó emit 1 sự kiện để thằng user mình follow nhận được thông báo
        socketIoInstance.emit('c_notification_to_user', {
          notif: dataUser.notif,
          userReceived: dataUser.userReceived
        })
      }
      
    }).catch((err) => {
      dispatch(updateNotif({
        appearNotificationBottomSheet: true,
        contentNotificationBottomSheet: `An error occurred while follow this user!${err}`
      }))
    })
  }


  const handleUnFollowUser = async () => {
    
    // Cập nhật UI của user bị mình unfollow
    const initialCurrentUserClone = cloneDeep(currentUser)
    const currentUserClone = cloneDeep(currentUser)
    
    const followerIds = currentUserClone.followerIds.filter(id => id !== userSelector._id)
    currentUserClone.followerIds = followerIds
    setCurrentUser(currentUserClone)

    // Cập nhật cho mình
    const initialUserClone = cloneDeep(userSelector)
    const userSelectorClone = cloneDeep(userSelector)
    const followingIds = userSelectorClone.followingIds.filter(id => id !== currentUser._id)
    userSelectorClone.followingIds = followingIds
    // Cập nhật state của mình
    dispatch(updateCurrentUser(userSelectorClone))

    // Cập nhật nút Follow
    setIsFollowed(false) 

    // call api
    await updateUserAPI({
      currentUserId: userSelector._id,
      userUnFollowId: currentUser._id, 
    }).catch((err) => {
      // Cập nhật lại hết tất cả các giá trị ban đầu nếu mà call api lỗi 
      setCurrentUser(initialCurrentUserClone)
      dispatch(updateCurrentUser(initialUserClone))
      setIsFollowed(true) 
    })
    
  }
  return (
    <>
      <ScrollView style={[styles.wrapper,{backgroundColor: themeColor.primary}]}>
        <View style={styles.container}>
          <View style={{ ...app_dms.screenWidth }}>
            <View>
              <View style={[{ height: 210, width: "100%", overflow:'hidden' ,backgroundColor:'#00000087'}]}>
              {currentUser?.coverPhoto && (
                <ModalShowImage url={currentUser?.coverPhoto} />
              )}
             
              </View>
              {
                isMyProfile &&
                <TouchableOpacity
                  style={styles.circle_icon}
                  onPress={() => {
                    setUploadImageType('UploadCoverPhoto')
                    setOpenTermCondition(!openTermCondition)
                  }}
                >
                  <AntDesign name="camerao" style={styles.icon_camera} />
                </TouchableOpacity>
              }
            </View>
          </View>

          <View style={styles.profile_avatar}>
            <View style={styles.circle_avatar}>
              {currentUser?.avatar && (
                <Image 
                  source={{uri: currentUser?.avatar}}
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    resizeMode: 'cover'
                  }}
                  
                />
              )}
              {
                isMyProfile && 
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
              }
            </View>
          </View>
          <View style={styles.user_block}>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.user_name,{color: themeColor.fourth}]}>{currentUser?.username}</Text>
            </View>
            <View style={styles.user_info_follow}>
              <Text style={[styles.user_follower,{color: themeColor.ext_second}]}>
                {currentUser?.followerIds.length} {langData.user_follower[langCode]}
              </Text>
              <Text>
                <Entypo name="dot-single" size={20} color={themeColor.fourth} />
              </Text>
              <Text style={[styles.user_following,{color: themeColor.ext_second}]}>
                {currentUser?.followingIds.length} {langData.user_following[langCode]}
              </Text>
            </View>
            <View style={styles.round_rectang_button_container}>
              {
                isMyProfile && 
                <RectangleButton
                  overrideShape="rounded_8"
                  isActive
                  activeColor={themeMode === 'light' ? 'type_1' : 'type_2'}
                  typeOfButton="opacity"
                  style= {{
                    flex: 0.4
                  }}
                  onPress={() => navigation.navigate("ViewStatsScreen")}
                >
                  {(isActive, currentLabelStyle) => (
                    <Text style={currentLabelStyle}>{langData.view_stats[langCode]}</Text>
                  )}
                </RectangleButton>
              }

              {
                (!isMyProfile && !isFollowed) ?
                <RectangleButton
                  overrideShape="rounded_8"
                  isActive
                  activeColor={themeMode === 'light' ? 'type_1' : 'type_2'}
                  typeOfButton="opacity"
                  onPress={() => handleFollowUser()}
                  style= {{
                    flex: 0.4
                  }}
                >
                  {(isActive, currentLabelStyle) => (
                    <Text style={currentLabelStyle}>{langData.follow[langCode]}</Text>
                  )}
                </RectangleButton> :
                (
                  !isMyProfile && isFollowed ?
                  <RectangleButton
                    overrideShape="rounded_8"
                    isActive
                    activeColor={themeMode === 'light' ? 'type_1' : 'type_2'}
                    typeOfButton="opacity"
                    onPress={() => handleUnFollowUser()}
                    style= {{
                      flex: 0.4
                    }}
                  >
                    {(isActive, currentLabelStyle) => (
                      <Text style={currentLabelStyle}>{langData.unfollow[langCode]}</Text>
                    )}
                  </RectangleButton> : null
                )
              }

              <RectangleButton
                overrideShape="rounded_8"
                typeOfButton="opacity"
                onPress={() => navigation.navigate("EditProfileScreen")}
                style={{
                  flex: 0.4
                }}
              >
                {(isActive, currentLabelStyle) => (
                  <Text style={currentLabelStyle}>
                    <Feather name="edit-2" /> {langData.edit_profile[langCode]}
                  </Text>
                )}
              </RectangleButton>
              <RectangleButton overrideShape="rounded_8" typeOfButton="opacity" style={{flex: 0.05}}>
                {(isActive, currentLabelStyle) => (
                  <Text
                    style={[currentLabelStyle, {marginLeft: -3}]}
                  >
                    <Entypo name="dots-three-vertical" size={20} />
                  </Text>
                )}
              </RectangleButton>


            </View>
            <View style={styles.user_infos}>
              <View style={styles.user_info_block}>
                <Text style={[styles.user_info_title, {color:themeColor.fourth}]}>{langData.bio[langCode]}</Text>
                <Text style={[styles.user_bio_content,{color:themeColor.ext_second,}]}>{user.userBio}</Text>
              </View>
            </View>
            <View style={styles.user_infos}>
              <View style={styles.user_info_block}>
                <Text style={[styles.user_info_title,{color: themeColor.fourth}]}>{langData.information[langCode]}</Text>
                <View style={styles.user_info_other}>
                  <AntDesign
                    style={[styles.user_info_other_icon,{color:themeColor.ext_second}]}
                    name="enviromento"
                  />
                  <Text style={[styles.user_info_other_content,{color: themeColor.ext_second}]}>
                    <Text>{langData.live_in[langCode]} </Text>
                    <Text style={styles.user_info_address}>
                      {user.userInFo.userAddress}
                    </Text>
                  </Text>
                </View>
                <View style={styles.user_info_other}>
                  <MaterialCommunityIcons
                    style={[styles.user_info_other_icon,{color:themeColor.ext_second}]}
                    name="facebook"
                  />
                  <AppText
                    key={1}
                    style={styles.user_info_other_content}
                    hyperLink={user.userSocial.userFacebook}
                  >
                    {user.userSocial.userFacebook}
                  </AppText>
                </View>
                <View style={styles.user_info_other}>
                  <Entypo
                    style={[styles.user_info_other_icon,{color:themeColor.ext_second}]}
                    name="instagram"
                  />
                  <AppText
                    key={2}
                    style={styles.user_info_other_content}
                    hyperLink={user.userSocial.userInstagram}
                  >
                    {user.userSocial.userInstagram}
                  </AppText>
                </View>
              </View>
            </View>
            <View style={[styles.line_horizontal,{borderBottomColor:themeColor.ext_second,}]}></View>
          </View>
          <View style={styles.blog_block}>
            {
              isMyProfile &&
              <TouchableOpacity style={[styles.btn_create_blog,{backgroundColor: themeColor.fourth}]} onPress={()=>navigation.navigate("CreatePostScreen")}>
                <MaterialCommunityIcons
                  style={{ color: themeColor.ext_primary, marginRight: 6 }}
                  name="pencil-outline"
                  size={18}
                />
                <Text style={[styles.btn_create_blog_name,{color:themeColor.ext_primary,}]}>{langData.write_new_blog[langCode]}</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity style={[styles.btn_manage_blog,{backgroundColor:themeColor.fourth}]}>
              <Text style={[styles.btn_manage_blog_name,{color:themeColor.primary}]}>{langData.manage_blogs[langCode]}</Text>
            </TouchableOpacity>
            <View style={styles.blogs_list}>
              <View style={styles.blog_title_container}>
                <Text style={[styles.blog_title,{color:themeColor.fourth}]}>{langData.blog_list[langCode]}</Text>
              </View>
              {/* <View style={[styles.blog_container,{backgroundColor:themeColor.sub_primary}]}>
                {
                  userBlogData.map(blog=>(
                    <RectangleButton onPress={()=>navigation.navigate("BlogDetailScreen")} defaultColor="">
                      <HorizontalBlogCard key={blog.id} blog={blog}/> 
                    </RectangleButton>
                  ))
                }
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheetScroll
        haveBtn={false}
        openTermCondition={openTermCondition}
        snapPoints={["30%", "50%", "74%"]}
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
                {langData.choice_setting[langCode]}
              </Text>
            </TouchableOpacity> 
          </View>
        }
      />
    </>
  );
}

export default ProfileScreen;

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
