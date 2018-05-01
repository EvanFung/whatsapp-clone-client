import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Body,
  Left,
  Right,
  Item,
  Input,
  Form
} from 'native-base';

class Signin extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item rounded>
              <Input placeholder="Rounded Textbox" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Signin;
