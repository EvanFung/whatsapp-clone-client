import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Button, Item, Input, Form } from 'native-base';
import GradientButton from '../components/GradientButton';
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
            <GradientButton>LOGIN</GradientButton>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Signin;
