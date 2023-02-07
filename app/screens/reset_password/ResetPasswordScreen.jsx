import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

import { styles } from './ResetPasswordScreenStyles'
import { app_c } from 'globals/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, useForm } from 'react-hook-form'
import { FIELD_MIN_LENGTH_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from 'utilities/validators'
import { ButtonText, Input } from 'components'
import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { resetPasswordAPI } from 'request_api'
import { Image } from 'react-native'

const ResetPasswordScreen = () => {

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
        style={{backgroundColor: app_c.HEX.primary, flex: 1}}
      >
        <KeyboardAwareScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.content}>
              <Text style={styles.textHeader}>Reset password</Text>

              <Image
                style={styles.image}
                source={require('assets/images/illutration4.png')}
              />

              <Text style={styles.smallLabel}>Your new password must be different from previous used passwords</Text>

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
              {errors.password && <Text style={styles.textError}>{errors.password?.message}</Text>}

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
              {errors.confirmPassword && <Text style={styles.textError}>{errors.confirmPassword?.message}</Text>}

                <ButtonText
                  label='Reset password'
                  onPress={handleSubmit(onSubmit)}
                />
                
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

        </ScrollView>
    </>
  )
}

export default ResetPasswordScreen