import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  LayoutAnimation
} from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import {
  useBriefBlogs
} from 'customHooks/useBlog'
import useTheme from 'customHooks/useTheme'

import {
  BRIEF_BLOG_DATA_FIELDS
} from 'utilities/constants'

import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  TypeScrollView,
  HorizontalBlogCard,
  HorizontalBlogCardSkeleton,
  BannerButton
} from 'components'

import styles from './BlogsScreenStyles'
import { app_sp, app_c } from 'globals/styles'
import { useSelector } from 'react-redux'

const BlogsScreen = () => {
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.blogsScreen
  //theme
  const themeColor = useTheme();

  const blogsInfo = React.useRef({
    isFirstFetch: true,
    briefBlogDataFields: BRIEF_BLOG_DATA_FIELDS,
    isEndReach: false
  });
  const [type, setType] = React.useState("all");
  const [isOnTop, setIsOnTop] = React.useState(true);
  const navigation = useNavigation();
  const { blogs, inscreaseSkip, fetchBriefBlogsByType } = useBriefBlogs(type);

  React.useEffect(() => {
    if(!blogs) {
      fetchBriefBlogsByType(blogsInfo.current.briefBlogDataFields);
    }
    // dispatch(updateSkipBriefPlacesAmount({typeOfBriefPlaces: type, skip: 5}));
  }, [type]);

  const showBannderButton = isVisible => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOnTop(isVisible);
  }

  const handleExploreMomentumScrollEnd = React.useCallback((() => {
    let prevOffsetY = 0;
    return function(e) {
      if(blogsInfo.current.isEndReach) {
        if(blogs) {
          inscreaseSkip();
          fetchBriefBlogsByType();
        }
      }
      blogsInfo.current.isEndReach = false;
    }
  })());

  const handleExploreScroll = e => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    let val = contentOffset.y;
    if(val <= 0) {
      showBannderButton(true)
    } else {
      showBannderButton(false)
    }
  }

  const handleEndReach = e => {
    blogsInfo.current.isEndReach = true;
  }

  return (
    <View>
      {
        isOnTop && (
          <View
            style={[
              app_sp.ph_18,
              app_sp.pt_12,
              {
                backgroundColor: themeColor.primary,
                position: 'relative',
                zIndex: 2,
              }
            ]}
          >
            <BannerButton
              typeOfButton="highlight"
              style={[app_sp.mt_12, {backgroundColor: themeColor.primary}]}
              toScreen={{screenName: "MapScreen"}}
              setRightIcon={(isActive, currentLabelStyle) =>
                <Ionicons name="chevron-forward-outline" style={currentLabelStyle} size={25} />
              }
            >
              {langData.banner_button[langCode]}
            </BannerButton>
          </View>
        )
      }
      <FlatList
        data={blogs ? blogs.data : []}
        style={[styles.scroll_view_container,{backgroundColor: themeColor.primary,}]}
        contentContainerStyle={{paddingBottom: 200}}
        onMomentumScrollEnd={handleExploreMomentumScrollEnd}
        onEndReached={handleEndReach}
        onScroll={handleExploreScroll}
        // scrollEventThrottle={1000}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        ListEmptyComponent={
          !blogs && (
            <View style={[app_sp.mh_18, app_sp.mb_12]}>
              {[1, 2, 3].map((value, index) => <HorizontalBlogCardSkeleton key={value + index} />)}
            </View>
          )
        }
        ListHeaderComponent={
          <TypeScrollView
            buttonStyle="capsule"
            types='all;most_favorites;most_comments'
            callBack={setType}
            scrollStyle={[app_sp.ms_18, app_sp.pv_12]}
            containerStyle={{backgroundColor: themeColor.primary, ...app_sp.pv_10}}
          />
        }
        renderItem={item => {console.log(item); return <View style={app_sp.ph_18}><HorizontalBlogCard blog={item.item} typeOfBriefBlog={type} /></View>}}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default BlogsScreen

const blogsFek = [
  {
    _id: 'b1',
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
    _id: 'b2',
    user: {
      id: 'user2',
      name: 'Du Lich Bui',
      avatar: ''
    },
    name: 'Nhung con duong nhon nhip nhat o Dong Nai',
    avatar: '',
    createdAt: 1675217313000,
    readTime: 300,
    isLiked: false
  },
  {
    _id: 'b3',
    user: {
      id: 'user3',
      name: 'Bac Thay Du Lich',
      avatar: ''
    },
    name: 'Cac quan an hap dan nen thu khi den Dong Nai',
    avatar: '',
    createdAt: 1674353313000,
    readTime: 300,
    isLiked: false
  }
]