import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  Icon,
  Toast,
  Footer
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
import { scaleVertical, scale, scaleModerate } from '../utils/scale';
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

  renderBGImage() {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;
    let image = (
      <Image
        style={[styles.image, { height, width }]}
        source={require('../assets/images/backgroundLoginV1.png')}
      />
    );
    return image;
  }

  render() {
    const { email, password, errors, isProgress } = this.props;
    const image = this.renderBGImage();
    return (
      <Container style={styles.container}>
        {image}
        <Content padder>
          <Form>
            <Item rounded error={errors ? true : false} style={styles.input}>
              <Icon name="user" type="FontAwesome" active />
              <Input
                placeholder="Email"
                onChangeText={this.changeEmail}
                value={email}
              />
              {errors ? <Icon name="close-circle" /> : null}
            </Item>
            <Item rounded error={errors ? true : false}>
              <Icon name="lock" type="FontAwesome" active />
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
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <Text style={styles.primary3}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}
              >
                <Text style={styles.header6}> Sign up now</Text>
              </TouchableOpacity>
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
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
  onRedirect: () => dispatch({ type: REDIRECT })
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  input: {
    marginTop: scaleVertical(10),
    marginBottom: scaleVertical(10)
  },
  footer: {
    justifyContent: 'flex-start',
    flex: 1,
    marginTop: scaleVertical(10)
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10)
  },
  icon: {
    fontSize: scale(33)
  },
  primary3: {
    fontSize: scale(15)
  },
  header6: {
    fontSize: scale(15),
    fontWeight: 'bold'
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
// export default Signin;
