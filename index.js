/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED === 'true') {
  const StorybookUIRoot = require('./.storybook').default;
  AppEntryPoint = StorybookUIRoot;
}

AppRegistry.registerComponent(appName, () => AppEntryPoint);
