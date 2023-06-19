import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  LayoutAnimation,
  ActivityIndicator,
  ViewProps,
  Animated
} from 'react-native'
import React, { useRef } from 'react'
import { Buffer } from 'buffer'

import { getSocket } from 'apis/socket'

import {
  getCreateBlogEventHandlers
} from 'apis/socket/blog'

import { useNavigation } from '@react-navigation/native'

import {
  useBriefBlogs
} from 'customHooks/useBlog'
import useTheme from 'customHooks/useTheme'

import {
  BRIEF_BLOG_DATA_FIELDS,
  BLOG_QUANLITIES
} from 'utilities/constants'
import AsyncStorageUtility from 'utilities/asyncStorage'

import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  TypeScrollView,
  HorizontalBlogCard,
  HorizontalBlogCardSkeleton,
  BannerButton,
  AppText
} from 'components'

import styles from './BlogsScreenStyles'
import { app_sp } from 'globals/styles'
import { useSelector } from 'react-redux'

/**
 * @typedef UploadBlogProgressProps
 * @property {string} message
 * @property {number} progress
 */

/**
 * 
 * @param {UploadBlogProgressProps & ViewProps} props 
 * @returns 
 */
const UploadBlogProgress = ({
  message,
  progress = 0,
  ...props
}) => {
  return (
    <View {...props}>
      <View style={[
        {
          width: '100%',
          height: 8,
          backgroundColor: app_c.HEX.ext_primary
        },
        app_sp.mb_12
      ]}>
        <View style={{
          width: `${progress}%`,
          height: 8,
          backgroundColor: app_c.HEX.third
        }}/>
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <ActivityIndicator />
        <AppText style={app_sp.ms_12}>{message}</AppText>
      </View>
    </View>
  )
}

