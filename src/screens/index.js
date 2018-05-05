import React, { Component } from 'react';
import Signin from './Signin.screen';
import ChatList from './ChatList.screen';
import { AsyncStorage } from 'react-native';
import { APP_LOAD } from '../constants/actionTypes';
import { AppLoading } from 'expo';
import agent from '../agent';
import { connect } from 'react-redux';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
const AuthNavigator = StackNavigator({
  Signin: { screen: Signin }
});

const AppNavigator = StackNavigator({
  ChatList: { screen: ChatList }
});

const MainAppRoute = SwitchNavigator(
  {
    AuthNavigator: AuthNavigator,
    AppNavigator: AppNavigator
  },
  {
    initialRouteName: 'AuthNavigator'
  }
);

class MainAppNavigator extends Component {
  componentDidMount() {
    const token = AsyncStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return <MainAppRoute />;
    }

    return <AppLoading />;
  }
}
const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => {
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MainAppNavigator);
