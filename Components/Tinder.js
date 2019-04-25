import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default (Tinder = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Tinder</Text>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#f58875",
    padding: 6
  },
  text: {
    color: "#f58875",
    fontWeight: "600",
    fontSize: 32
  }
});
