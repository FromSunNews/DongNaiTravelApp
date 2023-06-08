import { View, Text, ViewProps } from 'react-native'
import React from 'react'

import {
  useSelector
} from 'react-redux'

import {
  useAudio
} from 'customHooks/useAudio'

import {
  selectCurrentLanguage
} from 'redux/language/LanguageSlice'

import ComponentUtility from 'utilities/component'

import Ionicons from 'react-native-vector-icons/Ionicons'

import AppText from 'components/app_text/AppText'
import RectangleButton from 'components/buttons/RectangleButton'

import {
  app_sp
} from 'globals/styles'

import {
  PlaceDataProps
} from 'types/index.d.ts'

/**
 * @typedef SpeechProps
 * @property {any} content
 */

/**
 * Component này dùng để phát file mp3 cho các mô tả của place hoặc là content của blog.
 * Đương nhiêu là nó chỉ sử dụng trong Place hoặc blog rồi. Tuy nhiên thì nếu cần trong tương
 * lai component này có thể cho phép custom bên ngoài luôn.
 * @param {ViewProps & SpeechProps} props
 * @returns 
 */
const Speech = ({
  content,
  ...props
}) => {
  const [voice, setVoice] = React.useState(false);

  const langCode = useSelector(selectCurrentLanguage).languageCode
  // const langData = useSelector(selectCurrentLanguage).data?.placeDetailScreen
  const { playAudioAsync, stopAudioAsync, prepareMP3Async, canPlay } = useAudio();

  const speechMP3Url = content ? content : "";

  React.useEffect(() => {
    if(Boolean(speechMP3Url)) {
      let audioVoicePrefix = langCode === "vi" ? "VN" : langCode.toUpperCase();
      let url = voice ? speechMP3Url[`${audioVoicePrefix}_MALE_1`] : speechMP3Url[`${audioVoicePrefix}_FEMALE_1`];
      prepareMP3Async(url);
    }
  }, [speechMP3Url, voice])

  return (
    <View
      {...props}
      style={[{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, props.style]}
    >
      <View>
        <AppText font="h3" style={app_sp.mb_6}>Đọc/Dừng</AppText>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <RectangleButton
            disabled={!canPlay}
            typeOfButton='opacity'
            onPress={playAudioAsync}
            defaultColor='type_4'
            style={[app_sp.me_6]}
            overrideShape='capsule'
          >
            {
              (isActive, currentLabelStyle) => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons style={currentLabelStyle} name="play-outline" />
                  <AppText style={currentLabelStyle}> / </AppText>
                  <Ionicons style={currentLabelStyle} name="pause-outline" />
                </View>
              )
            }
          </RectangleButton>
          <RectangleButton
            disabled={!canPlay}
            typeOfButton='opacity'
            onPress={stopAudioAsync}
            overrideShape='capsule'
          >
            {
              (isActive, currentLabelStyle) => (
                <Ionicons style={currentLabelStyle} name="stop-outline" />
              )
            }
          </RectangleButton>
        </View>
      </View>

      <View>
        <AppText font="h3" style={app_sp.mb_6}>Giọng Đọc</AppText>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <RectangleButton
            isActive={!voice}
            disabled={!canPlay}
            typeOfButton='opacity'
            onPress={() => setVoice(false)}
            style={[app_sp.me_6]}
            overrideShape='capsule'
          >
            {
              (isActive, currentLabelStyle) => <AppText style={currentLabelStyle}>Female</AppText>
            }
          </RectangleButton>
          <RectangleButton
            isActive={voice}
            disabled={!canPlay}
            typeOfButton='opacity'
            onPress={() => setVoice(true)}
            overrideShape='capsule'
          >
            {
              (isActive, currentLabelStyle) => <AppText style={currentLabelStyle}>Male</AppText>
            }
          </RectangleButton>
        </View>
      </View>
    </View>
  )
}

export default Speech