import { 
  View, 
  Text, 
  Button, 
  Image, 
  TouchableWithoutFeedback, 
  Keyboard,
  CheckBox,
  Pressable,
  TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { FloatingLabelInput } from 'react-native-floating-label-input'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as SecureStore from 'expo-secure-store'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { useForm, Controller } from 'react-hook-form'

import { app_c, app_typo } from 'globals/styles'
import { styles } from './SigninStyles'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import { KEY_EMAIL_NAME, KEY_PASSWORD } from 'utilities/constants'
import { FIELD_MIN_LENGTH_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from 'utilities/validators'

const Signin = () => {

  // Phuong: https://github.com/Cnilton/react-native-floating-label-input
  // Phuong: https://react-hook-form.com/get-started#ReactNative

  

  const [isEmailNameFocused, setIsEmailNameFocused] = useState(false)
  const [isPassFocused, setIsPassFocused] = useState(false)

  const [emailName, setEmailName] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(null)
  
  const { control, handleSubmit, formState: { errors } } = useForm ({
      defaultValues: {
        password: emailName,
        emailname: password
      }
    })

  useEffect(() => {
   async () => {
    let emailName = await SecureStore.getItemAsync(KEY_EMAIL_NAME)
    setEmailName(emailName)

    let password = await SecureStore.getItemAsync(KEY_PASSWORD)
    setPassword(password)

    if (emailName && password)
      setIsChecked(true)
    else
      setIsChecked(false)
   }
    console.log("🚀 ~ file: Signin.js:60 ~ password", password)
    console.log("🚀 ~ file: Signin.js:60 ~ emailName", emailName)
  }, [])

  const onSubmit = async (data) => {
    if (data.emailname && data.password) {
      // Phuong: call Api
      // Phuong: Api returen value => set to localStorage
      if (isChecked) {
        console.log("🚀 ~ file: Signin.js:62 ~ onSubmit ~ data", data)
        await SecureStore.setItemAsync(KEY_EMAIL_NAME, data.emailname)
        await SecureStore.setItemAsync(KEY_PASSWORD, data.password)
      }
      
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
              render={({ field: { onChange, onBlur, value } }) => (
                <FloatingLabelInput
                  label='Email or username'
                  hint='Enter your email or username...'
                  isFocused={isEmailNameFocused}
                  onBlur={() => {
                    setIsEmailNameFocused(false)
                    onBlur()
                  }}
                  onFocus={() => {
                    setIsEmailNameFocused(true)
                  }}
                  labelStyles={{
                    paddingHorizontal: 6,
                    backgroundColor: app_c.HEX.primary
                  }}
                  customLabelStyles={{
                    topFocused: -25,
                    fontSizeFocused: 12,
                    leftBlurred: -2,
                    colorBlurred: errors.emailname ? '#F32424' : (isEmailNameFocused ? app_c.HEX.fourth : '#808080'),
                    colorFocused: errors.emailname ? '#F32424' : (isEmailNameFocused ? app_c.HEX.fourth : '#808080')
                  }}
                  containerStyles={{
                    borderWidth: isEmailNameFocused ? 1.5 : 1,
                    paddingHorizontal: 12,
                    borderColor: errors.emailname ? '#F32424' : (isEmailNameFocused ? app_c.HEX.fourth : '#808080'),
                    borderRadius: 8,
                    height: 48
                  }}
                  inputStyles={{
                    color: app_c.HEX.fourth,
                    paddingHorizontal: 4,
                    backgroundColor: app_c.HEX.primary
                  }}
                  togglePassword={false}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="emailname"
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
              render={({ field: { onChange, onBlur, value } }) => (
                <FloatingLabelInput
                  label='Password'
                  hint='Enter your password...'
                  isPassword
                  isFocused={isPassFocused}
                  onBlur={() => {
                    setIsPassFocused(false)
                    onBlur()
                  }}
                  onFocus={() => {
                    setIsPassFocused(true)
                  }}
                  labelStyles={{
                    paddingHorizontal: 6,
                    backgroundColor: app_c.HEX.primary
                  }}
                  customLabelStyles={{
                    topFocused: -25,
                    fontSizeFocused: 12,
                    leftBlurred: -2,
                    colorBlurred: errors.password ? '#F32424' : (isPassFocused ? app_c.HEX.fourth : '#808080'),
                    colorFocused: errors.password ? '#F32424' : (isPassFocused ? app_c.HEX.fourth : '#808080')
                  }}
                  containerStyles={{
                    borderWidth: isPassFocused ? 1.5 : 1,
                    paddingHorizontal: 12,
                    borderColor: errors.password ? '#F32424' : (isPassFocused ? app_c.HEX.fourth : '#808080'),
                    borderRadius: 8,
                    height: 48,
                    marginTop: 20,
                  }}
                  inputStyles={{
                    color: app_c.HEX.fourth,
                    paddingHorizontal: 4,
                    backgroundColor: app_c.HEX.primary
                  }}
                  togglePassword={false}
                  value={value}
                  onChangeText={onChange}
                  customShowPasswordComponent= {
                    <Icon 
                      name='eye-slash' 
                      size={16} 
                      color={isPassFocused ? app_c.HEX.fourth : '#808080'}
                      style={{fontWeight: '600', padding: 4}}
                    />
                  }
                  customHidePasswordComponent= {
                    <Icon 
                      name='eye' 
                      size={16} 
                      color={isPassFocused ? app_c.HEX.fourth : '#808080'}
                      style={{fontWeight: '600', padding: 4}}
                    />
                  }
                />
              )}
              name="password"
            />
            {errors.password && <Text style={styles.textError}>{errors.password?.message}</Text>}

            <View style={styles.containerReFor}>
              <Pressable onPress={() => setIsChecked(!isChecked)} style={styles.containerRe}>
                <View style={styles.checkbox}>
                  <AnimatedCheckbox
                    checked={isChecked}
                    highlightColor={isChecked ? app_c.HEX.fourth : app_c.HEX.primary}
                    checkmarkColor="#ffffff"
                    boxOutlineColor={isChecked ? app_c.HEX.fourth : '#808080'}
                  />
                </View>
                <Text style={[styles.label, {
                  color: isChecked ? app_c.HEX.fourth : '#808080'
                }]}>Remember</Text>
              </Pressable>
              <TouchableOpacity
                onPress={() => console.log(password)}
              >
                <Text style={styles.textFor}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.btn}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.labelButton}>Sign In</Text>
            </TouchableOpacity>

          </View>
          
          <View style={{ flex: 1}}></View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.containerFooter}>
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
          <TouchableOpacity>
            <Text style={styles.labelSignup}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signin