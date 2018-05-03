import React from 'react';
import { Root } from 'native-base';
import Signin from './screens/Signin.screen';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Boot from './boot/setup';
import { StyleSheet, View } from 'react-native';

const AppNavigator = StackNavigator({
  Signin: { screen: Signin }
});

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}
