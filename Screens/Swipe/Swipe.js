import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  FontAwesome,
  Feather,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";

import ImgSwiper from "../../Components/ImgSwiper";

const Users = [
  { id: "1", uri: require("../../Images/1.jpg") },
  { id: "2", uri: require("../../Images/2.jpg") },
  { id: "3", uri: require("../../Images/3.jpg") },
  { id: "4", uri: require("../../Images/4.jpg") },
  { id: "5", uri: require("../../Images/5.jpg") }
];

class Swipe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgCard}>
          <ImgSwiper users={Users} />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ ...styles.smallContainer, marginRight: -3 }}>
            <FontAwesome name="undo" size={25} color="#f6cd74" />
          </View>
          <View style={{ ...styles.bigContainer, marginRight: -3 }}>
            <Feather name="x-circle" size={50} color="#f58875" />
          </View>
          <View style={{ ...styles.bigContainer, marginLeft: -3 }}>
            <Ionicons
              name="ios-heart"
              size={50}
              style={{ paddingRight: 5, paddingLeft: 5 }}
              color="#63de9b"
            />
          </View>
          <View style={{ ...styles.smallContainer, marginLeft: -3 }}>
            <MaterialIcons name="location-on" size={25} color="#278df9" />
          </View>
        </View>
      </View>
    );
  }
}

export default Swipe;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imgCard: {
    flex: 6
  },
  buttonContainer: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  bigContainer: {
    padding: 15,
    borderWidth: 8,
    borderRadius: 100,
    borderColor: "#f1f1f1"
  },
  smallContainer: {
    padding: 10,
    borderWidth: 8,
    borderRadius: 100,
    borderColor: "#f1f1f1",
    marginBottom: 30
  }
});
