import { View, ScrollView, Image } from 'react-native'
import React from 'react'

import {
  getBlogsAPI
} from 'apis/axios/blog'

import useTheme from 'customHooks/useTheme'
import {
  useBlogDetails,
  useBriefBlogs
} from 'customHooks/useBlog'

import { useSelector } from 'react-redux'
import { selectCurrentMode } from 'redux/theme/ThemeSlice'

import { BRIEF_BLOG_DATA_FIELDS } from 'utilities/constants'
import NumberUtility from 'utilities/number'
import DateTimeUtility from 'utilities/datetime'

import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  AppText,
  CircleButton,
  RectangleButton,
  MarkFormat,
  Speech,
  HorizontalBlogCard
} from 'components'

import styles from './BlogDetailScreenStyle'
import { app_sp } from 'globals/styles'

const BlogDetailScreen = ({route, navigation}) => {
  const { blogId, typeOfBriefBlog, fromSearch } = route.params;
  //theme
  const {themeColor,themeMode} = useTheme();
  
  const { blogDetails, fetchBlogDetailsById, clearBlogDetails } = useBlogDetails(blogId);

  const [relatedBlogs, setRelatedBlogs] = React.useState([]);

  let type = blogDetails.type ? blogDetails.type : "";
  let displayAuthorName = blogDetails.author.lastName && blogDetails.author.firstName
    ? blogDetails.author.lastName + " " + blogDetails.author.firstName
    : blogDetails.author.displayName

  React.useEffect(() => {
    navigation.setOptions({'title': blogDetails.name});
    fetchBlogDetailsById(blogId, {
      canGetFull: true
    })

    if(relatedBlogs.length === 0) {
      let query = `limit=${5}&skip=${0}&quality=type:${type},except_by_placeid:${blogDetails._id}&fields=${BRIEF_BLOG_DATA_FIELDS}`;
      getBlogsAPI(query)
      .then(data => {
        setRelatedBlogs(data);
      })
      .catch(error => console.error(error))
    }

    return function() {
      clearBlogDetails(blogId);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={[styles.bd_container,{backgroundColor: themeColor.bg_primary}]}
        contentContainerStyle={{paddingBottom: 120}}
      >
          {/* Author, Blog information section */}
        <View style={[styles.bd_header, app_sp.mt_12,{borderBottomColor: themeColor.fourth}]}>
          <View style={[styles.bd_row, app_sp.mb_12, { justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CircleButton
                isOnlyContent
                setIcon={() => (
                  <Ionicons name="person-circle-outline" size={42} color={themeColor.ext_second} />
                )}
              />

              {/* Author name and other information  */}
              <View style={app_sp.ms_12}>
                <AppText font="h5">{displayAuthorName}</AppText>
                <AppText font="sub1">{`${DateTimeUtility.getShortDateString(blogDetails.createdAt)} ${DateTimeUtility.toMinute(blogDetails.readTime)} min read.`}</AppText>
              </View>
            </View>

            {/* Follow button */}
            <RectangleButton
              overrideShape="capsule"
              style={app_sp.pv_0}
            >
              {
                (isActive, currentLabelStyle) => (
                  <AppText font="body3" style={currentLabelStyle}>{isActive ? 'Following' : 'Follow'}</AppText>
                )
              }
            </RectangleButton>
          </View>
          
          <View style={[styles.bd_row, app_sp.mb_12]}>
            <AppText font="h2">{blogDetails.name}</AppText>
          </View>

          <View style={[styles.bd_row, app_sp.mb_12]}>
          <CircleButton
            style={app_sp.me_8}
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name='share-outline' size={14} />
            )}
          />
          <CircleButton
            style={app_sp.me_8}
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'flag' : 'flag-outline'} size={14} />
            )}
          />
          </View>

          {/* Tags */}
          <View style={styles.bd_row}>
            <AppText font="body2" style={app_sp.me_12}>
              <Ionicons name='pricetag-outline' /> Thể loại:
            </AppText>
            <RectangleButton
              typeOfButton="highlight"
              overrideShape="rounded_4"
              style={{...app_sp.ph_8, ...app_sp.pv_0, ...app_sp.me_6}}
            >
              {(isActive, currentLabelStyle) => (
                <AppText style={currentLabelStyle} font="body3">{blogDetails.type}</AppText>
              )}
            </RectangleButton>
          </View>

          {/* Speech, tạm thời vẫn chưa có, cho nên là chờ ở đây thôi */}
          <Speech
            content={blogDetails.content?.speech}
            lang='vi'
            style={app_sp.mt_12}
          />
        </View>

        {/* Blog Content */}
        <View style={styles.bd_content_container}>
          {/* Dùng MarkFormat ở đây */}
          {
            blogDetails.content
            && (
              <MarkFormat
                text={blogDetails.content.plainTextMarkFormat}
              />
            )
          }
        </View>

        <View style={[styles.bd_content_container, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
          <AppText font="h3" numberOfLines={1} style={app_sp.mb_6}>Related Blogs</AppText>
          <CircleButton
            isTransparent
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons style={currentLabelStyle} name="chevron-forward-outline" size={18} color={themeColor.fourth} />
            )}
          />
        </View>
        <View>
          {
            relatedBlogs.length === 0
            ? 
            <View style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              {/* <AppText>{langData.relatedPlacesDataMessage[langCode]}</AppText> */}
              <Image 
                source={require('../../assets/images/no-data.png')} 
                style={{
                  height: 300,
                  width: 300,
                  alignSelf: 'center'
                }}/>
            </View>
            : (
              relatedBlogs.map(relatedBlog => (
                <HorizontalBlogCard key={relatedBlog._id} blog={relatedBlog} />
              ))
            )
          }
        </View>
      </ScrollView>

      {/* Float container */}
      <View style={[styles.float_button_container,{backgroundColor: themeColor.second}]}>
        <View style={[app_sp.me_12, { flexDirection: 'row', alignItems: 'center' }]}>
          <CircleButton
            style={app_sp.me_6}
            defaultColor={themeMode === 'light' ? 'type_2' : 'type_3'}
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'heart' : 'heart-outline'} size={14} style={currentLabelStyle} />
            )}
          />
          <AppText font="body3">{NumberUtility.toMetricNumber(blogDetails.userFavoritesTotal)}</AppText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CircleButton
            style={app_sp.me_6}
            defaultColor={themeMode === 'light' ? 'type_2' : 'type_3'}
            typeOfButton="highlight"
            setIcon={(isActive, currentLabelStyle) => (
              <Ionicons name={isActive ? 'map' : 'map-outline'} size={14} style={currentLabelStyle} />
            )}
          />
          <AppText font="body3">{NumberUtility.toMetricNumber(blogDetails.userCommentsTotal)}</AppText>
        </View>
      </View>
    </View>
  )
}

export default BlogDetailScreen