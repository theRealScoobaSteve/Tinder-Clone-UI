import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

class ImgBanner extends Component {
  renderImage = () => {
    if (this.props.current) {
      return (
        <View>
          <Animated.View
            style={{
              opacity: this.props.likeOpacity,
              transform: [{ rotate: "-30deg" }],
              ...styles.banner,
              left: 40
            }}
          >
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: this.props.dislikeOpacity,
              transform: [{ rotate: "30deg" }],
              ...styles.banner,
              right: 40
            }}
          >
            <Text style={styles.dislikeText}>NOPE</Text>
          </Animated.View>
        </View>
      );
    } else {
      return (
        <View>
          <Animated.View style={styles.likeContainer}>
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>

          <Animated.View style={styles.dislikeContainer}>
            <Text style={styles.dislikeText}>NOPE</Text>
          </Animated.View>
        </View>
      );
    }
  };
  render() {
    return <View>{this.renderImage()}</View>;
  }
}

export default ImgBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dislikeText: {
    borderWidth: 1,
    borderColor: "#f58875",
    color: "#f58875",
    fontSize: 32,
    fontWeight: "800",
    padding: 10,
    borderRadius: 20,
    fontWeight: "800",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  likeText: {
    borderWidth: 1,
    borderColor: "#33c67a",
    color: "#33c67a",
    fontSize: 32,
    fontWeight: "800",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  likeContainer: {
    opacity: 0,
    transform: [{ rotate: "-30deg" }],
    position: "absolute",
    top: 50,
    left: 40,
    zIndex: 1000
  },
  dislikeContainer: {
    opacity: 0,
    transform: [{ rotate: "30deg" }],
    position: "absolute",
    top: 50,
    right: 40,
    zIndex: 1000
  },
  banner: {
    position: "absolute",
    top: 50,
    zIndex: 1000
  }
});
