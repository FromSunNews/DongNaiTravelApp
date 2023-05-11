import React from 'react'
import * as FileSystem from 'expo-file-system'
import { Audio } from 'expo-av'

import StringUtility from 'utilities/string';
import {
  FILE_URL_RULE
} from 'utilities/validators'

import {
  PlayAudioAsyncFn,
  StopAudioAsyncFn,
  PrepareTTSAsyncFn,
  PrepareMP3AsyncFn
} from 'types/index.d.ts'

/**
 * @typedef ControllerFunctions
 * @property {PlayAudioAsyncFn} playAudioAsync Hàm dùng để phát audio hoặc tạm dừng, nếu như sound vẫn chưa được load thì không thể phát được nhạc. Và hàm này dùng `isPlaying` để phát hoặc tạm dừng audio.
 * @property {StopAudioAsyncFn} stopAudioAsync Hàm dùng để dừng audio lại nếu như có đang phát và tua nó về từ đầu.
 * @property {PrepareTTSAsyncFn} prepareTTSAsync Hàm này dùng để chuẩn bị file mp3 từ base64. Với điều kiện là base64 phải được encode từ một file mp3 hoặc một file âm thanh nào đó.
 * @property {PrepareMP3AsyncFn} prepareMP3Async Hàm này dùng để chuẩn bị file mp3 bằng cách tải từ cloud. Input là url của file mp3 đó.
 */

/**
 * Hook này dùng để sử dụng Text to Speech. Trả về 3 hàm (có thể trong tương lai còn nhiều hơn) bao gồm
 * - `playAudioAsync`: dùng để play audio.
 * - `stopAudioAsync`: dùng để stop audio.
 * - `prepareTTSAsync`: dùng để chuẩn bị audio cho Text. Hàm này nhận `audioAsBase64` là một chuỗi base64
 * đã được encode từ một file mp3.
 * @param {string} fileName 
 * @returns {{canPlay: boolean} & ControllerFunctions}
 * @example
 * ...
 * // Function này sẽ có phát audio ở trong đó.
 * function ComponentA() {
 *   const {
 *     canPlay, playAudioAsync, stopAudioAsync, prepareTTSAsync
 *   } = useAudio
 * }
 * ...
 */
export function useAudio(fileName = "myspeech") {
  // Thông tin của sound bao gồm có instance để play audio và thông tin cho biết sound có thể được phát hay là không?
  const [soundInfo, setSoundInfo] = React.useState({
    sound: null,
    canPlay: false
  });
  const [fileUri, fullFileName] = React.useMemo(() => {
    let fullFileName = `tts_audio_${StringUtility.toSnakeCase(fileName)}.mp3`;
    return [`${FileSystem.documentDirectory}/${fullFileName}`, fullFileName]
  },
  [fileName]);

  /*
    Dùng React.useEffect để unload sound khi sound cũ thay đổi
    hoặc là unload sound khi component dùng hook này unmount.
  */
  React.useEffect(() => {
    return soundInfo.sound
    ? () => {
      console.log("Unload sound!");
      soundInfo.sound.unloadAsync();
    }
    : undefined
  }, [soundInfo.sound]);

  const createSound = React.useCallback(async (fileUri) => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    });
    const { sound } = await Audio.Sound.createAsync(
      { uri: fileUri }
    )
    return sound;
  }, [])

  // Các hàm dùng để play, stop và prepare.
  // Các hàm này đều dùng một biến để kiểm tra xem âm thanh có đang được phát hay không?
  /**
   * @type {ControllerFunctions}
   */
  const {
    playAudioAsync,
    stopAudioAsync,
    prepareTTSAsync,
    prepareMP3Async
  } = React.useCallback((function() {
    let isPlaying = false;
    return {
      playAudioAsync: async function() {
        try {
          if(!soundInfo.sound._loaded) throw new Error("Sound hasn't been created yet.");
          if(isPlaying) { await soundInfo.sound.pauseAsync(); isPlaying = false; return; }
          console.log("PAUSE AUDIO PLEASE");
          await soundInfo.sound.playAsync();
          isPlaying = true;
        } catch (error) {
          console.error(error.message);
        }
      },

      stopAudioAsync: async function() {
        try {
          if(!soundInfo.sound._loaded) throw new Error("Sound hasn't been created yet.");
          if(isPlaying) {
            await soundInfo.sound.stopAsync();
            isPlaying = false;
            return;
          }
        } catch (error) {
          console.error(error.message);
        }
      },

      prepareTTSAsync: async function(audioAsBase64) {
        try {
          if(!Boolean(audioAsBase64)) throw new Error("Audio as base64 is not valid.");
          setSoundInfo(prevState => {
            if(prevState.canPlay) return ({...prevState, canPlay: false})
            return prevState;
          })
          await FileSystem.writeAsStringAsync(fileUri, audioAsBase64, {
            encoding: FileSystem.EncodingType.Base64
          });
          let sound = await createSound(fileUri);
          setSoundInfo({sound: sound, canPlay: true});
          return true;
        } catch (error) {
          console.error(error.message)
          return false;
        }
      },

      prepareMP3Async: async function(url) {
        try {
          if(!FILE_URL_RULE.test(url)) throw new Error("This url does not direct to a file.");
          setSoundInfo(prevState => {
            if(prevState.canPlay) return ({...prevState, canPlay: false})
            return prevState;
          })
          await FileSystem.downloadAsync(url, fileUri);
          let sound = await createSound(fileUri);
          setSoundInfo({sound: sound, canPlay: true});
        } catch (error) {
          console.error(error.message)
          return false;
        }
      }
    }
  })(), [fileUri, soundInfo.sound])

  return {
    canPlay: soundInfo.canPlay,
    playAudioAsync,
    stopAudioAsync,
    prepareTTSAsync,
    prepareMP3Async
  }
}