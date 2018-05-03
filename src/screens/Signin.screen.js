import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Item, Input, Form } from 'native-base';
import GradientButton from '../components/GradientButton';
import { connect } from 'react-redux';
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
export default Signin;
