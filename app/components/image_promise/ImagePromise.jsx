import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import StarRating from 'components/star_rating/StarRating'
import axios from 'axios'
import { Buffer } from 'buffer'
import { Linking } from 'react-native'
import { styles } from './ImagePromiseStyles'
import moment from 'moment/moment'
import 'moment/locale/vi'  // without this line it didn't work
moment.locale('vi')

const ImagePromise = ({ photoReference, styleImage, map_api_key}) => {
  
  const [urlBase64, setUrlBase64] = useState(null)
  
  useEffect(() => {
    getUrlBase64()
  }, [photoReference])
  
  const getUrlBase64 = async () => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${map_api_key}`, {responseType: 'arraybuffer'})
    const urlBase64 = Buffer.from(res.data, 'binary').toString('base64')
    
    setUrlBase64(urlBase64)
  }
  if (urlBase64)
    return (
      <Image
        source={{uri: `data:image/jpeg;base64,${urlBase64}`}}
        style={styleImage}
        resizeMode="cover"
      />
    )
}

export default ImagePromise