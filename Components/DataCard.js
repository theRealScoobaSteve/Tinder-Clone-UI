import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default (DataCard = ({ item }) => (
  <View style={styles.dataSection}>
    <View style={styles.leftCol}>
      <View>
        <Text style={{ color: "#808080", fontWeight: "800" }}>{item.name}</Text>
      </View>
      <View>
        <Text style={{ color: "#6a6a6a" }}>, {item.age}</Text>
      </View>
    </View>
    <View style={styles.rightCol}>
      <View style={{ marginTop: 3, marginRight: 5 }}>
        <FontAwesome name="group" size={15} color="#f58875" />
      </View>
      <View style={styles.spacing}>
        <Text style={{ color: "#f58875" }}>21</Text>
      </View>
      <View style={styles.spacing}>
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={16}
          color="#cecece"
        />
      </View>
      <View style={styles.spacing}>
        <Text style={{ color: "#cecece" }}>13</Text>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({
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
  },
  spacing: { marginLeft: 5 }
});
