import { View, Text, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'

import { styles } from './OtpScreenStyles'
import { app_c } from 'globals/styles'
import { Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native'
import { sendOtpAPI, verifyOtpAPI } from 'apis/axios'

const OtpScreen = () => {

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
        style={styles.container}
      >
        <KeyboardAwareScrollView
          extraScrollHeight={80}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          contentContainerStyle={styles.containerAvoidView}
        >
          <Text style={styles.textHeader}>OTP</Text>
          <Image
            style={styles.image}
            source={require('assets/images/illutration3.png')}
          />
          <Text style={styles.label}>Input your OTP code sent via your email</Text>
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
                        borderBottomColor: index === otpValue. length ? 'red' : app_c.HEX.fourth 
                      }
                    ]} 
                  >
                    <Text 
                      style={styles.cellText}
                    >
                      {otpValue && otpValue.length > 0 ? otpValue[index] : ''}
                    </Text>
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
                <Text style={styles.textChange}>Change your email</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleResendOtp()}
            >
              <View style={styles.btnChangeResend}>
                <Text 
                  style={[styles.textResend,
                  {
                    color: enableResend ? app_c.HEX.third : 'gray'
                  }
                  ]}
                >Resend OTP {countdown !== 0 ? `(${countdown})` : ''}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        </View>
    </>
  )
}

export default OtpScreen