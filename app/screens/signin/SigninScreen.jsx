import { 
  View, 
  Text, 
  Image, 
  TouchableWithoutFeedback, 
  Keyboard,
  Pressable,
  TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'

import Input from 'components/input/Input'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import { useForm, Controller } from 'react-hook-form'

import { styles } from './SigninScreenStyles'
import { EMAIL_RULE, FIELD_MIN_LENGTH_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from 'utilities/validators'
import { updateCurrentUser } from 'redux/user/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { selectCurrentWareHouse, updateCurrentWareHouse } from 'redux/warehouse/WareHouseSlice'
import { validateRegex } from 'utilities/functions'
import ButtonText from 'components/button_text/ButtonText'
import CheckBoxText from 'components/checkbox_text/CheckBoxText'
import { signInUserAPI } from 'request_api'
import { RectangleButton } from 'components'
import { app_sp } from 'globals/styles'

const SigninScreen = () => {

  // Phuong: https://github.com/Cnilton/react-native-floating-label-input
  // Phuong: https://react-hook-form.com/get-started#ReactNative

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const warehouse = useSelector(selectCurrentWareHouse)

  const [isEmailNameFocused, setIsEmailNameFocused] = useState(false)
  const [isPassFocused, setIsPassFocused] = useState(false)

  const [isChecked, setIsChecked] = useState(null)
  
  const { control, handleSubmit, formState: { errors } } = useForm ({
      defaultValues: {
        password: warehouse.password ? warehouse.password : '',
        emailname: warehouse.emailName ? warehouse.emailName : ''
      }
    })

  useEffect(() => {
    dispatch(updateCurrentWareHouse(
      {
        ...warehouse,
        isFirstTimeLauch: false
      }
    ))
  }, []) 

  useEffect(() => {
    if (warehouse.emailName && warehouse.password)
      setIsChecked(true)
  }, [warehouse.emailName, warehouse.password])

  const onSubmit = async (data) => {
    if (data.emailname && data.password) {
      // Phuong: check emailname is email or username
      let user 
      if (validateRegex(data.emailname, EMAIL_RULE)) {
        user = {
          email: data.emailname,
          password : data.password
        }
      } else {
        user = {
          username: data.emailname,
          password : data.password
        }
      }
      // Phuong: call Api
      signInUserAPI(user).then((res) => {
        console.log("🚀 ~ file: Signin.js:73 ~ onSubmit ~ res", res)
        if (res) {
          // Phuong: Update user in persistent store
          dispatch(updateCurrentUser(res))
          // Phuong
          // Phuong: check rememberme
          if (isChecked) {
            // Phuong: save emailname and password to remember
            dispatch(updateCurrentWareHouse({
              ...warehouse,
              emailName: data.emailname,
              password: data.password
            }))
          } else {
            // Phuong: If don't check remember. We clear sesitive infomation
            dispatch(updateCurrentWareHouse({
              ...warehouse,
              emailName: null,
              password: null
            }))
          }
          // Phuong: move to GroupBottomTab screen
          navigation.replace('GroupBottomTab')
        }
      })
    }
  }
  
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={40}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View style={styles.content}>
          <Text style={styles.textHeader}>Sign in</Text>
            <Image
              style={styles.image}
              source={require('assets/images/illutration1.png')}
            />
            
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: FIELD_REQUIRED_MESSAGE
                },
              }}
              name="emailname"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label='Email or username'
                  hint='Enter your email or username...'
                  isPassword={false}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.emailname}
                />
              )}
            />
            {errors.emailname && <Text style={styles.textError}>{errors.emailname?.message}</Text>}

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
                  label='Password'
                  hint='Enter your password...'
                  isPassword={true}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.password}
                />
              )}
            />
            {errors.password && <Text style={styles.textError}>{errors.password?.message}</Text>}

            <View style={styles.containerReFor}>
              <CheckBoxText
                label='Remember me'
                onPress={() => setIsChecked(!isChecked)}
                isChecked={isChecked}
              />
              <TouchableOpacity
              // Phuong: vi user goback() dc
                onPress={() => navigation.push('ForgotPasswordScreen')}
              >
                <Text style={styles.textFor}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <ButtonText
              label='Sign In'
              onPress={handleSubmit(onSubmit)}
            />

            {/* <RectangleButton
              overrideShape="rounded_8"
              typeOfButton="opacity"
              fontOfText='h4'
              defaultColor="type_4"
              style={{...app_sp.mt_12, ...app_sp.pv_16}}
              handlePressButton={handleSubmit(onSubmit)}
            >Sign In</RectangleButton> */}
            
          </View>
          
          <View style={{ flex: 1}}></View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.containerFooter}>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => navigation.replace('GroupBottomTab')}
        >
          <Text style={styles.signInAsGuest}>Sign in as Guest</Text>
        </TouchableOpacity>
          <Text style={styles.labelSocial}>Or Signin with</Text>
          <View style={styles.containerSocialBtn}>
            <TouchableOpacity>
              <Image
                style={styles.imageSocial}
                source={require('assets/images/facebook.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={[styles.imageSocial,{ marginHorizontal: 25}]}
                source={require('assets/images/google.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                  style={styles.imageSocial}
                  source={require('assets/images/twitter.png')}
                />
            </TouchableOpacity>
          </View>
        <View style={styles.containerSignup}>
          <Text style={styles.labelNoAccount}>You don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.push('SignupScreen')}
          >
            <Text style={styles.labelSignup}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default SigninScreen