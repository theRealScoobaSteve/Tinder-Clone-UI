import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated
} from "react-native";

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
        <View>
          <View>
            <Text>{item.name},</Text>
          </View>
          <View>
            <Text>{item.age}</Text>
          </View>
        </View>
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
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 20
  }
});
