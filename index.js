/*
 * @format
 **/

import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
//import 'react-native-gesture-handler';
//import { render } from 'react-dom';

AppRegistry.registerComponent(appName, () => App);


/* Pour React Native Web
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});*/