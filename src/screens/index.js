import React, { Component } from 'react';
import Signin from './Signin.screen';
import Signup from './Signup.screen';
import ChatList from './ChatList.screen';
import { AsyncStorage } from 'react-native';
import { APP_LOAD } from '../constants/actionTypes';
import { AppLoading } from 'expo';
import agent from '../agent';
import { connect } from 'react-redux';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import AuthLoading from './AuthLoading.screen';
//Authentication navigator
const AuthNavigator = StackNavigator(
  {
    Signin: { screen: Signin },
    Signup: { screen: Signup }
  }
  // {
  //   headerMode: 'none'
  // }
);
//Home navigator
const AppNavigator = StackNavigator({
  ChatList: { screen: ChatList }
});
//Entired app switchter
const MainAppRoute = SwitchNavigator(
  {
    AuthLoading: AuthLoading,
    AuthNavigator: AuthNavigator,
    AppNavigator: AppNavigator
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

class MainAppNavigator extends Component {
  componentDidMount = () => {
    AsyncStorage.getItem('jwt').then(token => {
      if (token) {
        agent.setToken(token);
      }
      this.props.onLoad(token ? agent.Auth.current() : null, token);
    });
  };

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
