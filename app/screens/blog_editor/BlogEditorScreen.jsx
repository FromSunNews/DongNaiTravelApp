import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Alert
} from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

import { Buffer } from 'buffer';
import { deltaToMarkdown } from 'quill-delta-to-markdown';
import markdownToDelta from "markdown-to-quill-delta";
import { MarkdownToQuill } from "md-to-quill-delta";

import AsyncStorageUtility from 'utilities/asyncStorage.js';
import {
  callWithGlobalLoading
} from 'utilities/reduxStore.js'

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
app_c, app_sp
} from 'globals/styles'

const BlogEditorScreen = (props) => {
  const [blogInfo, setBlogInfo] = React.useState({
    content: null,
    isContentFromStorage: false,
    isWebviewLoaded: false
  });

  const webViewRef = React.useRef(null);
  const textInputRef = React.useRef(null);

  const mdToDeltaConverter = React.useMemo(() => new MarkdownToQuill({debug: false}));

  const handleWebViewMessage = e => {
    let message = JSON.parse(e.nativeEvent.data);
    if(message.type === "OVER_UPLOADED_IMG_SIZE") {
      Alert.alert(message.data);
      return;
    }
    if(message.type === "IMG_ADDED") {
      textInputRef.current.focus();
      Keyboard.dismiss();
      return;
    }

    let delta = message.data;
    let markdown = deltaToMarkdown(delta['ops']);
    setBlogInfo(prevState => ({
      ...prevState,
      content: markdown,
      isContentFromStorage: false
    }));
  }

  // Hàm này dùng để ấn next để người dùng sang screen khác để chuẩn bị publish cho blog.
  const handleGetQuillContentPress = () => {
    if(webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        globalMessage = {
          type: "COMPLETE_CONTENT_ADDED",
          data: editor.getContents()
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(globalMessage));
      `);
    }
  }

  const handleClearBlogContentInStorage = () => {
    AsyncStorageUtility.removeItemAsync("SAVED_BLOG_CONTENT_KEY")
    .then(result => {
      webViewRef.current.injectJavaScript(`
        editor.setContents({})
      `);
      setBlogInfo(prevState => ({
        ...prevState,
        content: null,
        isContentFromStorage: false
      }));
    })
  }

  let extendInjectedJS = injectedJS + `
    // document.getElementById('editor').addEventListener('DOMNodeInserted', function(e) {
    //   if(e.target.tagName === 'IMG') {
    //     let message = {
    //       type: "IMG_ADDED",
    //       data: undefined
    //     }
    //     window.ReactNativeWebView.postMessage(JSON.stringify(message));
    //     document.activeElement && document.activeElement.blur();
    //   }
    // });
  `;

  React.useEffect(() => {
    if(blogInfo.content && blogInfo.isContentFromStorage && blogInfo.isWebviewLoaded) {
      let reg = /\n(.+)/
      let delta = JSON.stringify(
        mdToDeltaConverter.convert(blogInfo.content)
      );
      webViewRef.current.injectJavaScript(`
        editor.setContents(${delta})
      `);
    }

    if(blogInfo.content && !blogInfo.isContentFromStorage) {
      callWithGlobalLoading(async () => {
        await AsyncStorageUtility.setItemAsync("SAVED_BLOG_CONTENT_KEY", blogInfo.content);
      })
    }

    if(!blogInfo.content && !blogInfo.isContentFromStorage) {
      AsyncStorageUtility
      .getItemAsync("SAVED_BLOG_CONTENT_KEY")
      .then(data => {
        if(data) {
          console.log("Load Quill Content ~ BlogEditorScreen.jsx");
          setBlogInfo(prevState => ({
            ...prevState,
            content: data,
            isContentFromStorage: true
          }));
        }
      })
    }
  }, [blogInfo]);

  return React.useMemo(() => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, position: "relative"}}
    >
      <AppHeader
        {...props}
        options={{
          canBack: true,
          title: "Create blog",
        }}
        setRightPart={() => (
          <AppText onPress={
            () => { 
              blogInfo.content && props.navigation.navigate("PrepareBlogPushlishScreen");
            }
          }>Next</AppText>
        )}
      />
      <WebView
        startInLoadingState
        ref={webViewRef}
        style={{ flex: 1, backgroundColor: "transparent" }}
        injectedJavaScript={extendInjectedJS}
        source={{html: editorHtmlSource({
          editorToolsBarBackgroundColor: app_c.HEX.primary
        })}}
        onMessage={handleWebViewMessage}
        onLoadEnd={() => setBlogInfo(prevState => ({
          ...prevState,
          isWebviewLoaded: true
        }))}
      />
      <TextInput ref={textInputRef} style={{width: 0, height: 0}} />
      <View style={styles.buttonsContainer}>
        <RectangleButton
          typeOfButton='highlight'
          overrideShape='capsule'
          defaultColor='type_4'
          onPress={handleGetQuillContentPress}
          style={app_sp.me_8}
        >
          {
            (isActive, currentLabelStyle) => <AppText style={currentLabelStyle}>Save</AppText>
          }
        </RectangleButton>

        <RectangleButton
          typeOfButton='highlight'
          overrideShape='capsule'
          defaultColor='type_3'
          onPress={handleClearBlogContentInStorage}
        >
          <AppText>Clear</AppText>
        </RectangleButton>
      </View>
    </KeyboardAvoidingView>
  ), [app_c.HEX, blogInfo]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  buttonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 18,
    right: 18
  }
});

export default BlogEditorScreen