import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  Icon,
  Toast
} from 'native-base';
import GradientButton from '../components/GradientButton';
import { connect } from 'react-redux';
import agent from '../agent';
import {
  LOGIN,
  UPDATE_FIELD_AUTH,
  LOGIN_PAGE_UNLOADED,
  APP_LOAD,
  REDIRECT
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      console.log(nextProps.redirectTo);
      this.props.navigation.navigate(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  renderToast() {
    const errors = this.props.errors;
    if (errors) {
      Object.keys(errors).map(key => {
        return Toast.show({
          text: `${key} ${errors[key]}`,
          buttonText: `OK`,
          duration: 1000,
          type: 'danger'
        });
      });
    }
  }

  render() {
    const { email, password, errors, isProgress } = this.props;
    return (
      <Container>
        <Content padder>
          <Form>
            <Item rounded error={errors ? true : false}>
              <Input
                placeholder="Username"
                onChangeText={this.changeEmail}
                value={email}
              />
              {errors ? <Icon name="close-circle" /> : null}
            </Item>
            <Item rounded error={errors ? true : false}>
              <Input
                placeholder="Password"
                onChangeText={this.changePassword}
                secureTextEntry
                value={password}
              />
              {errors ? <Icon name="close-circle" /> : null}
            </Item>
            {isProgress ? <ActivityIndicator /> : null}
            {this.renderToast()}
            <GradientButton onPress={this.submitForm(email, password)}>
              LOGIN
            </GradientButton>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  redirectTo: state.common.redirectTo
});
const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
  onRedirect: () => dispatch({ type: REDIRECT })
});
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
