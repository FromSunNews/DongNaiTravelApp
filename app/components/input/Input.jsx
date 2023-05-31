import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { FloatingLabelInput } from 'react-native-floating-label-input'


import { app_c } from 'globals/styles'
import { styles } from './InputStyles'

const Input = ({ label, hint, isPassword, onChange, onBlur, value, error, containerStyle, rightComponent}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <FloatingLabelInput
      label={label}
      hint={hint}
      isPassword={isPassword}
      isFocused={isFocused}
      onBlur={() => {
        setIsFocused(false)
        onBlur()
      }}
      onFocus={() => {
        setIsFocused(true)
      }}
      labelStyles={styles.label}
      customLabelStyles={{
        topFocused: -25,
        fontSizeFocused: 12,
        leftBlurred: -2,
        colorBlurred: error ? '#F32424' : (isFocused ? app_c.HEX.fourth : app_c.HEX.ext_third),
        colorFocused: error ? '#F32424' : (isFocused ? app_c.HEX.fourth : app_c.HEX.ext_third)
      }}
      containerStyles={[styles.container, {
        borderColor: error ? '#F32424' : (isFocused ? app_c.HEX.fourth : app_c.HEX.ext_third),
        borderWidth: isFocused ? 1.5 : 1,
        ...containerStyle
      }]}
      inputStyles={styles.input}
      togglePassword={false}
      value={value}
      onChangeText={onChange}
      customShowPasswordComponent= {
        <Icon 
          name='eye-slash' 
          size={16} 
          color={isFocused ? app_c.HEX.fourth : app_c.HEX.ext_third}
          style={styles.icon}
        />
      }
      customHidePasswordComponent= {
        <Icon 
          name='eye' 
          size={16} 
          color={isFocused ? app_c.HEX.fourth : app_c.HEX.ext_third}
          style={styles.icon}
        />
      }
      rightComponent={rightComponent}
    />
  )
}

export default Input