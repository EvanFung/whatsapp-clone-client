import './ReactotronConfig';
import React from 'react';
import App from './src/App';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);
const StartApp = () => <App />;

export default StartApp;
