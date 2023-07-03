import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image
} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { sendOtpAPI } from 'apis/axios'

import { withTheme } from 'hocs/withTheme'

import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, useForm } from 'react-hook-form'

import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from 'utilities/validators'

import {
  ButtonText,
  Input,
  RectangleButton,
  AppText
} from 'components'
import { styles } from './ForgotPasswordScreenStyles'
import { app_sp } from 'globals/styles'

const ForgotPasswordScreen = withTheme(({
  theme
}) => {

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
    <KeyboardAwareScrollView
      extraScrollHeight={-100}
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[styles.containerScrollView, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.content}>
            <AppText font="h1" color="primary" style={styles.textHeader}>{langData.text_header[langCode]}</AppText>
            <Image
              style={styles.image}
              source={require('assets/images/illutration2.png')}
            />

            <AppText font="body0" style={styles.textInfo}>{langData.desc[langCode]}</AppText>

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
            {errors.email && <AppText font="body1" style={styles.textError}>{errors.email?.message}</AppText>}

            {/* <ButtonText
              label={langData.send_otp[langCode]}
              onPress={handleSubmit(handleSendOTP)}
            />

            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={styles.containerLabel}
            >
              <AppText style={styles.labelSignin}>{langData.go_back[langCode]}</AppText>
            </TouchableOpacity> */}

            <RectangleButton
              isActive
              overrideShape="rounded_8"
              typeOfButton="opacity"
              style={{...app_sp.mt_12, ...app_sp.pv_16}}
              onPress={handleSubmit(handleSendOTP)}
            >
              {langData.send_otp[langCode]}
            </RectangleButton>

            <RectangleButton
              overrideShape="rounded_8"
              typeOfButton="opacity"
              defaultColor="type_4"
              style={{...app_sp.mt_12, ...app_sp.pv_16}}
              onPress={() => navigation.pop()}
            >
              {langData.go_back[langCode]}
            </RectangleButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
});

export default ForgotPasswordScreen