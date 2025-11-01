
export * from './src/ExpoSettings.types';
export { default as ExpoSettingsView } from './src/ExpoSettingsView';
import ExpoSettingsModule from './src/ExpoSettingsModule';


export function getTheme(): string {
    return ExpoSettingsModule.getTheme();
}