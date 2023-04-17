import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import React from 'react'

import { styles } from './ForgotPasswordScreenStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { app_c } from 'globals/styles'
import { ButtonText, Input } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from 'utilities/validators'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { sendOtpAPI } from 'request_api'
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

const ForgotPasswordScreen = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()
  
  const langCode = useSelector(selectCurrentLanguage).languageCode
  const langData = useSelector(selectCurrentLanguage).data?.forgotPasswordScreen
  const formData = useSelector(selectCurrentLanguage).data?.form

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
      navigation.replace('OtpScreen', {
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
                <Text style={styles.textHeader}>{langData.text_header[langCode]}</Text>

                <Image
                  style={styles.image}
                  source={require('assets/images/illutration2.png')}
                />

                <Text style={styles.textInfo}>{ langData.desc[langCode] }</Text>

                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: formData.FIELD_REQUIRED_MESSAGE[langCode]
                    },
                    pattern: {
                      value: EMAIL_RULE,
                      message: formData.EMAIL_RULE_MESSAGE[langCode]
                    },
                  }}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label={langData.email_address[langCode]}
                      hint={langData.enter_email_address[langCode]}
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
                  label={langData.send_otp[langCode]}
                  onPress={handleSubmit(handleSendOTP)}
                />

                <TouchableOpacity
                  onPress={() => navigation.pop()}
                  style={styles.containerLabel}
                >
                  <Text style={styles.labelSignin}>{langData.go_back[langCode]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        </ScrollView>
    </>
  )
}

export default ForgotPasswordScreen