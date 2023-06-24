import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

import { useAuthState } from 'customHooks/useAuth'

import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from "react-native-vector-icons/Ionicons"

import UnAuthenticationScreen from 'screens/unauthentication/UnAuthenticationScreen'
import {
  AppText,
  Input,
  CircleButton
} from 'components'

import {
  app_sp,
  app_c,
  app_shdw
} from 'globals/styles'

const BlogCommentScreen = ({route}) => {
  const { isAuthenticated } = useAuthState();
  const navigation = useNavigation();

  if(!isAuthenticated) return () => <UnAuthenticationScreen navigation={navigation} />

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
      </ScrollView>
      <View
        style={[
          app_sp.ph_18,
          {
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            bottom: 0,
            backgroundColor: app_c.HEX.primary,
            borderTopColor: 'rgba(38, 38, 38, .125)',
            borderTopWidth: 1
          }
        ]}
      >
        <TextInput
          style={[app_sp.pv_22, {flex: 1}]}
          placeholder='Write your comment here...'
        />
        <CircleButton
          style={[app_sp.me_6, {backgroundColor: app_c.HEX.primary}]}
          typeOfButton="highlight"
          setIcon={(isActive, currentLabelStyle) => (
            <Ionicons name="send-outline" size={14} style={currentLabelStyle} />
          )}
          onPress={() => {}}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default BlogCommentScreen