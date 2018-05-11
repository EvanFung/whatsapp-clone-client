import './ReactotronConfig';
import React from 'react';
import { YellowBox } from 'react-native';

import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Font, AppLoading } from 'expo';
import { StyleProvider } from 'native-base';

import getTheme from './native-base-theme/components';
import variables from './native-base-theme/variables/platform';
import MainAppNavigator from './src/screens/';
import { AsyncStorage } from 'react-native';
import Signin from './src/screens/Signin.screen';
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);
AsyncStorage.clear();
//load Font and theme style layer
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentDidMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Font.loadAsync({
      fontawesome: require('./src/assets/fonts/fontawesome.ttf'),
      icomoon: require('./src/assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./src/assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./src/assets/fonts/Roboto-Light.ttf')
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <Root>
            <MainAppNavigator />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}
export default App;
