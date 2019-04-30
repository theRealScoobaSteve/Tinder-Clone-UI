import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  Feather,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";
import { connect } from "react-redux";

import ImgSwiper from "./ImgSwiper";
import ProfileButton from "../../Components/ProfileButton";
import MessageButton from "../../Components/MessageButton";
import Tinder from "../../Components/Tinder";

import { likeImage, dislikeImage } from "./Actions";

const BUTTON_DISTANCE = -4;

class Swipe extends Component {
  static navigationOptions = ({}) => {
    return {
      headerTitle: <Tinder />,
      headerLeft: <ProfileButton />,
      headerRight: <MessageButton />
    };
  };

  render() {
    if (this.props.users) {
      return (
        <View style={styles.container}>
          <View style={styles.imgCard}>
            <ImgSwiper />
          </View>
          <View style={styles.buttonContainer}>
            <View
              style={{ ...styles.smallContainer, marginRight: BUTTON_DISTANCE }}
            >
              <FontAwesome name="undo" size={25} color="#f6cd74" />
            </View>
            <TouchableOpacity onPress={this.props.dislikeImage}>
              <View
                style={{ ...styles.bigContainer, marginRight: BUTTON_DISTANCE }}
              >
                <Feather name="x-circle" size={50} color="#f58875" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.likeImage}>
              <View
                style={{ ...styles.bigContainer, marginLeft: BUTTON_DISTANCE }}
              >
                <Ionicons
                  name="ios-heart"
                  size={50}
                  style={{ paddingRight: 5, paddingLeft: 5 }}
                  color="#63de9b"
                />
              </View>
            </TouchableOpacity>

            <View
              style={{ ...styles.smallContainer, marginLeft: BUTTON_DISTANCE }}
            >
              <MaterialIcons name="location-on" size={25} color="#278df9" />
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default connect(
  mapStateToProps,
  { likeImage, dislikeImage }
)(Swipe);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  imgCard: {
    flex: 8
  },
  buttonContainer: {
    flex: 2,
    paddingBottom: 20,
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
