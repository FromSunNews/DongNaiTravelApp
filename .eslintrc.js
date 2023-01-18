// Created by FromSunNews author on 18/01/2023
// Sample Eslint config for ReactNative project
module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'react-hooks',
    'react-native',
    'jsx-a11y',
    'import'
  ],
  parser: '@babel/eslint-parser',
  env: {
    jest: true,
    'react-native/react-native': true
  },
  rules: {
    'no-use-before-define': 'off',
    'no-unexpected-multiline': 'warn',
    quotes: ['error', 'single'],
    semi: [1, 'never'],
    'linebreak-style': 0,
    indent: ['warn', 2],
    'react-hooks/rules-of-hooks': 'error',
    'no-console': 1,
    'no-unused-vars': 1,
    'no-trailing-spaces': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': [1, 'always'],
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'comma-spacing': 1,
    'arrow-spacing': 1,
    'keyword-spacing': 1,
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react/style-prop-object': 0,
    'import/no-unresolved': 0
  },
  globals: {
    fetch: false
  }
}
