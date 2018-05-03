import React from 'react';
import { Root } from 'native-base';
import Signin from './screens/Signin.screen';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Boot from './boot/setup';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
const AppNavigator = StackNavigator({
  Signin: { screen: Signin }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppNavigator />
        </Root>
      </Provider>
    );
  }
}
