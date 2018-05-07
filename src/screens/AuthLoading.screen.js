import React, { Component } from 'react';
import { Container, Content, Spinner, Header } from 'native-base';
import { AsyncStorage } from 'react-native';
import agent from '../agent';
import { connect } from 'react-redux';
import { APP_LOAD } from '../constants/actionTypes';
class AuthLoading extends Component {
  componentDidMount() {
    AsyncStorage.getItem('jwt').then(token => {
      if (token) {
        agent.setToken(token);
        this.props.navigation.navigate('AppNavigator');
      }
    });
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Spinner />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => {
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
