import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './OnboardingChatbotStyle'
import { ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateStatusBar } from 'redux/manifold/ManifoldSlice'

const OnboardingChatbot = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <ImageBackground 
      source={require('../../assets/images/explore2.jpg')} 
      style={styles.aboardingContainer}
      resizeMode='cover'
    >
      <View style={styles.modalContainer}>
        <Text style={styles.nameBot}>TravelBot</Text>
        <Image source={require('../../assets/images/avatar_chatbot.jpg')} style={styles.avatarImg}/>
        <Text style={styles.textIntroduce}>Giúp bạn dễ dàng lên kế hoạch, tư vấn thời tiết, địa điểm, hãng du lịch, chỗ ở, lời khuyên và hơn thế nữa!</Text>
        <TouchableOpacity
          style={styles.btnAction}
          onPress={() => {
            dispatch(updateStatusBar(false))
            navigation.replace('ChatBotScreen')}
          }
        >
          <Text style={styles.textBtnAction}>Trải nghiệm ngay</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default OnboardingChatbot