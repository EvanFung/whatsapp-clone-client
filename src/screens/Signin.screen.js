import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Item, Input, Form } from 'native-base';
import GradientButton from '../components/GradientButton';
import { connect } from 'react-redux';
import agent from '../agent';
import { LOGIN, UPDATE_FIELD_AUTH } from '../constants/actionTypes';
class Signin extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item rounded>
              <Input placeholder="Username" />
            </Item>
            <Item rounded>
              <Input placeholder="Password" />
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
export default Signin;
