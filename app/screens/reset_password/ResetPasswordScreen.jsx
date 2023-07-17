import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native'
import React from 'react'

import { resetPasswordAPI } from 'apis/axios'

import { withTheme } from 'hocs/withTheme'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, useForm } from 'react-hook-form'

import { FIELD_MIN_LENGTH_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from 'utilities/validators'

import {
  ButtonText,
  Input,
  AppText,
  RectangleButton
} from 'components'

import { styles } from './ResetPasswordScreenStyles'
import { app_sp } from 'globals/styles'

const ResetPasswordScreen = withTheme(({
  theme
}) => {

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const { control, handleSubmit, formState: { errors }, setValue } = useForm ({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })
  
  const onSubmit = async (data) => {
      console.log("🚀 ~ file: ResetPasswordScreen.jsx:28 ~ onSubmit ~ email", route.params?.email)
      const userUpdate = {
        email: route.params?.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }
      // Phuong: call Api
      resetPasswordAPI(userUpdate).then((res) => {
        if (res) {
          console.log("🚀 ~ file: SignupScreen.js:80 ~ signUpUserAPI ~ res", res)
          // Phuong: move to SigninScreen screen
          navigation.replace('SigninScreen')
        }
      })
  }

  return (
    <>
      <ScrollView
        style={{backgroundColor: theme.background, flex: 1}}
      >
        <KeyboardAwareScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}   
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.content}>
              <AppText font="h0" color="primary" style={app_sp.mb_18}>Reset password</AppText>
              <Image
                style={styles.image}
                source={require('assets/images/illutration4.png')}
              />

              <AppText font="body2">Your new password must be different from previous used passwords</AppText>

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: FIELD_REQUIRED_MESSAGE
                  },
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  },
                  minLength: {
                    value: 8,
                    message: FIELD_MIN_LENGTH_MESSAGE
                  },
                }}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='New password'
                    hint='Enter your new password...'
                    isPassword={true}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.password}
                  />
                )}
              />
              {errors.password && <AppText font="body1" style={[styles.textError, app_sp.mt_6]}>{errors.password?.message}</AppText>}

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: FIELD_REQUIRED_MESSAGE
                  },
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  },
                  minLength: {
                    value: 8,
                    message: FIELD_MIN_LENGTH_MESSAGE
                  },
                }}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='Confirm new password'
                    hint='Enter your confirm new password...'
                    isPassword={true}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.confirmPassword}
                  />
                )}
              />
              {errors.confirmPassword && <AppText font="body1" style={[styles.textError, app_sp.mt_6]}>{errors.confirmPassword?.message}</AppText>}
                <RectangleButton
                  isActive
                  overrideShape="rounded_8"
                  typeOfButton="opacity"
                  style={{...app_sp.mt_12, ...app_sp.pv_16}}
                  onPress={handleSubmit(onSubmit)}
                >
                  Reset password
                </RectangleButton>
                
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

        </ScrollView>
    </>
  )
});

export default ResetPasswordScreen