const BlogsScreen = ({route}) => {
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.blogsScreen
  //theme
  const { themeColor, themeMode } = useTheme();

  // Mỗi lần upload lên 100kb
  /*
    Khi dữ liệu của blog được JSON.stringify() thì dữ liệu sẽ nặng hơn bình thường.
    Khi ảnh được chuyển sang Base64, thì nó phải chuyển thành nhị phân trước (thành các octets - 8bits) và cái này
    thì tuỳ thuộc vào thuật toán chuyển đổi thôi, mặc định là UTF-8 thì nó thành octets. Mà base64 là dạng mã hoá 6-bits, cho
    nên cứ mỗi 3 otets thì mình sẽ có 4 dãy 6bits (cái này t không biết gọi sao :v), đáng lẽ sẽ không đổi đúng không? Tuy nhiên, khi
    phân chia xong thì nó lại đổi 4 dãy 6bits này về kí tự, mà kí tự thì lại chiếm 8bits (theo tiêu chuẩn), đâm ra là nó sẽ nhiều dữ liệu hơn.

    Cho nên nếu như tấm ảnh 200kb, thì sau khi mã hoá thành base64 thì sẽ nặng hơn (tầm 200 * 4 / 3 = 266.67kb)
  */
    const chunkSize = 100 * 1024;

  const blogsInfo = React.useRef({
    isFirstFetch: true,
    isEndReach: false,
    briefBlogDataFields: BRIEF_BLOG_DATA_FIELDS
  });
  const [type, setType] = React.useState("all");
  const [isOnTop, setIsOnTop] = React.useState(true);
  const [uploadInfo, setUploadInfo] = React.useState({
    startUpload: route.params?.startUpload,
    isBlogUploading: false,
    blog: undefined,
    progress: 0,
    text: "Uploading..."
  });

  const navigation = useNavigation();
  const {
    blogs,
    increaseSkip,
    fetchBriefBlogsByType,
    reloadBriefBlogsByType
  } = useBriefBlogs(type);

  const showBannderButton = isVisible => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOnTop(isVisible);
  }

  const handleExploreMomentumScrollEnd = React.useCallback((() => {
    let prevOffsetY = 0;
    return function(e) {
      if(blogsInfo.current.isEndReach) {
        if(blogs) {
          increaseSkip();
          fetchBriefBlogsByType(blogsInfo.current.briefBlogDataFields);
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

  /*
    Cú pháp đặt tên cho các Socket Event Handler:
    Tên hander (listen hoặc emit) + tên event.
    Event handler là các function dùng

    Ngoài ra thì mình còn có hàm tạo Message Object dùng để gửi đi tới server.
  */
  const [ listenCreateBlog, emitCreateBlog ] = React.useMemo(() => getCreateBlogEventHandlers(getSocket()), [])

  React.useEffect(() => {
    if(!blogs || blogs.data.length === 0) {
      fetchBriefBlogsByType(blogsInfo.current.briefBlogDataFields);
    }
    // dispatch(updateSkipBriefPlacesAmount({typeOfBriefPlaces: type, skip: 5}));
  }, [type]);

  React.useEffect(() => {
    if(!uploadInfo.startUpload && route.params?.startUpload) {
      AsyncStorageUtility.getItemAsync("SAVED_BLOG_FOR_UPLOAD_KEY")
      .then(data => {
        if(data) {
          setUploadInfo(prevState => ({...prevState, startUpload: true, blog: JSON.stringify(data)}))
        }
      })
    }

    if(uploadInfo.startUpload && !uploadInfo.isBlogUploading) {
      let index = 0;
      let chunk = Buffer.from(uploadInfo.blog.substring(index, chunkSize));
      let totalSize = uploadInfo.blog.length;
      let isUploadDone;
      
      let progress = 0;
      // Send lần đầu tiên
      index += chunkSize;
      emitCreateBlog({
        data: {
          chunk: chunk,
          chunkSize: chunkSize,
          totalSize
        }
      });
      if(index >= totalSize) {
        isUploadDone = true;
        emitCreateBlog({status: { isUploadDone: true }});
      }

      setUploadInfo(prevState => ({...prevState, isBlogUploading: true}));

      console.log("Chunk size: ", chunkSize);
      console.log("Buffer size: ", totalSize);
      console.log("Index: ", index);
      
      console.log("Start listen to Blog Create Event");
      unlisten = listenCreateBlog(
        function(message) {
          console.log("[Blog create] Message from server: ", message);
          console.log("Progress: ", uploadInfo.progress);

          // Required Status: Nếu như có lỗi từ server thì nó sẽ rơi vào đây.
          if(message.status.isError) {
            AsyncStorageUtility.removeItemAsync("SAVED_BLOG_FOR_UPLOAD_KEY")
            .then(() => {
              setUploadInfo(prevState => ({...prevState, text: "An error has occurred."}));
              setTimeout(() => {
                setUploadInfo(prevState => (
                  {
                    ...prevState,
                    isBlogUploading: false,
                    startUpload: false,
                    progress: 0,
                    text: "Uploading..."
                  }
                ));
              }, 2000);
              unlisten();
            });
          }

          // Required Status: Nếu như việc trao đổi xong thì set lại một số thứ ở bên client.
          if(message.status.isDone) {
            AsyncStorageUtility.removeItemAsync("SAVED_BLOG_FOR_UPLOAD_KEY")
            .then(() => {
              setUploadInfo(prevState => ({...prevState, progress: 100}));
              setTimeout(() => {
                setUploadInfo(prevState => (
                  {
                    ...prevState,
                    isBlogUploading: false,
                    startUpload: false,
                    progress: 0,
                    text: "Uploading..."
                  }
                ));
              }, 2000);
              unlisten();
            });
          }

          // Hiển thị text từ server.
          if(message.text || message.status.progress && !message.status.isError) {
            setUploadInfo(prevState => ({...prevState, text: message.text, progress: message.status.progress}));
          }

          // Chia blog ra từng phần và upload liên tục, thì cái này cũng là một optional.
          if(message.status.canUpload && !isUploadDone && !message.status.isError) {
            let limit = chunkSize + index > totalSize ? totalSize : chunkSize + index;
            chunk = Buffer.from(uploadInfo.blog.substring(index, limit));
            emitCreateBlog({
              data: {
                chunk,
                chunkSize: chunk.length
              }
            });
            index += chunkSize;
            if(index >= totalSize) {
              isUploadDone = true;
              emitCreateBlog({status: { isUploadDone: true }});
            }
          }
        }
      )

      return function() {
        unlisten();
      }
    }
  }, [uploadInfo.startUpload, route.params]);

  return (
    <View style={{backgroundColor: themeColor.bg_second}}>
      {
        uploadInfo.isBlogUploading && (
          <UploadBlogProgress
            style={[app_sp.ph_18, app_sp.pv_12]}
            message={uploadInfo.text}
            progress={uploadInfo.progress}
          />
        )
      }
      {
        isOnTop && (
          <View
            style={[
              app_sp.ph_18,
              app_sp.mt_12,
              {
                backgroundColor: themeColor.bg_second,
                position: 'relative',
                zIndex: 2,
              }
            ]}
          >
            <BannerButton
              defaultColor ={ themeMode === 'light' ? 'type_3' : 'type_1_dark'}
              typeOfButton="highlight"
              style={[app_sp.mt_12, {backgroundColor: themeColor.bg_second}]}
              toScreen={{screenName: "MapScreen"}}
              setRightIcon={(isActive, currentLabelStyle) =>
                <Ionicons name="chevron-forward-outline" style={currentLabelStyle} size={25}color={themeColor.ext_third} />
              }
            >
              {langData.banner_button[langCode]}
            </BannerButton>
          </View>
        )
      }
      <FlatList
        data={blogs ? blogs.data : []}
        style={[styles.scroll_view_container,{backgroundColor: themeColor.bg_second}]}
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
            types={BLOG_QUANLITIES[langCode].values}
            labels={BLOG_QUANLITIES[langCode].labels}
            callBack={setType}
            scrollStyle={[app_sp.ms_18, app_sp.pv_12]}
            containerStyle={{backgroundColor: themeColor.bg_second, ...app_sp.pv_10}}
          />
        }
        renderItem={item => {return <View style={app_sp.ph_18}><HorizontalBlogCard blog={item.item} typeOfBriefBlog={type} /></View>}}
        keyExtractor={item => item._id}
        onRefresh={() => reloadBriefBlogsByType(blogsInfo.current.briefBlogDataFields)}
        refreshing={false}
      />
    </View>
  )
}

export default BlogsScreen