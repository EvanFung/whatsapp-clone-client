import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Item, Input, Form } from 'native-base';
import GradientButton from '../components/GradientButton';
import { connect } from 'react-redux';
import agent from '../agent';
import { LOGIN, UPDATE_FIELD_AUTH } from '../constants/actionTypes';
class Signin extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = value => this.props.onChangeEmail(value);
    this.changePassword = value => this.props.onChangePassword(value);
  }

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
            <GradientButton>LOGIN</GradientButton>
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
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) })
});
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
