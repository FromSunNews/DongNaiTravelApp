import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'


import { styles } from './BlogsScreenStyles'
import axios from 'axios'

const BlogsScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState(null)

  async function generateSpeech(text) {
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyDNNqy2X_eXqB8oIuLjV29L7VpvRHmL-X0`,
      {
        input: {
          text: text
        },
        voice: {
          languageCode: 'vi-VN',
          name: 'vi-VN-Standard-A'
        },
        audioConfig: {
          audioEncoding: 'mp3'
        }
      }
    )
    // console.log('response.data.audioContent', response.data.audioContent)
    return response.data.audioContent
  }

  async function playAudio(text) {
    try {
      // const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
      // if (status !== 'granted') {
      //   console.log('Permission not granted!')
      //   return
      // }

      const fileUri = `${FileSystem.documentDirectory}/tts_Audio.mp3`
      
      console.log("🚀 ~ file: BlogsScreen.jsx:45 ~ playAudio ~ fileUri:", fileUri)
      if (!isPlaying) {
        const content = await generateSpeech(text)

        await FileSystem.writeAsStringAsync(fileUri, content, {
          encoding: FileSystem.EncodingType.Base64
        })

        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        console.log(`File size: ${fileInfo.size}`);
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound } = await Audio.Sound.createAsync(
          { uri: fileUri },
          { shouldPlay: true }
        )
        console.log("🚀 ~ file: BlogsScreen.jsx:61 ~ playAudio ~ sound:", sound)
        await sound.playAsync();
        setSound(sound)
        setIsPlaying(true)
      } else {
        await sound.pauseAsync()
        setIsPlaying(false)
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  async function stopAudio() {
    if (isPlaying) {
      await sound.stopAsync()
      setIsPlaying(false)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => playAudio('Trong 4 giờ tranh luận tại vụ án 7 cựu cán bộ BIDV cho vay sai 360 tỷ đồng, đại diện ngân hàng này và bên vay không thống nhất được ai phải bồi thường thiệt hại cho nhà nước Ngày 15/3, trong phần luận tội, VKSND Hà Nội đề nghị HĐXX tuyên 7 cựu cán bộ BIDV phạm tội Vi phạm quy định về cho vay trong hoạt động của các tổ chức tín dụng, mức án từ 30 tháng tù treo đến 9 năm tù. Người bị đề nghị hình phạt co nhất là ông Đỗ Quốc Hùng, cựu giám đốc BIDV Thành Đô.Ông Hùng cùng 6 đồng nghiệp bị cáo buộc cho Kenmark, doanh nghiệp 100% vốn nước ngoài vay sai 39 triệu USD, khi doanh nghiệp không đù các điều kiện. Kenmark sau đó dừng hoạt động, tài sản bị BIDV bán đấu giá song không đủ bù nợ, còn 360 tỷ đồng, được tính là thiệt hại vụ án. Hiện Kenmark còn dư nợ không thu hồi 178 tỷ đồng.')}>
        <Text style={styles.text}> Play Audio </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => stopAudio()}>
        <Text style={styles.text}> Stop Audio </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BlogsScreen