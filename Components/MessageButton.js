import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default (MessageButton = () => (
  <TouchableOpacity style={styles.container}>
    <MaterialCommunityIcons name="message" size={30} color="#808080" />
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    marginRight: 10
  }
});
