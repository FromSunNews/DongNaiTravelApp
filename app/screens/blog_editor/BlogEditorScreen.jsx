import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

import {
  AppText
} from 'components'

import { editor_html_source } from './html/text_editor.js'

import {
app_c
} from 'globals/styles'

const BlogEditorScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        style={{ resizeMode: 'cover', flex: 1, backgroundColor: 'transparent' }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1.2, maximum-scale=1.5, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        source={{html: editor_html_source}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: app_c.HEX.primary
  }
});

export default BlogEditorScreen