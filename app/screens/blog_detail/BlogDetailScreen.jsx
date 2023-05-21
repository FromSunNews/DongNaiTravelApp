import { View, ScrollView, Image } from 'react-native'
import React from 'react'

import NumberUtility from 'utilities/number'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { AppText, CircleButton, RectangleButton, MarkFormat } from 'components'

import styles from './BlogDetailScreenStyle'
import { app_sp } from 'globals/styles'
import useTheme from 'customHooks/useTheme'
import { useSelector } from 'react-redux'
import { selectCurrentMode } from 'redux/theme/ThemeSlice'

const text = `### What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

### Why we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
`;

const BlogDetailScreen = () => {
  //theme
  const themeColor = useTheme();
  const themeMode = useSelector(selectCurrentMode).mode
  return (
    <View style={{flex: 1}}>
      <ScrollView style={[styles.bd_container,{backgroundColor: themeColor.primary}]}>
          {/* Author, Blog information section */}
        <View style={[styles.bd_header, app_sp.mt_12,{borderBottomColor: themeColor.fourth,}]}>
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
                <AppText font="h5">Nguyen Anh Tuan</AppText>
                <AppText font="sub1">{'Jan 6th, 2023 \t 8 min read'}</AppText>
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
            <AppText font="h2">What is Lorem Ipsum?</AppText>
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
              <Ionicons name='pricetag-outline' /> Tags:
            </AppText>
            <RectangleButton
              typeOfButton="highlight"
              overrideShape="rounded_4"
              style={{...app_sp.ph_8, ...app_sp.pv_0, ...app_sp.me_6}}
            >
              {(isActive, currentLabelStyle) => (
                <AppText style={currentLabelStyle} font="body3">Top dia diem</AppText>
              )}
            </RectangleButton>
            <RectangleButton
              typeOfButton="highlight"
              overrideShape="rounded_4"
              style={{...app_sp.ph_8, ...app_sp.pv_0, ...app_sp.me_6}}
            >
              {(isActive, currentLabelStyle) => (
                <AppText style={currentLabelStyle} font="body3">Bien Hoa</AppText>
              )}
            </RectangleButton>
            <RectangleButton
              typeOfButton="highlight"
              overrideShape="rounded_4"
              style={{...app_sp.ph_8, ...app_sp.pv_0}}
            >
              {(isActive, currentLabelStyle) => (
                <AppText style={currentLabelStyle} font="body3">Dong Nai</AppText>
              )}
            </RectangleButton>
          </View>
        </View>

        {/* Blog Content */}
        <View style={styles.bd_content_container}>
          {/* Dùng MarkFormat ở đây */}
          <MarkFormat
            text={text}
          />
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
        <View style={{height: 175}}></View>
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
          <AppText font="body3">{NumberUtility.toMetricNumber(1578)}</AppText>
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
          <AppText font="body3">{NumberUtility.toMetricNumber(576)}</AppText>
        </View>
      </View>
    </View>
  )
}

export default BlogDetailScreen