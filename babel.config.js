// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Phuong: config for absolute paths
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./app']
        }
      ],

      // Phuong: https://docs.expo.dev/versions/latest/sdk/reanimated/
      // Phuong: for reanimated web support
      '@babel/plugin-proposal-export-namespace-from',
      // Phuong: for reanimated mobile devices
      // Phuong: Reanimated plugin has to be listed last.
      'react-native-reanimated/plugin'
    ]
  }
}
