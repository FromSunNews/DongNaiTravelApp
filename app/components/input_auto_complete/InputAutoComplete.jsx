import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { styles } from './InputAutoCompleteStyles'
import { app_c } from 'globals/styles'
import { useSelector } from 'react-redux'
import { selectCurrentManifold } from 'redux/manifold/ManifoldSlice'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'

const InputAutoComplete = ({ onPlaceSelected, map_api_key, isFocusedInput, handleFocus, inputRef, handleGetAddressText, isShowBackIcon = false, handlePressBackIcon }) => {

  return (
    <>
      <GooglePlacesAutocomplete
        ref={inputRef}
        placeholder='Where do you want to go?'
        minLength={2} // minimum length of text to search
        // currentLocation={true}
        // currentLocationLabel="Current location"
        returnKeyType={'search'}
        keyboardAppearance={'light'}
        styles={{
          textInput: styles.textSearch,
          textInputContainer: styles.textContainer,
          row: styles.row,
          poweredContainer: styles.poweredContainer,
        }}
        renderLeftButton={() => {
          if (!isShowBackIcon) {
            return (
              <TouchableOpacity
                onPress={() => handleGetAddressText(inputRef.current?.getAddressText())}
              >
                <FontAwesome
                  name="search"
                  size={18}
                  color={app_c.HEX.fourth}
                  style={styles.iconSearch}
                />
              </TouchableOpacity>
            )
          } else {
            return (
              <TouchableOpacity
                onPress={() => handlePressBackIcon()}
              >
                <MaterialIcons
                  name="arrow-back-ios"
                  size={25}
                  color={app_c.HEX.fourth}
                  style={styles.iconBack}
                />
              </TouchableOpacity>
            )
          }
        }}
        query={{
          key: map_api_key,
          language: 'vi',
        }}
        fetchDetails={true}
        debounce={200}
        onPress={(data, details) => {
          console.log("🚀 ~ file: InputAutoComplete.jsx:47 ~ InputAutoComplete ~ data", data)
          console.log("🚀 ~ file: InputAutoComplete.jsx:38 ~ InputAutoComplete ~ details", details)
          onPlaceSelected(details)
        }}
      />
      {
        !isFocusedInput &&
        <Pressable
        style={styles.overlayBtn}
        onPress={() => {
          inputRef.current?.focus()
          handleFocus(true)
        }}
      />
      }
    </>
  )
}

export default InputAutoComplete