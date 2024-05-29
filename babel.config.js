module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      [
        'module:react-native-dotenv',
        {
          envName: 'env',
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
