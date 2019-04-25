import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default (ProfileButton = () => (
  <TouchableOpacity style={styles.container}>
    <FontAwesome name="user" size={30} color="#808080" />
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    marginLeft: 10
  }
});
