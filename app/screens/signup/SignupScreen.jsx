import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

import { 
  View, 
  Text, 
  Image, 
  TouchableWithoutFeedback, 
  Keyboard,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {
  signInUserAPI,
  signUpUserAPI
} from 'request_api'

import {
  useAuthActions
} from 'customHooks/useAuth'

import { updateCurrentUser } from 'redux/user/UserSlice'
import { updateNotif } from 'redux/manifold/ManifoldSlice'
import { selectCurrentLanguage } from 'redux/language/LanguageSlice'

import moment from 'moment'

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
  ButtonText,
  CheckBoxText,
  Input,
  BottomSheetScroll
} from 'components'

import { styles } from './SignupScreenStyles'
import { app_c, app_sh, app_shdw } from 'globals/styles'

const SignupScreen = () => {

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
    })

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
        style={styles.containerScrollView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        showsVerticalScrollIndicator={false}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        </TouchableWithoutFeedback> */}
          <View style={styles.container}>
            <View style={styles.content}>
            <Text style={styles.textHeader}>{langData?.text_header[langCode]}</Text>

            <Text style={[styles.smallLabel,{ marginTop: 0}]}>{langData?.intro_youself[langCode]}</Text>

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
            {errors.email && <Text style={styles.textError}>{errors.email?.message}</Text>}
      
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
                {errors.firstName && <Text style={styles.textError}>{errors.firstName?.message}</Text>}
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
                {errors.lastName && <Text style={styles.textError}>{errors.lastName?.message}</Text>}
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
            {errors.birthday && <Text style={styles.textError}>{errors.birthday?.message}</Text>}

            <Text style={styles.smallLabel}>{langData?.fill_info[langCode]}</Text>
              
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
            {errors.username && <Text style={styles.textError}>{errors.username?.message}</Text>}
                
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
            {errors.password && <Text style={styles.textError}>{errors.password?.message}</Text>}

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
            {errors.confirmPassword && <Text style={styles.textError}>{errors.confirmPassword?.message}</Text>}

            <View style={styles.terms}>
              <Text style={styles.textRead}>{langData?.read_our[langCode]}</Text>
              <TouchableOpacity
                onPress={() => setOpenTermCondition(true)}
              >
                <Text style={styles.textTerms}>{langData?.term_condition[langCode]}</Text>
              </TouchableOpacity>
              { 
                langCode === 'vi' &&
                <Text style={styles.textRead}>của chúng tôi</Text>
              }
            </View>

              {
                isShowCheckBox &&
                <View style={styles.containerReFor}>
                  <CheckBoxText
                    label={langData?.agree[langCode]}
                    onPress={() => setIsChecked(!isChecked)}
                    isChecked={isChecked}
                  />
                </View>
              }

              <ButtonText
                label={langData?.text_header[langCode]}
                onPress={handleSubmit(onSubmit)}
              />
              
            </View>
            
              <View style={styles.containerSignup}>
                <Text style={styles.labelNoAccount}>{langData?.have_account[langCode]}</Text>
                <TouchableOpacity
                  onPress={() => navigation.pop()}
                >
                  <Text style={styles.labelSignup}>{langData?.sign_in[langCode]}</Text>
                </TouchableOpacity>
              </View>
          </View>
      </KeyboardAwareScrollView>
      <BottomSheetScroll 
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
              <Text style={styles.headerText}>{item.headerText}</Text>
              {
                item.paragraphs.map((paragraph, index) => (
                  <View key={`paragraph-${index}`}>
                    <Text style={styles.paragraph}>{paragraph.content}</Text>
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
                              color={app_c.HEX.fourth}
                            />
                            <Text style={styles.childContent}>{child}</Text>
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
}

export default SignupScreen