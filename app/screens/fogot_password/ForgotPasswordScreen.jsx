import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

import { styles } from './ForgotPasswordScreenStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { app_c } from 'globals/styles'
import { ButtonText, Input } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from 'utilities/validators'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { sendOtpAPI } from 'request_api'

const ForgotPasswordScreen = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { control, handleSubmit, formState: { errors } } = useForm ({
    defaultValues: {
      email: ''
    }
  })

  const handleSendOTP = (data) => {
    // Phuong: Call api to generate otp send to email
    sendOtpAPI({
      email: data.email
    }).then((res) => {
      console.log("🚀 ~ file: ForgotPasswordScreen.jsx:29 ~ sendOtpAPI ~ res", res)
      // Phuong: And then
      navigation.navigate('OtpScreen', {
        otpToken: res,
        email: data.email
      })
    })
  }

  return (
    <>
      <ScrollView
        style={styles.containerScrollView}
      >
        <KeyboardAwareScrollView
          extraScrollHeight={-100}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.textHeader}>Forgot Password</Text>

                <Image
                  style={styles.image}
                  source={require('assets/images/illutration2.png')}
                />

                <Text style={styles.textInfo}>Enter your email, we will send an OTP to your email to reset your password. Please note that the OTP is only valid for 2 minutes!</Text>

                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: FIELD_REQUIRED_MESSAGE
                    },
                    pattern: {
                      value: EMAIL_RULE,
                      message: EMAIL_RULE_MESSAGE
                    },
                  }}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label='Email Address'
                      hint='Enter your email address...'
                      isPassword={false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={errors.email}
                    />
                  )}
                />
                {errors.email && <Text style={styles.textError}>{errors.email?.message}</Text>}

                <ButtonText
                  label='Send OTP'
                  onPress={handleSubmit(handleSendOTP)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        </ScrollView>
    </>
  )
}

export default ForgotPasswordScreen