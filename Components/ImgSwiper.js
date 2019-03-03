import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import ImgBanner from "./ImgBanner";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class ImgSwiper extends Component {
  constructor() {
    super();

    // Grabs the position the card is starting at
    this.position = new Animated.ValueXY();

    // Current index of the index being swiped
    this.state = {
      currentIndex: 0
    };

    this.likeOpacity = this.position.x.interpolate({
      // if the user is going towareds the like side,
      // make it less opaque, otherswise make it opaque
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
    // Logically associates an opacity to the dislike title in the corner
    // of the image
    this.dislikeOpacity = this.position.x.interpolate({
      // if the user is going towareds the dislike side,
      // make it less opaque, otherswise make it opaque
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    // Rotates the screen based on the direction of the swipe
    this.rotate = this.position.x.interpolate({
      // inputRange and ouputRange have a direct linear relationship
      // everytime the user swipes half the screen width, the picture
      // tilts another 10deg or -10 deg
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp"
    });

    // Describes how the object should be rotated
    this.rotateAndTranslate = {
      // Passing in an animation to transform will
      // consistently update the image and dynamically
      // rotate it
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp"
    });
    this.PanResponder = PanResponder.create({
      // Identify that on touch this responder should fire
      onStartShouldSetPanResponder: () => true,
      // When the card is being moved fire this function
      onPanResponderMove: (evt, gestureState) => {
        // Moves the image based on wherever the the users finger is on the screen
        this.position.setValue({ x: gestureState.dx, y: 0 });
      },
      // Fires when the user releases the card
      onPanResponderRelease: (evt, gestureState) => {
        // If moving to the right and passed 120px threshold
        if (gestureState.dx > 120) {
          this.forceSwipe("right");
        }
        // Moving to the left
        else if (gestureState.dx < -120) {
          this.forceSwipe("left");
        }
        // If not passed the 120px threshold, spring back to the center
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  forceSwipe = direction => {
    const x = direction === "right" ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    Animated.spring(this.position, {
      // Move the image somewhere off screen at the same height it currently is at
      toValue: { x, y: 0 }
    })
      // after the image is flicked off the screen bring the next image
      // into view
      .start(() => {
        this.setState(
          // next image
          { currentIndex: this.state.currentIndex + 1 },
          () => {
            // back to center
            this.position.setValue({ x: 0, y: 0 });
          }
        );
      });
  };

  renderUsers = () => {
    return this.props.users
      .map((item, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i === this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.id}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT * 0.6,
                  // Offsets the margin set in Swipe.js
                  width: SCREEN_WIDTH - 20,
                  position: "absolute",
                  borderWidth: 3,
                  borderBottomColor: "white",
                  borderColor: "#f1f1f1",
                  borderRadius: 20,
                  shadowOffset: { width: 10, height: 10 },
                  shadowColor: "black",
                  shadowOpacity: 1.0
                }
              ]}
            >
              <ImgBanner
                current
                likeOpacity={this.likeOpacity}
                dislikeOpacity={this.dislikeOpacity}
              />
              <Image style={styles.image} source={item.uri} />
              <View style={styles.dataSection}>
                <View style={styles.leftCol}>
                  <View>
                    <Text style={{ color: "#808080", fontWeight: "800" }}>
                      {item.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "#6a6a6a" }}>, {item.age}</Text>
                  </View>
                </View>
                <View style={styles.rightCol}>
                  <View style={{ marginTop: 3, marginRight: 5 }}>
                    <FontAwesome name="group" size={15} color="#f58875" />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: "#f58875" }}>21</Text>
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <MaterialCommunityIcons
                      name="book-open-page-variant"
                      size={16}
                      color="#cecece"
                    />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: "#cecece" }}>13</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.id}
              style={[
                {
                  opacity: this.nextCardOpacity,
                  transform: [{ scale: this.nextCardScale }],
                  height: SCREEN_HEIGHT * 0.6,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute"
                }
              ]}
            >
              <ImgBanner />
              <Image style={styles.image} source={item.uri} />
              <View style={styles.dataSection}>
                <View style={styles.leftCol}>
                  <View>
                    <Text style={{ color: "#808080", fontWeight: "800" }}>
                      {item.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "#6a6a6a" }}>, {item.age}</Text>
                  </View>
                </View>
                <View style={styles.rightCol}>
                  <View style={{ marginTop: 3, marginRight: 5 }}>
                    <FontAwesome name="group" size={15} color="#f58875" />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: "#f58875" }}>21</Text>
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <MaterialCommunityIcons
                      name="book-open-page-variant"
                      size={16}
                      color="#cecece"
                    />
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: "#cecece" }}>13</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    return <View style={{ flex: 1 }}>{this.renderUsers()}</View>;
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  dataSection: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  leftCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  rightCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
