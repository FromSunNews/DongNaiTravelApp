import { View, Text, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './ChatBotScreenStyles'
import { useSelector } from 'react-redux'
import { selectCurrentLanguage } from '../../redux/language/LanguageSlice'
import useTheme from 'customHooks/useTheme'
import { getTextChatBotAPI } from 'request_api'
import { selectCurrentUser } from 'redux/user/UserSlice'
import { selectTemporaryUserId } from 'redux/user/UserSlice'
import { GiftedChat, Bubble } from 'libs/react-native-gifted-chat/lib'
import { app_c } from 'globals/styles'
import { selectCurrentMap } from 'redux/map/mapSlice'

const botAvatar = require('../../assets/images/avatar_chatbot.jpg')

const ChatBotScreen = () => {

  const currentUserId = useSelector(selectCurrentUser)._id
  const temporaryUserId = useSelector(selectTemporaryUserId)
  const userLocation = useSelector(selectCurrentMap).userLocation 
  //language
  const langCode = useSelector(selectCurrentLanguage).languageCode
  console.log("🚀 ~ file: ChatBotScreen.jsx:20 ~ ChatBotScreen ~ langCode:", langCode)
  const langData = useSelector(selectCurrentLanguage).data?.settingAbout
  //theme
  const themeColor = useTheme();
  
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    getTextChatBotAPI({
      question: 'Hi',
      currentUserId: currentUserId ?? temporaryUserId,
      languageCode: langCode,
      coor: userLocation ?? {}
    }).then(data => {
      handleDialogflowResponse(data)
    })
  }, [])
  
  const handleDialogflowResponse = (data) => {
    // data?.response, data.action, data.weatherData
    let msg
    const action = data.action
    if (action === 'input.welcome') {
      msg = {
        _id: messages.length + 1,
        text: data.response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'TravelBot',
          avatar: botAvatar
        },
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: 'Gợi ý du lịch',
              value: 'suggest',
              bdColor: '#E76161',
              bgColor: '#E76161'
            },
            {
              title: 'Thời tiết',
              value: 'weather',
              bdColor: '#146C94',
              bgColor: '#146C94'
            },
            {
              title: 'Bản đồ',
              value: 'map',
              bdColor: '#617A55',
              bgColor: '#617A55'
            },
          ],
          isUpperCase: true,
          action: action
        }
      }
    } else if (action === 'input.suggest-place' || action === 'input.get-weather') {
      msg = {
        _id: messages.length + 1,
        text: data.response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'TravelBot',
          avatar: botAvatar
        },
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          action: action,
          data: data.data
        }
      }
    } else {
      msg = {
        _id: messages.length + 1,
        text: data.response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'TravelBot',
          avatar: botAvatar
        }
      }
    }
    
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
  }

  const handLeSendMessages = (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    let message = messages[0].text

    getTextChatBotAPI({
      question: message,
      currentUserId: currentUserId ?? temporaryUserId,
      languageCode: langCode,
      coor: userLocation ?? null
    }).then(data => {
      // console.log("🚀 ~ file: ChatBotScreen.jsx:123 ~ handLeSendMessages ~ data:", data)
      handleDialogflowResponse(data)
    })
  }
  
  const handleQuicklyReply = (quickReply = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, quickReply))

    let message = quickReply[0].value

    getTextChatBotAPI({
      question: message,
      currentUserId: currentUserId ?? temporaryUserId,
      languageCode: langCode,
      coor: userLocation ?? null
    }).then(data => {
      console.log("🚀 ~ file: ChatBotScreen.jsx:138 ~ handleQuicklyReply ~ data:", data)
      handleDialogflowResponse(data)
    })
  }

  const renderBubble = (props) => {
    return (
      <Bubble 
        {...props}
        // màu text
        textStyle={{
          right: {color: app_c.HEX.primary},
          left: {color: app_c.HEX.fourth}
        }}
        // màu bubble
        wrapperStyle={{
          right: {backgroundColor: app_c.HEX.third},
          left: {backgroundColor: app_c.HEX.ext_primary},
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat 
        messages={messages}
        onSend={(value) => handLeSendMessages(value)}
        onQuickReply={(quickReply) => handleQuicklyReply(quickReply)}
        renderBubble={renderBubble}
        user={{_id: 1}}
      />
    </SafeAreaView>
  )
}

export default ChatBotScreen