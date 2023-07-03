import React, { useEffect, useState } from 'react'
import {
  Button,
  View, 
  Text, 
  Image, 
  TouchableWithoutFeedback, 
  Keyboard,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment'

import { updateCurrentUser } from 'redux/user/UserSlice'
import { updateNotif } from 'redux/manifold/ManifoldSlice'
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import {
  signInUserAPI,
  signUpUserAPI
} from 'apis/axios'

import { withTheme } from 'hocs/withTheme'

import {
  useAuthActions
} from 'customHooks/useAuth'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {
  BIRTHDAY_RULE,
  BIRTHDAY_RULE_MESSAGE,
  EMAIL_RULE,
  FIELD_MIN_LENGTH_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from 'utilities/validators'
import { termsConditions } from 'utilities/termsConditions'

import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from "react-native-modal"
import Octicons from 'react-native-vector-icons/Octicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import RNDateTimePicker from '@react-native-community/datetimepicker'

import {
  AppText,
  ButtonText,
  CheckBoxText,
  Input,
  BottomSheetScroll,
  RectangleButton
} from 'components'

import { styles } from './SignupScreenStyles'
import { app_c, app_sh, app_shdw, app_sp } from 'globals/styles'

const SignupScreen = withTheme(({
  theme
}) => {

  // Phuong: https://github.com/Cnilton/react-native-floating-label-input
  // Phuong: https://react-hook-form.com/get-started#ReactNative
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const langCode = useSelector(selectCurrentLanguage).languageCode // vi or en 
  const langData = useSelector(selectCurrentLanguage).data?.signUpScreen
  const formData = useSelector(selectCurrentLanguage).data?.form

  const [isChecked, setIsChecked] = useState(false)
  const [isShowCheckBox, setIsShowCheckBox] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [timestamp, setTimestamp] = useState(null)
  const [dateTime, setDateTime] = useState(new Date())

  const { signup } = useAuthActions();

  const [openTermCondition, setOpenTermCondition] = useState(false) 

  const { control, handleSubmit, formState: { errors }, setValue } = useForm ({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      birthday: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data) => {
    await signup(data, {
      checkConditionFirst: () => {
        if (!isChecked)
        dispatch(updateNotif({
          appearNotificationBottomSheet: true,
          contentNotificationBottomSheet: langData.prompt_check[langCode]
        }))
        return isChecked
      },
      callWhenResolve: () => {
        navigation.replace("SigninScreen");
      }
    })
  }

  const handleDateChange = (e, date) => {
    console.log("🚀 ~ file: SignupScreen.js:88 ~ handleDateChange ~ date", date)
    console.log("🚀 ~ file: SignupScreen.js:88 ~ handleDateChange ~ e", e)
    setTimestamp(e.timeStamp)
    setDateTime(date)
  }

  return (
    <>
      <KeyboardAwareScrollView
        extraScrollHeight={40}
        style={[styles.containerScrollView, { backgroundColor: theme.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        showsVerticalScrollIndicator={false}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        </TouchableWithoutFeedback> */}
          <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.content}>
            <AppText font="h0" color="primary" style={app_sp.mb_18}>{langData?.text_header[langCode]}</AppText>

            <AppText font="h5" style={app_sp.mb_12}>{langData?.intro_youself[langCode]}</AppText>

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: formData.FIELD_REQUIRED_MESSAGE[langCode]
                },
              }}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={langData?.email[langCode]}
                  hint={langData?.enter_email[langCode]}
                  isPassword={false}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.email}
                  containerStyle={{
                    marginTop: 0
                  }}
                />
              )}
            />
            {errors.email && <AppText style={styles.textError}>{errors.email?.message}</AppText>}
      
            <View style={styles.fullname}>
              <View style={styles.containerError}>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: formData.FIELD_REQUIRED_MESSAGE[langCode]
                    },
                    minLength: {
                      value: 2,
                      message: formData.AT_LEAST2_RULE_MESSAGE[langCode]
                    }
                  }}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label={langData?.first_name[langCode]}
                      hint={langData?.enter_first_name[langCode]}
                      isPassword={false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={errors.firstName}
                    />
                  )}
                />
                {errors.firstName && <AppText style={styles.textError}>{errors.firstName?.message}</AppText>}
              </View>
              <View style={styles.fillView}/>
              <View style={styles.containerError}>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: formData.FIELD_REQUIRED_MESSAGE[langCode]
                    },
                    minLength: {
                      value: 2,
                      message: formData.AT_LEAST2_RULE_MESSAGE[langCode]
                    }
                  }}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label={langData?.last_name[langCode]}
                      hint={langData?.enter_last_name[langCode]}
                      isPassword={false}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={errors.lastName}
                    />
                  )}
                />
                {errors.lastName && <AppText style={styles.textError}>{errors.lastName?.message}</AppText>}
              </View>
            </View>

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: formData.FIELD_REQUIRED_MESSAGE[langCode]
                },
                pattern: {
                  value: BIRTHDAY_RULE,
                  message: formData.BIRTHDAY_RULE_MESSAGE[langCode]
                },
              }}
              name="birthday"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={langData?.birthday[langCode]}
                  hint={langData?.enter_birthday[langCode]}
                  isPassword={false}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.birthday}
                />
              )}
            />
            {errors.birthday && <AppText style={styles.textError}>{errors.birthday?.message}</AppText>}

            <AppText font="h5" style={[app_sp.mb_12, app_sp.mt_18]}>{langData?.fill_info[langCode]}</AppText>
              
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: formData.FIELD_REQUIRED_MESSAGE[langCode]
                },
                minLength: {
                  value: 8,
                  message: formData.FIELD_MIN_LENGTH_MESSAGE[langCode]
                }
              }}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={langData?.username[langCode]}
                  hint={langData?.enter_username[langCode]}
                  isPassword={false}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.username}
                  containerStyle={{
                    marginTop: 0
                  }}
                />
              )}
            />
            {errors.username && <AppText style={styles.textError}>{errors.username?.message}</AppText>}
                
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: formData.FIELD_REQUIRED_MESSAGE[langCode]
                },
                pattern: {
                  value: PASSWORD_RULE,
                  message: formData.PASSWORD_RULE_MESSAGE[langCode]
                },
                minLength: {
                  value: 8,
                  message: formData.FIELD_MIN_LENGTH_MESSAGE[langCode]
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
            {errors.password && <AppText style={styles.textError}>{errors.password?.message}</AppText>}

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: formData.FIELD_REQUIRED_MESSAGE[langCode]
                },
                pattern: {
                  value: PASSWORD_RULE,
                  message: formData.PASSWORD_RULE_MESSAGE[langCode]
                },
                minLength: {
                  value: 8,
                  message: formData.FIELD_MIN_LENGTH_MESSAGE[langCode]
                },
              }}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={langData?.confirm_password[langCode]}
                  hint={langData?.enter_confirm_password[langCode]}
                  isPassword={true}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.confirmPassword}
                />
              )}
            />
            {errors.confirmPassword && <AppText style={styles.textError}>{errors.confirmPassword?.message}</AppText>}

            <View style={[styles.terms, app_sp.mv_12]}>
              <AppText style={styles.textRead}>{langData?.read_our[langCode]}</AppText>
              {/* <RectangleButton
                onPress={() => setOpenTermCondition(true)}
              >
                {langData?.term_condition[langCode]}
              </RectangleButton> */}
              <AppText
                color="secondary"
                onPress={() => setOpenTermCondition(true)}
                style={app_sp.mh_6}
              >{langData?.term_condition[langCode]}</AppText>
              { 
                langCode === 'vi' &&
                <AppText style={styles.textRead}>của chúng tôi</AppText>
              }
            </View>
              {
                isShowCheckBox &&
                <View style={styles.containerReFor}>
                  <CheckBoxText
                    isChecked={isChecked}
                    label={langData?.agree[langCode]}
                    onPress={() => setIsChecked(!isChecked)}
                  />
                </View>
              }
              <RectangleButton
                isActive
                overrideShape="rounded_8"
                onPress={handleSubmit(onSubmit)}
                style={app_sp.mt_12}
              >
                {langData?.text_header[langCode]}
              </RectangleButton>
              
            </View>
            
              <View style={styles.containerSignup}>
                <AppText style={styles.labelNoAccount}>{langData?.have_account[langCode]}</AppText>
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                >
                  <AppText font="h5" color="secondary" style={[styles.labelSignup, app_sp.ms_6]}>{langData?.sign_in[langCode]}</AppText>
                </TouchableOpacity>
              </View>
          </View>
      </KeyboardAwareScrollView>
      <BottomSheetScroll
        bottomView={{backgroundColor: theme.background}}
        openTermCondition={openTermCondition} 
        closeTermCondition={() => {
          setOpenTermCondition(false)
          setIsShowCheckBox(true)
        }}
        handleLabelBtn={() => {
          setOpenTermCondition(false)
          setIsShowCheckBox(true)
          setIsChecked(true)
        }}
        labelBtn={langData.agree_short[langCode]}
        snapPoints={['25%', '100%']}
        childView={
          termsConditions[langCode].map((item) => (
            <View key={`term-${item.id}`}>
              <AppText font="h4" style={[styles.headerText, app_sp.mt_18]}>{item.headerText}</AppText>
              {
                item.paragraphs.map((paragraph, index) => (
                  <View key={`paragraph-${index}`}>
                    <AppText style={styles.paragraph}>{paragraph.content}</AppText>
                    {
                      paragraph.childContent &&
                      paragraph.childContent.map((child, index) => (
                        <View key={`childcontent-${index}`}>
                          <View
                            style={styles.childContentContainer}
                          >
                            <Octicons 
                              name='dot-fill' 
                              size={14} 
                              color={theme.onBackground}
                            />
                            <AppText style={styles.childContent}>{child}</AppText>
                          </View>
                        </View>
                      ))
                    }
                  </View>
                ))
              }
            </View>
          ))
        }
      />
      {/* <Modal 
        isVisible={showModal}
        coverScreen={false}
        hasBackdrop={false}
      > */}
        {
          // showModal && 
          // <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          //   <View style={{marginHorizontal: 18 , backgroundColor: app_c.HEX.primary, ...app_shdw.type_2, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, ...app_sh.rounded_8}}>
          //     <RNDateTimePicker 
          //       value={dateTime}
          //       display='spinner'
          //       mode="date"
          //       onChange={(e, date) => handleDateChange(e, date)}
          //       textColor={app_c.HEX.fourth}
          //     />
          //     {/* <DateTimePicker
          //       testID="dateTimePicker"
          //       value={dateTime}
          //       mode='date'
          //       is24Hour={true}
          //       themeVariant='light'
          //       // onChange={onChange}
          //     /> */}
          //     <ButtonText
          //       label='OK'
          //       onPress={() => {
          //         setShowModal(false)
          //         setValue('birthday',  moment(dateTime).format('DD/MM/YYYY'))
          //       }}
          //       btnStyle={{
          //         marginTop: -5
          //       }}
          //       textStyle={{
          //         paddingHorizontal: 15,
          //         paddingVertical: 5
          //       }}
          //     />
          //   </View>
          // </View>
        }
      {/* </Modal> */}
    </>
  )
});

export default SignupScreen