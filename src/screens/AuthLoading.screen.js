import React, { Component } from 'react';
import { Container, Content, Spinner, Header } from 'native-base';
import { AsyncStorage } from 'react-native';
import agent from '../agent';
class AuthLoading extends Component {
  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    const token = await AsyncStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
      this.props.navigation.navigate('AppNavigator');
    } else {
      this.props.navigation.navigate('AuthNavigator');
    }
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Spinner color="green" />
        </Content>
      </Container>
    );
  }
}
export default AuthLoading;
