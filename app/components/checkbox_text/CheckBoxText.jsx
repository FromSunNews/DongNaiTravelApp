import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { app_c } from 'globals/styles'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import { styles } from './CheckBoxTextStyles'
import { Platform } from 'react-native'

const CheckBoxText = ({ label, onPress, isChecked}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.checkbox}>
        <AnimatedCheckbox
          checked={isChecked}
          highlightColor={isChecked ? app_c.HEX.fourth : app_c.HEX.primary}
          checkmarkColor={Platform.OS === 'ios' ? '#ffffff' : 'transparent'}
          boxOutlineColor={isChecked ? app_c.HEX.fourth : '#808080'}
        />
      </View>
      <Text style={[styles.label, {
        color: isChecked ? app_c.HEX.fourth : '#808080'
      }]}>{label}</Text>
    </Pressable>
  )
}

export default CheckBoxText