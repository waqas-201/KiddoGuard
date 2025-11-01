module.exports = function (api) {
    api.cache(true);

    return {
        presets: [
            'babel-preset-expo', // Expo preset
            '@babel/preset-typescript', // TypeScript support
        ],
        plugins: [
            // Worklets plugin (required for react-native-worklets-core)
            ['react-native-worklets-core/plugin'],

            // Optional: Reanimated plugin if you use Reanimated
            'react-native-reanimated/plugin',
        ],
    };
};
