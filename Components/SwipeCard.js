import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";

class SwipeCard extends Component {
  render() {
    const { item } = this.props.item;
    return (
      <View style={styles.container}>
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

        <Image style={styles.image} source={item.uri} />
      </View>
    );
  }
}

export default SwiperCard;

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
    borderRadius: 20
  },
  likeText: {
    borderWidth: 1,
    borderColor: "#33c67a",
    color: "#33c67a",
    fontSize: 32,
    fontWeight: "800",
    padding: 10
  },
  banner: {
    position: "absolute",
    top: 50,
    zIndex: 1000
  }
});
