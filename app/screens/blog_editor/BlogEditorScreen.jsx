import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { deltaToMarkdown } from 'quill-delta-to-markdown';

import {
  AppText,
  RectangleButton
} from 'components'

import {
  editorHtmlSource,
  injectedJS
} from './html/text_editor.js'

import {
app_c
} from 'globals/styles'

const BlogEditorScreen = () => {
  const webViewRef = React.useRef(null);

  const handleWebViewMessage = e => {
    let message = e.nativeEvent.data;
    if(message === "IMG_ADDED") {
      console.log("MESSAGE: ", message);
      return;
    }
    let delta = JSON.parse(message);
    let markdown = deltaToMarkdown(delta['ops']);
    console.log('Markdown: ', markdown);
    console.log('Quill content:', delta['ops']);
  }

  const receiveContent = () => {
    if(webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.ReactNativeWebView.postMessage(JSON.stringify(editor.getContents()));
      `);
    }
  }

  let extendInjectedJS = injectedJS + `
    document.getElementById('editor').addEventListener('DOMNodeInserted', function(e) {
      if(e.target.tagName === 'IMG') {
        window.ReactNativeWebView.postMessage("IMG_ADDED");
        document.activeElement && document.activeElement.blur()
      }
    });
  `;

  return (
    <View style={[styles.container, {backgroundColor: app_c.HEX.primary}]}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={{flex: 1}}
        style={{flexGrow: 1}}
      >
        <WebView
          ref={webViewRef}
          style={{ resizeMode: 'cover', flex: 1, backgroundColor: 'transparent' }}
          injectedJavaScript={extendInjectedJS}
          source={{html: editorHtmlSource}}
          onMessage={handleWebViewMessage}
          scrollEnabled={false}
          keyboardDisplayRequiresUserAction={false}
        />
      </KeyboardAwareScrollView>
      <RectangleButton
        typeOfButton='highlight'
        overrideShape='capsule'
        onPress={receiveContent}
        style={styles.save_btn}
      >
        <AppText>Save</AppText>
      </RectangleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  save_btn: {
    position: 'absolute',
    bottom: 18,
    right: 18
  }
});

export default BlogEditorScreen