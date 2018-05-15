import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Toast
} from 'native-base';
import GradientButton from '../components/GradientButton';
import CustomStatusBar from '../components/CustomStatusBar';
import { scaleVertical, scale } from '../utils/scale';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import {
  REGISTER,
  REGISTER_PAGE_UNLOADED,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes';
import agent from '../agent';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = value => this.props.onChangeEmail(value);
    this.changePassword = value => {
      this.props.onChangePassword(value);
    };
    this.changeUsername = value => this.props.onChangeUsername(value);
    this.renderInput = this.renderInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  renderInput({
    input: { onChange, ...restInput },
    meta: { touched, error, warning },
    iconName,
    iconType,
    placeholder,
    isSecureField = false
  }) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError} rounded style={styles.input}>
        <Icon name={iconName} type={iconType} active />
        <Input
          onChangeText={onChange}
          {...restInput}
          placeholder={placeholder}
          secureTextEntry={isSecureField}
        />
        {hasError ? <Text style={styles.errorText}>{error}</Text> : <Text />}
      </Item>
    );
  }

  submitForm = values => {
    let username = values.username;
    let email = values.email;
    let password = values.password;
    let confirmPassword = values.confirmPassword;

    if (username.length === 0) {
      throw new SubmissionError({
        username: 'Required',
        _error: 'Sign up failed'
      });
    }

    if (email.length === 0) {
      throw new SubmissionError({
        email: 'Required',
        _error: 'Sign up failed'
      });
    }

    if (password.length === 0) {
      throw new SubmissionError({
        password: 'Required',
        _error: 'Sign up failed'
      });
    }

    if (confirmPassword.length === 0) {
      throw new SubmissionError({
        confirmPassword: 'Required',
        _error: 'Sign up failed'
      });
    }
    if (password !== confirmPassword) {
      throw new SubmissionError({
        password: 'Password does not match',
        confirmPassword: 'Password does not match',
        _error: 'Sign up failed'
      });
    }

    if (!this.props.error) {
      console.log(values);
      this.props.onSubmit(username, email, password);
    }
  };

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
    const { handleSubmit } = this.props;
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
                <Field
                  name="username"
                  component={this.renderInput}
                  placeholder="Username"
                  iconName="user"
                  iconType="FontAwesome"
                />
                <Field
                  name="email"
                  component={this.renderInput}
                  placeholder="Email"
                  iconName="email"
                  iconType="MaterialCommunityIcons"
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  placeholder="Password"
                  iconName="lock"
                  iconType="FontAwesome"
                  isSecureField={true}
                />
                <Field
                  name="confirmPassword"
                  component={this.renderInput}
                  placeholder="Confirm Password"
                  iconName="lock"
                  iconType="FontAwesome"
                  isSecureField={true}
                />
                {this.renderToast()}
                <GradientButton onPress={handleSubmit(this.submitForm)}>
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
  },
  errorText: {
    paddingRight: 5,
    color: 'red'
  }
});

const validate = values => {
  const error = {};
  error.email = '';
  error.username = '';
  let email = values.email;
  let usernmae = values.username;
  if (email.length < 8 && email !== '') {
    error.email = 'Too short';
  }
  if (!email.includes('@') && email !== '') {
    error.email = '@ not included';
  }
  if (usernmae.length > 8) {
    error.username = 'Max 8 characters';
  }
  return error;
};
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'signup',
    validate,
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })(Signup)
);
