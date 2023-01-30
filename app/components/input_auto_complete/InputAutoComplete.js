import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MAP_API_KEY } from 'utils/constants'

import Icon from 'react-native-vector-icons/FontAwesome'

import { InputAutoCompleteStyles } from './InputAutoCompleteStyles'

const InputAutoComplete = ({ onPlaceSelected }) => {
  return (
    <GooglePlacesAutocomplete
      styles={{
        textInput: InputAutoCompleteStyles.textSearch,
        textInputContainer: InputAutoCompleteStyles.textContainer
      }}
      renderLeftButton={() => (
        <Icon
          name="search"
          size={18}
          color="#112D4E"
          style={InputAutoCompleteStyles.iconSearch}
        />
      )}
      placeholder="Where do you want to go?"
      fetchDetails
      onPress={(data, details) => {
        onPlaceSelected(details)
      }}
      query={{
        key: MAP_API_KEY,
        language: 'vi',
      }}
    />
  )
}

export default InputAutoComplete