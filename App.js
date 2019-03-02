import React from "react";
import { StyleSheet, View } from "react-native";

import Swipe from "./Screens/Swipe/Swipe";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Swipe />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  }
});
