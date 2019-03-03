import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  FontAwesome,
  Feather,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";

import ImgSwiper from "./ImgSwiper";

const BUTTON_DISTANCE = -4;
const Users = [
  { id: "1", uri: require("../../Images/1.jpg"), name: "Amanda", age: 26 },
  { id: "2", uri: require("../../Images/2.jpg"), name: "Jennifer", age: 27 },
  { id: "3", uri: require("../../Images/3.jpg"), name: "Jessica", age: 34 },
  { id: "4", uri: require("../../Images/4.jpg"), name: "Margot", age: 28 },
  { id: "5", uri: require("../../Images/5.jpg"), name: "Natalie", age: 30 }
];

class Swipe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgCard}>
          <ImgSwiper users={Users} />
        </View>
        <View style={styles.buttonContainer}>
          <View
            style={{ ...styles.smallContainer, marginRight: BUTTON_DISTANCE }}
          >
            <FontAwesome name="undo" size={25} color="#f6cd74" />
          </View>
          <View
            style={{ ...styles.bigContainer, marginRight: BUTTON_DISTANCE }}
          >
            <Feather name="x-circle" size={50} color="#f58875" />
          </View>
          <View style={{ ...styles.bigContainer, marginLeft: BUTTON_DISTANCE }}>
            <Ionicons
              name="ios-heart"
              size={50}
              style={{ paddingRight: 5, paddingLeft: 5 }}
              color="#63de9b"
            />
          </View>
          <View
            style={{ ...styles.smallContainer, marginLeft: BUTTON_DISTANCE }}
          >
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
    flex: 1,
    margin: 10
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
