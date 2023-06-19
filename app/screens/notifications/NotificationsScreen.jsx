import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {AntDesign} from 'react-native-vector-icons'
import styles from './NotificationsScreenStyle'
import { AppText } from 'components'
import { app_typo } from 'globals/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { app_c, app_shdw } from '../../globals/styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentNotifs, updateCurrentNotifs } from '../../redux/notifications/NotificationsSlice'
import { selectCurrentUser } from '../../redux/user/UserSlice'
import { selectCurrentLanguage } from '../../redux/language/LanguageSlice'
import { notifIcon } from '../../utilities/mapdata'
import { cloneDeep } from 'lodash'
import moment from 'moment/moment'
import 'moment/locale/vi'  // without this line it didn't work
import { getInfoUserAPI, updateManyNotifsAPI, updateNotifAPI } from '../../apis/axios'
import { not } from 'react-native-reanimated'
import useTheme from 'customHooks/useTheme'
moment.locale('vi')

const NotificationsScreen = ({navigation}) => {
  const currentNotif = useSelector(selectCurrentNotifs)
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  //theme
  const themeColor = useTheme();
  const [numberOfVisited, setNumberOfVisited] = useState(0)

  useEffect(() => {
    if (currentNotif.length > 0) {
      setNumberOfVisited(currentNotif.filter(notif => notif.__isVisited === false).length)
    }
  }, [currentNotif])

  const handlePressNotif = (notif) => {
    if (notif.typeNofif === 'FOLLOW') {
      getInfoUserAPI({
        userId: notif.userSentId
      }).then((user) => {
        console.log("🚀 ~ file: NotificationsScreen.jsx:40 ~ handlePressNotif ~ user:", user)
        //  Gọi api để cập nhật Notif để biết là người dùng đã click vào r
        updateNotifAPI({
          notifId: notif._id,
          _isVisited: true
        }).then(() => {
          // Cập nhật state
          const notifToUpdate = cloneDeep(currentNotif)
          notifToUpdate.map(n => {
            if (n._id === notif._id) {
              n._isVisited = true
            }
          })
          dispatch(updateCurrentNotifs(notifToUpdate))
          navigation.navigate('Profile', {
            userVisited: user
          })
        })
      })
    }
  }

  const handleMarkRead = () => {
    // Mới đầu sẽ callapi
    //  Mình sẽ truyền một mảng _id 
    const arrayNotifs = []
    currentNotif.map(n => {
      arrayNotifs.push(n._id)
    })
    updateManyNotifsAPI({
      arrayNotifs: arrayNotifs
    }).then((res) => {
      console.log("🚀 ~ file: NotificationsScreen.jsx:71 ~ handleMarkRead ~ res:", res)
      const currentNotifToUpdate = cloneDeep(currentNotif)
      currentNotifToUpdate.map(n => {
        n._isVisited = true
      })
      dispatch(updateCurrentNotifs(currentNotifToUpdate))
    })
  }
  return (
    <View style={[styles.container,{backgroundColor: themeColor.primary}]}>
      <View style={styles.notification_content}>
        <TouchableOpacity style={{padding: 5}} onPress={handleMarkRead}>
          <Text style={{ width: '100%', textAlign: 'right', ...app_typo.fonts.normal.normal.h5, paddingHorizontal: 16,
          color: themeColor.third}}>Đánh dấu đã đọc tất cả</Text>
        </TouchableOpacity>
        {
          numberOfVisited !== 0 ?
          <Text style={[styles.notif_info,{color: themeColor.fourth}]}>{`Bạn có ${numberOfVisited} thông báo mới`}</Text> :
          <Text style={[styles.notif_info,{color: themeColor.fourth}]}>Bạn không có thông báo mới nào</Text>
        }

        { currentNotif.length > 0 &&
        currentNotif.map((notif, index) => (
          <TouchableOpacity
          onPress={() => handlePressNotif(notif)}
          key={notif._id} 
          style={[styles.container_item, {backgroundColor: notif._isVisited ? themeColor.primary : themeColor.sub_second}]}>
          {
            notif.userSent.avatar && 
            <View style={{...app_shdw.type_1, alignSelf: 'flex-start',}}>
              <Image source={{ uri: notif.userSent.avatar }} style={styles.avatar} />
              <View style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: themeColor.third,
                ...app_shdw.type_1,
                position: 'absolute',
                bottom: -5,
                right: 10,
              }}>
                <FontAwesome5 name={notifIcon[notif.typeNofif]} size={12} color={themeColor.primary}/>
              </View>
            </View>
          }
          <View style={styles.content}>
            <AppText style={styles.username}>{notif.userSent.displayName}</AppText>
            <AppText numberOfLines={2} style={styles.content_notification}>{notif.desc[langCode]}</AppText>
    
            {/* Nếu notifi là dạng thích bài viết hoặc theo dõi */}
            {
              notif.typeNofif === 'FOLLOW' &&
              <View style={styles.container_avatar_small}>
                {
                  (notif.content?.listUrlAvatar || notif.content?.listUrlAvatar.length > 0) &&
                  notif.content?.listUrlAvatar.map((avatar, index) => (
                    <Image key={index} source={{ uri: avatar }}  style={[styles.avatar_small, { marginLeft: index === 0 ? 0 : -7.5 }]} />
                  ))
                }
                
                {
                  notif.content?.moreUrlAvatar > 0 &&
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: app_c.HEX.ext_primary,
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    marginLeft: -7.5
                  }}>
                    <Text style={styles.date}>{notif.content?.moreUrlAvatar}</Text>
                  </View>
                }
              </View> 
            }
    
            {/* Notifi dạng bình luận */}
            {/* {
              index === 1 &&
              <Text numberOfLines={2} style={styles.short_comment}>"Thật sự chỗ này rất tuyệt vời luôn ấy mọi người"</Text>
            } */}
            {/* Notifi dangj lời mời */}
            {/* {
              index === 2 &&
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10
              }}>
                <TouchableOpacity style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor: app_c.HEX.third,
                  borderRadius: 4,
                  marginRight: 10
                }}>
                  <Text style={{color: app_c.HEX.primary, ...app_typo.fonts.normal.bolder.body1}}>Đồng ý</Text>
                </TouchableOpacity>
      
                <TouchableOpacity style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor: app_c.HEX.ext_primary,
                  borderRadius: 4
                }}>
                  <Text style={{color: app_c.HEX.ext_second, ...app_typo.fonts.normal.bolder.body1}}>Từ chối</Text>
                </TouchableOpacity>
              </View>
            } */}
    
            {/* Notifi đạng đăng ảnh mới */}
            {/* {
              index === 3 &&
              <View style={{
                flexDirection: 'row',
                marginVertical: 5,
              }}>
                <View style={{
                  overflow: 'hidden'
                }}>
                  <Image source={{ uri: 'http://res.cloudinary.com/dbtb0sjby/image/upload/v1681467788/users/byetbs1uhoebaqbel6uu.jpg' }} style={styles.blog_place_img} />
                  <View style={{
                    position: 'absolute',
                    height: 60,
                    width: 30,
                    backgroundColor: '#f3f3f39e',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 5,
                    right: 0
                  }}>
                    <Text style={{color: app_c.HEX.ext_second, ...app_typo.fonts.normal.bolder.h5}}>+3</Text>
                  </View>
                </View>
                <Text numberOfLines={3} style={{flex: 1, marginLeft: 10, marginTop: 5, color: app_c.HEX.ext_second, ...app_typo.fonts.normal.bolder.body2}}>"Hãy đến chợ Đêm Đà Lạt cảm giác thật tuyệt vời. Đến đây bạn sẽ được trải nghiệm hết tất cả các loại dịch vụ, đồ ăn, đi chơi"</Text>
              </View>
            } */}
            <AppText style={styles.date}>{moment(moment(notif.createdAt).format('YYYYMMDD'), "YYYYMMDD").fromNow()}</AppText>
          </View>
          {/* <TouchableOpacity  style={{
            marginLeft: 10,
          }} onPress={() => {}}>
            <MaterialCommunityIcons name='dots-horizontal' size={30} color={app_c.HEX.ext_second}/>
          </TouchableOpacity> */}
        </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default NotificationsScreen
