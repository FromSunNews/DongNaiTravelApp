import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
  Keyboard,
  Pressable
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

import { getBlogCommentsAPI } from 'apis/axios/blog/get'
import { createBlogCommentAPI } from 'apis/axios/blog/post'

import { useAuthState } from 'customHooks/useAuth'

import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"

import UnAuthenticationScreen from 'screens/unauthentication/UnAuthenticationScreen'
import {
  AppText,
  Input,
  CircleButton,
  Comment
} from 'components'

import {
  app_sp,
  app_c
} from 'globals/styles'

/**
 * Global Screen (Authorize Required).
 * 
 * Screen này sẽ hiển ra tất cả các comment của một blog nào đó và người dùng còn
 * có thể comment vào chính blog đó.
 * 
 * Một comment sẽ có các thuộc tính sau.
 * ```js
 * {
 *   blogId: string,
 *   comment: {
 *     authorId: string,
 *     text: string
 *   }
 * }
 * ```
 * @param {*} param0 
 * @returns 
 */
const BlogCommentScreen = ({route}) => {
  const { isAuthenticated, user } = useAuthState();
  const navigation = useNavigation();

  if(!isAuthenticated) return () => <UnAuthenticationScreen navigation={navigation} />

  const blogId = route.params.blogId;

  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");
  const [comments, setComments] = React.useState([]);

  const handleCreateCommentPress = function() {
    let blog = {
      accessToken: user.accessToken,
      blogId: blogId,
      comment: {
        authorId: user._id,
        text: commentText
      }
    }
    console.log("Blog: ", blog);
    createBlogCommentAPI(blog)
    .then(response => {
      let data = response.data;
      console.log("Created Blog: ", data);
      delete data.authorId;
      data.author = {
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar
      }
      setCommentText("");
      setComments(prevState => [data, ...prevState]);
    })
  }

  React.useEffect(() => {
    /**
     * Blog Comments sẽ được trả về theo dạng
     * - Nếu như không có comment nào thì []
     * - Nếu như comments thì:
     * ```js
        {
          _id: string,
          text: string,
          createdAt: number,
          updatedAt: number,
          author: {
            displayName: string,
            firstName: string,
            lastName: string,
            avatar: string
          },
          blogId: string,
          exactKey: string
        }
     * ```
     */
    let query = {
      blogId: blogId,
      skip: 0,
      limit: 20
    };
    getBlogCommentsAPI(query)
    .then(response => {
      let data = response.data;
      if(Boolean(data[0])) {
        setComments(data);
      }
    })
  }, []);

  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      automaticallyAdjustKeyboardInsets
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={[app_sp.pt_12, {position: 'relative', flex: 1}]}
      style={[
        {
          flex: 1,
          backgroundColor: app_c.HEX.primary
        }
      ]}
    >
      {/* FlatList */}
      <ScrollView
        style={[
          app_sp.ph_18,
          {
            flex: 1
          }
        ]}
        contentContainerStyle={{
          paddingBottom: 75
        }}
      >
        {
          comments.length === 0
          ? (
            <AppText style={{textAlign: 'center'}}>There aren't comments yet</AppText>
          )
          : (
            comments.map(comment => (
              <Comment
                key={comment._id}
                comment={comment}
                isOwnedCurrentUser={comment.author._id === user._id}
                style={app_sp.mb_12}
              />
            ))
          )
        }
      </ScrollView>
      {
        keyboardVisible && (
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={{
              position: "absolute",
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          />
        )
      }
      <View
        style={[
          app_sp.ph_18,
          {
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%',
            bottom: 0,
            backgroundColor: app_c.HEX.primary,
            borderTopColor: 'rgba(38, 38, 38, .125)',
            borderTopWidth: 1,
            zIndex: 2
          }
        ]}
      >
        <TextInput
          multiline
          onFocus={() => setKeyboardVisible(true)}
          onBlur={() => setKeyboardVisible(false)}
          value={commentText}
          onChangeText={setCommentText}
          style={[app_sp.pb_16, app_sp.pt_16, {flex: 1, maxHeight: 120}]}
          placeholder='Write your comment here...'
        />
        <CircleButton
          disabled={!Boolean(commentText)}
          style={[app_sp.ms_6, app_sp.mb_6, {backgroundColor: app_c.HEX.primary}]}
          typeOfButton="highlight"
          setIcon={(isActive, currentLabelStyle) => (
            <Feather name='send' size={16} style={currentLabelStyle} />
          )}
          onPress={handleCreateCommentPress}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default BlogCommentScreen