import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ImgSwiper from "./Modules/Components/ImgSwiper";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImgSwiper />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
