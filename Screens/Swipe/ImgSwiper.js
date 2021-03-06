import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  PanResponder
} from "react-native";
import { connect } from "react-redux";

import DataCard from "../../Components/DataCard";
import { fetchUsers, nextImage, resetEvent } from "./Actions";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class ImgSwiper extends Component {
  constructor() {
    super();

    // Grabs the position the card is starting at
    this.position = new Animated.ValueXY();

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

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    //after each successive update of redux, this component
    //will check if the like of dislike button was pressed
    //instead of a swipe
    if (this.props.event === "LIKED") {
      this.forceSwipe("right");
    }

    if (this.props.event === "DISLIKED") {
      this.forceSwipe("left");
    }

    this.props.resetEvent();
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
        //back to center
        this.position.setValue({ x: 0, y: 0 });
        //advance image
        this.props.nextImage();
      });
  };

  renderUsers = () => {
    if (this.props.users && this.props.users.length > 1) {
      return this.props.users
        .map((item, i) => {
          if (i < this.props.index) {
            return null;
          } else if (i === this.props.index) {
            return (
              <Animated.View
                {...this.PanResponder.panHandlers}
                key={item.id}
                style={[this.rotateAndTranslate, styles.cardWrapper]}
              >
                <DataCard
                  current
                  item={item}
                  likeOpacity={this.likeOpacity}
                  dislikeOpacity={this.dislikeOpacity}
                />
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
                    ...styles.cardWrapper
                  }
                ]}
              >
                <DataCard
                  item={item}
                  likeOpacity={this.likeOpacity}
                  dislikeOpacity={this.dislikeOpacity}
                  current={false}
                />
              </Animated.View>
            );
          }
        })
        .reverse();
    } else {
      return null;
    }
  };

  render() {
    return <View style={{ flex: 1 }}>{this.renderUsers()}</View>;
  }
}

function mapStateToProps({ users, index, event }) {
  return {
    users,
    index,
    event
  };
}

export default connect(
  mapStateToProps,
  { fetchUsers, nextImage, resetEvent }
)(ImgSwiper);

const styles = StyleSheet.create({
  cardWrapper: {
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
});
