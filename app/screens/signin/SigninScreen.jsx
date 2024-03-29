import { 
  View, 
  Text, 
  Image, 
  TouchableWithoutFeedback, 
  Keyboard,
  Pressable,
  TouchableOpacity,
  Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { signInUserAPI } from 'apis/axios'

import { withTheme } from 'hocs/withTheme'

import {
  useAuth,
  useAuthActions
} from 'customHooks/useAuth'

import FunctionsUtility from 'utilities/functions'
import { EMAIL_RULE, PASSWORD_RULE } from 'utilities/validators'

import { selectCurrentWareHouse, updateCurrentWareHouseState } from 'redux/warehouse/WareHouseSlice'
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'
import { updateCurrentNotifs } from 'redux/notifications/NotificationsSlice'
import { updateCurrentUser } from 'redux/user/UserSlice'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {
  AppText,
  RectangleButton,
  Input,
  CheckBoxText,
  ButtonText
} from 'components'

import { styles } from './SigninScreenStyles'
import { app_sp } from 'globals/styles'

const SigninScreen = withTheme(({
  theme,
  toggleTheme
}) => {
  // Phuong: https://github.com/Cnilton/react-native-floating-label-input
  // Phuong: https://react-hook-form.com/get-started#ReactNative
  const navigation = useNavigation()
  const langCode = useSelector(selectCurrentLanguage).languageCode // vi or en 
  const langData = useSelector(selectCurrentLanguage).data?.signInScreen
  const formData = useSelector(selectCurrentLanguage).data?.form

  const {
    rememberedAccount,
    signin,
    updateIsFirstTimeLaunch,
    rememberAccount
  } = useAuth();

  const dispatch = useDispatch();
  const [isEmailNameFocused, setIsEmailNameFocused] = useState(false)
  const [isPassFocused, setIsPassFocused] = useState(false)

  const [isChecked, setIsChecked] = useState(null)
  
  const { control, handleSubmit, formState: { errors } } = useForm ({
    defaultValues: {
      password: rememberedAccount.password ? rememberedAccount.password : '',
      emailName: rememberedAccount.emailName ? rememberedAccount.emailName : ''
    }
  })

  const onSubmit = async data => {
    // console.log("Sign in data: ", data);
    await signin(data, {
      callWhenResolve: (data) => {
        // console.log("Res data: ", data)
        if (isChecked) {
          console.log("REMEMBER THIS USER");
          // Phuong: save emailName and password to remember
          rememberAccount(data.emailName, data.password)
        } else {
          // Phuong: If don't check remember. We clear sesitive infomation
          rememberAccount(null, null)
        }
        navigation.replace("GroupBottomTab")
      }
    })
  }

  useEffect(() => {
    updateIsFirstTimeLaunch(false)
  }, []) 

  useEffect(() => {
    if (rememberedAccount.emailName && rememberedAccount.password)
      setIsChecked(true)
  }, [rememberedAccount.emailName, rememberedAccount.password])
  
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={40}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View style={styles.content}>
            <AppText font="h0" color="primary" style={app_sp.mb_18}>{langData?.text_header[langCode]}</AppText>
            <Image
              style={styles.image}
              source={require('assets/images/illutration1.png')}
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: formData?.FIELD_REQUIRED_MESSAGE[langCode]
                },
              }}
              name="emailName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={langData?.email_or_username[langCode]}
                  hint={langData?.enter_email_or_username[langCode]}
                  isPassword={false}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.emailName}
                />
              )}
            />
            {errors.emailName && <AppText font="body1" style={[styles.textError, app_sp.mt_6]}>{errors.emailName?.message}</AppText>}

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: formData?.FIELD_REQUIRED_MESSAGE[langCode]
                },
                pattern: {
                  value: PASSWORD_RULE,
                  message: formData?.PASSWORD_RULE_MESSAGE[langCode]
                },
                minLength: {
                  value: 8,
                  message: formData?.FIELD_MIN_LENGTH_MESSAGE[langCode]
                },
              }}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={langData?.password[langCode]}
                  hint={langData?.enter_password[langCode]}
                  isPassword={true}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.password}
                />
              )}
            />
            {errors.password && <AppText font="body1" style={[styles.textError, app_sp.mt_6]}>{errors.password?.message}</AppText>}

            <View style={styles.containerReFor}>
              <CheckBoxText
                label={langData?.remember_me[langCode]}
                onPress={() => setIsChecked(!isChecked)}
                isChecked={isChecked}
              />
              <TouchableOpacity
              // Phuong: vi user goback() dc
                onPress={() => navigation.push('ForgotPasswordScreen')}
              >
                <AppText font="h5" color="secondary" style={styles.textFor}>{langData?.forgot_password[langCode]}</AppText>
              </TouchableOpacity>
            </View>

            {/* <ButtonText
              label={langData?.text_header[langCode]}
              onPress={handleSubmit(onSubmit)}
            /> */}

            <RectangleButton
              isActive
              overrideShape="rounded_8"
              typeOfButton="opacity"
              style={{...app_sp.mt_12, ...app_sp.pv_16}}
              onPress={handleSubmit(onSubmit)}
            >
              {langData?.text_header[langCode]}
            </RectangleButton>
          </View>
          
          <View style={{ flex: 1}}></View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.containerFooter}>
        {/* <RectangleButton onPress={toggleTheme}>Change theme</RectangleButton> */}
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => navigation.replace('GroupBottomTab')}
        >
          <AppText font="h5" color="secondary" style={styles.signInAsGuest}>{langData?.sign_in_as_gest[langCode]}</AppText>
        </TouchableOpacity>
          <AppText style={styles.labelSocial}>{langData?.or_signin_with[langCode]}</AppText>
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
          <AppText style={styles.labelNoAccount}>{langData?.no_account[langCode]}</AppText>
          <AppText toScreen={{screenName: "SignupScreen"}} color="secondary" font="h5" style={styles.labelSignup}>{langData?.sign_up[langCode]}</AppText>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
});

export default SigninScreen