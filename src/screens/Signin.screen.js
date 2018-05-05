import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Item, Input, Form } from 'native-base';
import GradientButton from '../components/GradientButton';
import { connect } from 'react-redux';
import agent from '../agent';
import {
  LOGIN,
  UPDATE_FIELD_AUTH,
  LOGIN_PAGE_UNLOADED,
  APP_LOAD
} from '../constants/actionTypes';
import { AsyncStorage } from 'react-native';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = value => this.props.onChangeEmail(value);
    this.changePassword = value => this.props.onChangePassword(value);
    this.submitForm = (email, password) => event => {
      event.preventDefault();
      this.props.onSubmit(email, password);
    };
  }
  componentWillUnmount() {
    this.props.onUnload();
  }
  componentDidMount = () => {
    const token = AsyncStorage.getItem('jwt');

    // this.props.navigation.navigate(token ? 'AppNavigator' : 'AuthNavigator');
  };

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <Container>
        <Content padder>
          <Form>
            <Item rounded>
              <Input
                placeholder="Username"
                onChangeText={this.changeEmail}
                value={email}
              />
            </Item>
            <Item rounded>
              <Input
                placeholder="Password"
                onChangeText={this.changePassword}
                secureTextEntry
                value={password}
              />
            </Item>
            {/* <ActivityIndicator /> */}
            <GradientButton onPress={this.submitForm(email, password)}>
              LOGIN
            </GradientButton>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });
const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
  onLoad: () => dispatch({ type: APP_LOAD, payload, token, skipTracking: true })
});
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
