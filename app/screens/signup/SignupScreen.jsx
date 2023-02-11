import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import Modal from "react-native-modal"

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
import Icon from 'react-native-vector-icons/FontAwesome'

import Octicons from 'react-native-vector-icons/Octicons'


import ButtonText from 'components/button_text/ButtonText'
import CheckBoxText from 'components/checkbox_text/CheckBoxText'
import Input from 'components/input/Input'

import DateTimePicker from '@react-native-community/datetimepicker'
import { BIRTHDAY_RULE, BIRTHDAY_RULE_MESSAGE, EMAIL_RULE, FIELD_MIN_LENGTH_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from 'utilities/validators'
import { updateCurrentUser } from 'redux/user/UserSlice'

import { signInUserAPI, signUpUserAPI } from 'request_api'
import { styles } from './SignupScreenStyles'
import { app_c } from 'globals/styles'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import BottomSheetDefault from 'components/bottom_sheet/BottomSheetScroll'
import { Button } from 'react-native'
import moment from 'moment'
import { updateNotif } from 'redux/manifold/ManifoldSlice'
import BottomSheetScroll from 'components/bottom_sheet/BottomSheetScroll'
import { termsConditions } from 'utilities/termsConditions'


const SignupScreen = () => {

  // Phuong: https://github.com/Cnilton/react-native-floating-label-input
  // Phuong: https://react-hook-form.com/get-started#ReactNative
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [isChecked, setIsChecked] = useState(null)
  const [show, setShow] = useState(false)
  const [timestamp, setTimestamp] = useState(null)
  const [dateTime, setDateTime] = useState(new Date())


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
    if (!isChecked)
      dispatch(updateNotif({
        appearNotificationBottomSheet: true,
        contentNotificationBottomSheet: 'You should agree with Terms and Conditions'
      }))
    else {
      const userSignUp = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: timestamp,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword
      }
      // Phuong: call Api
      signUpUserAPI(userSignUp).then((res) => {
        if (res) {
          console.log("🚀 ~ file: SignupScreen.js:80 ~ signUpUserAPI ~ res", res)
          // Phuong: move to SigninScreen screen
          navigation.replace('SigninScreen')
        }
      })
    }
  }

  const handleDateChange = (e, date) => {
    console.log("🚀 ~ file: SignupScreen.js:88 ~ handleDateChange ~ date", date)
    console.log("🚀 ~ file: SignupScreen.js:88 ~ handleDateChange ~ e", e)
    setTimestamp(e.timeStamp)
    setDateTime(date)
  }

  return (
    <>
      <ScrollView
        style={{backgroundColor: app_c.HEX.primary, flex: 1}}
      >
        <KeyboardAwareScrollView
          extraScrollHeight={40}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.content}>
              <Text style={styles.textHeader}>Sign up</Text>

              <Text style={[styles.smallLabel,{ marginTop: 0}]}>Introduce yourself</Text>

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: FIELD_REQUIRED_MESSAGE
                  },
                }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='Email'
                    hint='Enter your email...'
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
                        message: FIELD_REQUIRED_MESSAGE
                      },
                      minLength: {
                        value: 2,
                        message: "This field must be at least 2 characters"
                      }
                    }}
                    name="firstName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label='First name'
                        hint='Enter your first name...'
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
                        message: FIELD_REQUIRED_MESSAGE
                      },
                      minLength: {
                        value: 2,
                        message: "This field must be at least 2 characters"
                      }
                    }}
                    name="lastName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label='Last name'
                        hint='Enter your last name...'
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
                    message: FIELD_REQUIRED_MESSAGE
                  },
                  pattern: {
                    value: BIRTHDAY_RULE,
                    message: BIRTHDAY_RULE_MESSAGE
                  },
                }}
                name="birthday"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='Birthday'
                    hint='dd/mm/yyyy'
                    isPassword={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.birthday}
                    rightComponent={
                      <TouchableOpacity
                        onPress={() => setShow(true)}
                      >
                        <Icon 
                          name='calendar' 
                          size={16} 
                          color={'#808080'}
                          style={{padding: 5}}
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />
              {errors.birthday && <Text style={styles.textError}>{errors.birthday?.message}</Text>}

              <Text style={styles.smallLabel}>Fill your identity information</Text>
                
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: FIELD_REQUIRED_MESSAGE
                  },
                  minLength: {
                    value: 8,
                    message: FIELD_MIN_LENGTH_MESSAGE
                  }
                }}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label='Username'
                    hint='Enter your username...'
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
                    label='Confirm password'
                    hint='Enter your confirm password...'
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
                <Text style={styles.textRead}>Read our</Text>
                <TouchableOpacity
                  onPress={() => setOpenTermCondition(true)}
                >
                  <Text style={styles.textTerms}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>

                {
                  isChecked &&
                  <View style={styles.containerReFor}>
                    <CheckBoxText
                      label='I agree with Terms & Conditions'
                      onPress={() => setIsChecked(!isChecked)}
                      isChecked={isChecked}
                    />
                  </View>
                }

                <ButtonText
                  label='Sign Up'
                  onPress={handleSubmit(onSubmit)}
                />
                
              </View>
              
                <View style={styles.containerSignup}>
                  <Text style={styles.labelNoAccount}>Already have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.pop()}
                  >
                    <Text style={styles.labelSignup}>Sign in</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        </ScrollView>
        <BottomSheetScroll 
          openTermCondition={openTermCondition} 
          closeTermCondition={() => {
            setIsChecked(true)
            setOpenTermCondition(false)
          }}
          labelBtn='I Agree'
          snapPoints={['25%', '50%', '100%']}
          childView={
            termsConditions.map((item) => (
              <>
                <Text key={item.id} style={styles.headerText}>{item.headerText}</Text>
                {
                  item.paragraphs.map((paragraph, index) => (
                    <>
                      <Text key={index} style={styles.paragraph}>{paragraph.content}</Text>
                      {
                        paragraph.childContent &&
                        paragraph.childContent.map((child, index) => (
                          <>
                            <View
                              style={styles.childContentContainer}
                              key={index}
                            >
                              <Octicons 
                                name='dot-fill' 
                                size={14} 
                                color={app_c.HEX.fourth}
                              />
                              <Text style={styles.childContent}>{child}</Text>
                            </View>
                          </>
                        ))
                      }
                    </>
                  ))
                }
              </>
            ))
          }
        />
        <Modal 
          isVisible={show}
          backdropColor={app_c.HEX.primary}
          backdropOpacity={0.9}
        >
          <View style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
            <RNDateTimePicker 
              value={dateTime}
              display="spinner"
              onChange={(e, date) => handleDateChange(e, date)}
              textColor={app_c.HEX.fourth}
            />
            <ButtonText
              label='OK'
              onPress={() => {
                setShow(false)
                setValue('birthday',  moment(dateTime).format('DD/MM/YYYY'))
              }}
            />
          </View>
        </Modal>
    </>
  )
}

export default SignupScreen