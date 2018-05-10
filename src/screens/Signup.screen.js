import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Container, Content, Form, Item, Input } from 'native-base';
import GradientButton from '../components/GradientButton';

class Signup extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <View style={{ alignItems: 'center' }}>
            {/* TODO: render icon here */}
            <Text>Registration</Text>
          </View>
          <View style={styles.content}>
            <View>
              <Form>
                <Item rounded>
                  <Input placeholder="Email" />
                </Item>
                <Item rounded>
                  <Input placeholder="Email" />
                </Item>
                <Item rounded>
                  <Input placeholder="Password" />
                </Item>
                <GradientButton>Sign Up</GradientButton>
              </Form>
            </View>
            <View style={styles.footer}>
              <View style={styles.textRow}>
                <Text>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Signin')}
                >
                  <Text>Sign in now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between'
  },
  footer: {
    justifyContent: 'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
export default Signup;
