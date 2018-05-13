import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Container, Content, Form, Item, Input, Icon } from 'native-base';
import GradientButton from '../components/GradientButton';
import CustomStatusBar from '../components/CustomStatusBar';
import { scaleVertical, scale } from '../utils/scale';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  REGISTER,
  REGISTER_PAGE_UNLOADED,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes';
import agent from '../agent';
class Signup extends Component {
  state = {
    password: '',
    confirmPassword: '',
    errorsList: []
  };
  constructor(props) {
    super(props);
    this.changeEmail = value => this.props.onChangeEmail(value);
    this.changePassword = value => {
      this.props.onChangePassword(value);
      this.setState({ password: value });
    };
    this.changeUsername = value => this.props.onChangeUsername(value);
    this.changeConfirmPassword = value => {
      this.setState({ confirmPassword: value });
    };
  }

  isEqualPassword = () => {
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState(preState => {
        return {
          ...preState,
          errorsList: [
            ...preState.errorsList,
            {
              type: 'password',
              message: `The confirmation password doesn't match password`
            }
          ]
        };
      });
    }
  };

  renderErrorMessage = () => {
    const { errorsList } = this.state;
    let error = errorsList.find(error => error.type === 'password');
    if (error) {
      return <Text>{error.message}</Text>;
    }
  };
  submitForm = () => {
    this.setState(preState => {
      return {
        ...preState,
        errorsList: []
      };
    });
    this.isEqualPassword();
  };

  render() {
    return (
      <Container style={styles.container}>
        <CustomStatusBar />
        <Content padder>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.image}
            />
            <Text style={styles.header2}>Registration</Text>
          </View>
          <View style={styles.content}>
            <View>
              <Form>
                <Item rounded style={styles.input}>
                  <Icon name="user" type="FontAwesome" active />
                  <Input
                    placeholder="Username"
                    onChangeText={this.changeUsername}
                  />
                </Item>
                <Item rounded style={styles.input}>
                  <Icon name="email" type="MaterialCommunityIcons" active />
                  <Input placeholder="Email" onChangeText={this.changeEmail} />
                </Item>
                <Item rounded style={styles.input}>
                  <Icon name="lock" type="FontAwesome" active />
                  <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={this.changePassword}
                  />
                </Item>
                <Item rounded style={styles.input}>
                  <Icon name="lock" type="FontAwesome" active />
                  <Input
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={this.changeConfirmPassword}
                  />
                </Item>
                {this.renderErrorMessage()}
                <GradientButton onPress={this.submitForm}>
                  SIGN UP
                </GradientButton>
              </Form>
            </View>
            <View style={styles.footer}>
              <View style={styles.textRow}>
                <Text style={styles.primary3}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Signin')}
                >
                  <Text style={styles.header6}> Sign in now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => {
    dispatch({ type: REGISTER_PAGE_UNLOADED });
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  content: {
    justifyContent: 'space-between'
  },
  footer: {
    justifyContent: 'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaleVertical(10)
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: 'contain'
  },
  input: {
    marginTop: scaleVertical(10),
    marginBottom: scaleVertical(10)
  },
  primary3: {
    fontSize: scale(15)
  },
  header6: {
    fontSize: scale(15),
    fontWeight: 'bold'
  },
  header2: {
    fontSize: scale(20),
    fontWeight: 'bold'
  }
});

const validate = values => {
  const error = {};
  error['email'] = '';
  error['username'] = '';
  error['password'] = '';
  let ema = values.email;
  let unm = values.username;
  let pw = values.password;
  if (values.email === undefined) {
    ema = '';
  }

  if (values.username === undefined) {
    unm = '';
  }

  if (values.password === undefined) {
    pw = '';
  }

  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
