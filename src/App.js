import React from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { store } from './store';
import { Font, AppLoading } from 'expo';
import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/platform';
import MainAppNavigator from './screens';
import { AsyncStorage } from 'react-native';
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
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
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
