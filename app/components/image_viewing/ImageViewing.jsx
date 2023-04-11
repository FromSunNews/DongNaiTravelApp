import { View, Text,TouchableOpacity} from 'react-native'
import React from 'react'
import ImageView from 'react-native-image-view'
import { useState } from 'react'


const ImageViewing = ({imagePath}) => {
  const [visible,setVisible]=useState(false)

  return (
    <TouchableOpacity>
      <ImageView
        images={{uri: imagePath}}
        imageIndex={0}
        isVisible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </TouchableOpacity>
  )
}

export default ImageViewing