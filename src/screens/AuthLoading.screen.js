import React, { Component } from 'react';
import { Container, Content, Spinner, Header } from 'native-base';
import { AsyncStorage } from 'react-native';
class AuthLoading extends Component {
  componentDidMount() {
    AsyncStorage.getItem('jwt').then(token => {
      if (token) {
        this.props.navigation.navigate('AppNavigator');
      } else {
        this.props.navigation.navigate('AuthNavigator');
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

export default AuthLoading;
