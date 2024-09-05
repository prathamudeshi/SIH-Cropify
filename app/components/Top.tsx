import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TopProps {
  name: string;
}

const Top: React.FC<TopProps> = ({ name }) => {
  return (
    <View style={styles.topBody}>
      <Text style={styles.topHeading}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBody: {
    marginLeft: 30,
    marginVertical: 20, // Added vertical margin for better spacing
  },
  topHeading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#444444",
  },
});

export default Top;
