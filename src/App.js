import React from "react";
import { StyleProvider } from "native-base";
import Signin from "./screens/Signin.screen";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import getTheme from "../native-base-theme/components";
import variables from "../native-base-theme/variables/platform";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentDidMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Signin />
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
