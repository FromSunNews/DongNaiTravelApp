import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import Icon from 'react-native-vector-icons/FontAwesome'

import { styles } from './InputAutoCompleteStyles'
import { app_c } from 'globals/styles'
import { useSelector } from 'react-redux'
import { selectCurrentManifold } from 'redux/manifold/ManifoldSlice'

const InputAutoComplete = ({ onPlaceSelected, map_api_key }) => {

  return (
    <GooglePlacesAutocomplete
      styles={{
        textInput: styles.textSearch,
        textInputContainer: styles.textContainer,
        row: styles.row,
        poweredContainer: styles.poweredContainer
      }}
      renderLeftButton={() => (
        <Icon
          name="search"
          size={18}
          color={app_c.HEX.fourth}
          style={styles.iconSearch}
        />
      )}
      placeholder="Where do you want to go?"
      fetchDetails
      onPress={(data, details) => {
        onPlaceSelected(details)
      }}
      query={{
        key: map_api_key,
        language: 'vi',
      }}
    />
  )
}

export default InputAutoComplete