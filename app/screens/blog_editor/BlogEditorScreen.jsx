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
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

import { Buffer } from 'buffer';
import { deltaToMarkdown } from 'quill-delta-to-markdown';

import AsyncStorageUtility from 'utilities/asyncStorage.js';

import {
  AppText,
  RectangleButton,
  AppHeader
} from 'components'

import {
  editorHtmlSource,
  injectedJS
} from './html/text_editor.js'

import {
app_c
} from 'globals/styles'

const BlogEditorScreen = (props) => {
  const [blogContent, setBlogContent] = React.useState();

  const webViewRef = React.useRef(null);
  const textInputRef = React.useRef(null);

  const handleWebViewMessage = e => {
    let message = e.nativeEvent.data;
    if(message === "IMG_ADDED") {
      console.log("MESSAGE: ", message);
      textInputRef.current.focus();
      Keyboard.dismiss();
      return;
    }
    let delta = JSON.parse(message);
    let markdown = deltaToMarkdown(delta['ops']);
    console.log('Markdown: ', markdown);
    console.log('Quill content:', delta['ops']);
    setBlogContent(markdown);
  }

  // Hàm này dùng để ấn next để người dùng sang screen khác để chuẩn bị publish cho blog.
  const handleGetQuillContentPress = () => {
    if(webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.ReactNativeWebView.postMessage(JSON.stringify(editor.getContents()));
      `);
    }
  }

  const handleSaveBlogContentPress = () => {
    AsyncStorageUtility.setItemAsync("SAVED_BLOG_CONTENT_KEY", blogContent)
  }

  let extendInjectedJS = injectedJS + `
    document.getElementById('editor').addEventListener('DOMNodeInserted', function(e) {
      if(e.target.tagName === 'IMG') {
        window.ReactNativeWebView.postMessage("IMG_ADDED");
        document.activeElement && document.activeElement.blur();
      }
    });
  `;

  React.useEffect(() => {
    AsyncStorageUtility
    .getItemAsync("SAVED_BLOG_CONTENT_KEY")
    .then(data => {
      if(data) {
        console.log("Load Quill Content ~ BlogEditorScreen.jsx");
        setBlogContent(data);
        let delta;
        webViewRef.current.injectJavaScript(`
          editor.setContents(${delta})
        `);
      }
    })
  }, []);

  return React.useMemo(() => (
    <>
      <AppHeader
        {...props}
        options={{
          canBack: true,
          title: "Create blog",
        }}
        setRightPart={() => (
          <AppText onPress={() => { props.navigation.navigate("PrepareBlogPushlishScreen") }}>Next</AppText>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <WebView
          ref={webViewRef}
          style={{ flex: 1, backgroundColor: "transparent" }}
          injectedJavaScript={extendInjectedJS}
          source={{html: editorHtmlSource({
            editorToolsBarBackgroundColor: app_c.HEX.primary
          })}}
          onMessage={handleWebViewMessage}
        />
        <TextInput ref={textInputRef} style={{width: 0, height: 0}} />
      </KeyboardAvoidingView>
      <RectangleButton
        typeOfButton='highlight'
        overrideShape='capsule'
        defaultColor='type_3'
        onPress={handleSaveBlogContentPress}
        style={styles.save_btn}
      >
        <AppText>Save</AppText>
      </RectangleButton>
    </>
  ), [app_c.HEX, blogContent]);
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