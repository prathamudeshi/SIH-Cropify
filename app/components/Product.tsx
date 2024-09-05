import React from "react";
import { View, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

interface ProductProps {
  data: Array<any>;
}

const Product: React.FC<ProductProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.cardContainer}>
          <ProductCard data={item} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 30,
  },
  cardContainer: {
    width: "50%", // Adjusted for mobile; half the width of the screen
    padding: 10,
  },
});

export default Product;
