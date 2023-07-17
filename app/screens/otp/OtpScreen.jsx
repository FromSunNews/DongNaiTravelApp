import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image
} from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { sendOtpAPI, verifyOtpAPI } from 'apis/axios'

import { withTheme } from 'hocs/withTheme'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AppText } from 'components'

import { styles } from './OtpScreenStyles'
import { app_c } from 'globals/styles'

const OtpScreen = withTheme(({
  theme
}) => {

  const navigation = useNavigation()
  const route = useRoute()
  let clockCall

  const lengthInput = 6
  const [otpValue, setOtpValue] = useState('')
  const [countdown, setCountdown] = useState(30)
  const [enableResend, setEnableResend] = useState(false)

  let textInputRef = useRef(null)

  useEffect(() => {
    clockCall = setInterval(() => {
      if (countdown === 0) {
        setEnableResend(true)
        setCountdown(0)
        return clearInterval(clockCall)
      }
      setCountdown(countdown - 1)
    }, 1000)
    return () => {
      clearInterval(clockCall)
    }
  }, [countdown])


  const onChangeText = (val) => {
    console.log("🚀 ~ file: OtpScreen.jsx:41 ~ onChangeText ~ val", val)
    
    setOtpValue(val)
    if (val.length === lengthInput) {

      verifyOtpAPI({
        otpCode: val,
        email: route.params?.email
      }).then((res) => {
        console.log("🚀 ~ file: OtpScreen.jsx:47 ~ onChangeText ~ res", res)
        if (res)
        navigation.replace('ResetPasswordScreen', {
          email: route.params?.email
        })
      })
      Keyboard.dismiss()

    }
  }

  const handleResendOtp = () => {
    if (enableResend) {
      sendOtpAPI({
        email: route.params?.email
      }).then((res) => {
        console.log("🚀 ~ file: OtpScreen.jsx:58 ~ sendOtpAPI ~ res", res)
        setOtpValue('')
        if (res) {
          setCountdown(10)
          setEnableResend(false)
        }
      })
      textInputRef.focus()
    }
  }

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <KeyboardAwareScrollView
          extraScrollHeight={80}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          contentContainerStyle={[styles.containerAvoidView, { backgroundColor: theme.background }]}
        >
          <AppText font="h0" color="primary" style={styles.textHeader}>OTP</AppText>
          <Image
            style={styles.image}
            source={require('assets/images/illutration3.png')}
          />
          <AppText font="body0" style={styles.label}>Input your OTP code sent via your email</AppText>
          <View>
            <TextInput
              ref={(input) => textInputRef = input}
              onChangeText={onChangeText}
              style={styles.textInput}
              value={otpValue}
              maxLength={lengthInput}
              returnKeyType='done'
              keyboardType='numeric'
            />
            <View style={styles.containerInput}>
              {
                Array(lengthInput).fill().map((data, index) => (
                  <Pressable
                    key={index}
                    onPress={() => textInputRef.focus()}
                  >
                    <View 
                      style={[
                        styles.cellView,
                        {
                          borderBottomColor: index === otpValue. length ? 'red' : theme.onBackground
                        }
                      ]} 
                    >
                      <AppText
                        font="h2"
                        color="primary"
                        style={styles.cellText}
                      >
                        {otpValue && otpValue.length > 0 ? otpValue[index] : ''}
                      </AppText>
                    </View>
                  </Pressable>
                ))
              }
            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => navigation.replace('ForgotPasswordScreen')}
            >
              <View style={styles.btnChangeEmail}>
                <AppText font="h5" color="secondary" style={styles.textChange}>Change your email</AppText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleResendOtp()}
            >
              <View style={styles.btnChangeResend}>
                <AppText
                  font="h5"
                  style={[styles.textResend,
                  {
                    color: enableResend ? theme.secondary : theme.outline
                  }
                  ]}
                >Resend OTP {countdown !== 0 ? `(${countdown})` : ''}</AppText>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        </View>
    </>
  )
});

export default OtpScreen