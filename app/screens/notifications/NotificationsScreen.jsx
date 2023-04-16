import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {AntDesign} from 'react-native-vector-icons'
import styles from './NotificationsScreenStyle';
import { AppText } from 'components';
import { app_typo } from 'globals/styles';

const categoryNotification=[
  {
    categoryId:0,
    category:'đã nhắc đến bạn trong một bình luận'
  },
  {
    categoryId:1,
    category:'đã bắt đầu theo giỏi bạn'
  },
  {
    categoryId:2,
    category:'đã thích bài viết của bạn'
  },
  {
    categoryId:3,
    category:'đã thích bài viết của bạn'
  },
]

const notifications = [
  {
    id: 1,
    avatar: 'https://placeimg.com/50/50/people/1',
    userName: 'John Doe',
    contentNotification: 'vừa nhắc bạn ở một bài viết',
    date:'02-4-2021'
  },
  {
    id: 2,
    avatar: 'https://placeimg.com/50/50/people/2',
    userName: 'Jane Smith',
    contentNotification: 'vừa thích bài viết của bạn',
    date:'02-4-2021',
  },
  // And so on...
];
const Notification = ({ avatar, userName, contentNotification ,date}) => {
  return (
    <View style={styles.container_item}>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <View style={styles.content}>
        <AppText style={styles.username}>{userName}</AppText>
        <AppText style={styles.content_notification}>{contentNotification}</AppText>
        <AppText >{date}</AppText>
      </View>
    </View>
  );
};

const NotificationsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.control} onPress={() => navigation.goBack()}>
          <AntDesign name="left"  size={25}/>
        </TouchableOpacity>
        <AppText style={{...app_typo.fonts.normal.bolder.h2,marginLeft:20}}>Notification</AppText>
      </View> */}
      <View style={styles.notification_content}>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            avatar={notification.avatar}
            userName={notification.userName}
            contentNotification={notification.contentNotification}
            date={notification.date}
          />
        ))}
      </View>
    </View>
  )
}

export default NotificationsScreen
