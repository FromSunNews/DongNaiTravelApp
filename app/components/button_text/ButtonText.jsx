import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { styles } from './ButtonTextStyles'

const ButtonText = ({ label, onPress}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default ButtonText