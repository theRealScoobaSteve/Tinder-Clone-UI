import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

class ImgBanner extends Component {
  renderImage = () => {
    if (this.props.current) {
      return (
        <View>
          <Animated.View
            style={{
              opacity: this.likeOpacity,
              transform: [{ rotate: "-30deg" }],
              ...styles.banner,
              left: 40
            }}
          >
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: this.dislikeOpacity,
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
    return <View style={styles.container} />;
  }
}

export default ImgBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dislikeText: {
    borderWidth: 1,
    borderColor: "red",
    color: "red",
    fontSize: 32,
    fontWeight: "800",
    padding: 10
  },
  likeText: {
    borderWidth: 1,
    borderColor: "green",
    color: "green",
    fontSize: 32,
    fontWeight: "800",
    padding: 10
  }
});
