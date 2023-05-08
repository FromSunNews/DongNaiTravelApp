import { View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

import {HorizontalBlogCard, HorizontalBlogCardSkeleton ,AppText} from 'components'
import { app_sp, app_c,app_typo } from 'globals/styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentWareHouse, saveBlog, removeBlog } from '../../redux/warehouse/WareHouseSlice'

import styles from './BlogSavedScreenStyles'

const BlogSavedScreen = () => {

  const blogsSaved = useSelector(selectCurrentWareHouse).blogsSaved
  console.log('đây là blog đã lưu:  '  ,blogsSaved)

  const [currentBlogs, setCurrentBlogs] = React.useState([]);
  const [currentBlogsSaved, setCurrentBlogsSaved] = React.useState([])
  const [type, setType] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      setCurrentBlogs([...blogs]);
      setCurrentBlogsSaved([...blogsSaved])
    }, 1000);
  }, [blogsSaved]);

  //tìm ra cái đã saved ở api
  const commonElements = currentBlogs.filter(e => currentBlogsSaved.includes(e.id) )

  return (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}
    >
      <View style={styles.header_title}>
        <AppText style={{...app_typo.fonts.normal.bolder.h2}}>Bài viết đã lưu</AppText>
      </View>
      <View style={{...app_sp.mh_18, ...app_sp.mb_12, ...app_sp.pt_8}}>
      {
          currentBlogs.length === 0
          ? [1, 2, 3].map((value, index) => <HorizontalBlogCardSkeleton key={value + index} />)
          : commonElements.map((blog, index) => <HorizontalBlogCard blog={blog} key={blog.id} />)
        }
      </View>
      <View style={{height:100}}></View>
    </ScrollView>
  )
}

export default BlogSavedScreen

const blogs = [
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
  },
  {
    id: 'b2',
    user: {
      id: 'user2',
      name: 'Du Lich Bui',
      avatar: ''
    },
    name: 'Nhung con duong nhon nhip nhat o Dong Nai',
    avatar: '',
    createdAt: 1675217313000,
    readTime: 300,
  },
  {
    id: 'b3',
    user: {
      id: 'user3',
      name: 'Bac Thay Du Lich',
      avatar: ''
    },
    name: 'Cac quan an hap dan nen thu khi den Dong Nai',
    avatar: '',
    createdAt: 1674353313000,
    readTime: 300,
  }
]