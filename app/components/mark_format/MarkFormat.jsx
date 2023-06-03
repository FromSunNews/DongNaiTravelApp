import { View, Text } from 'react-native'
import React from 'react'

import { ReactNativeTextGeneratorProto } from 'libs/mark-format/react-native'
import { configStyleOfFTTS } from 'libs/mark-format/react-native/config/toReactNative.config'

import { app_c, app_sp, app_typo } from 'globals/styles'
import useTheme from 'customHooks/useTheme'



const customStyles = {
  "BOLD": {
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    color: useTheme.fourth
  },
  "ITALIC": {
    fontFamily: "Roboto-Italic",
    fontStyle: "italic",
    color: useTheme.fourth
  },
  "BOLD&ITALIC": {
    fontFamily: "Roboto-BoldItalic",
    color: useTheme.fourth
  },
  "LIGHT&ITALIC": {
    fontFamily: "Roboto-LightItalic",
    color: useTheme.fourth
  },
  "HEADING_0": { ...app_typo.fonts.normal.normal.h0, color: useTheme.fourth },
  "HEADING_1": { ...app_typo.fonts.normal.normal.h1, color: useTheme.fourth },
  "HEADING_2": { ...app_typo.fonts.normal.normal.h2, color: useTheme.fourth },
  "HEADING_3": { ...app_typo.fonts.normal.normal.h3, color: useTheme.fourth },
  "HEADING_4": { ...app_typo.fonts.normal.normal.h4, color: useTheme.fourth },
  "HEADING_5": { ...app_typo.fonts.normal.normal.h5, color: useTheme.fourth },
  "SUB_0": { ...app_typo.fonts.normal.normal.sub0, color: useTheme.fourth },
  "SUB_1": { ...app_typo.fonts.normal.normal.sub1, color: useTheme.fourth },
}

configStyleOfFTTS(customStyles);

/**
 * @typedef MarkFormatProps
 * @property {string} text Đoạn văn bản bình thường.
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Component này dùng để hiển thị định dạng cho một văn bản.
 * @param {MarkFormatProps} props Props của component.
 * @returns 
 */
const MarkFormat = ({
  text
}) => {
  let generator = React.useMemo(() => ReactNativeTextGeneratorProto.clone() ,[text]);
  let mfWTextNTextArr = React.useMemo(() => generator.decomposeMF(text), [text]);
  let content = React.useMemo(() => { 
    generator.createTree(mfWTextNTextArr);
    console.log("HELLO");
    return generator.renderer.render(generator.mfTree);
  }, [mfWTextNTextArr]);

  return content;
}

export default MarkFormat