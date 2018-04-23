import React, { Component } from "react";
import { View, Text } from "react-native";
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
} from "native-base";

class Signin extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Rounded</Title>
          </Body>
          <Right />
        </Header>

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
