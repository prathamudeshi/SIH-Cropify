import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Slide1 = require("../../assets/images/Hero/slider-1.png");
const Slide2 = require("../../assets/images/Hero/slider-2.png");

const Hero: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenAndRole = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      const savedRole = await AsyncStorage.getItem("role");
      setToken(savedToken);
      setRole(savedRole);
    };

    fetchTokenAndRole();
  }, []);

  return (
    <View style={styles.homeSlider}>
      <View style={styles.container}>
        <View style={styles.homeSliderMain}>
          {role === "farmer" ? (
            <View style={styles.item}>
              <Image source={Slide1} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.headerText}>
                  List Your Fresh
                  {"\n"}
                  Vegetables
                </Text>
                <Text style={styles.descriptionText}>
                  {token ? "Make Profit" : "Sign up for listing your product"}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.item}>
              <Image source={Slide2} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.headerText}>
                  Fresh Vegetables
                  {"\n"}
                  Big Discount
                </Text>
                <Text style={styles.descriptionText}>
                  {token ? "Get some fresh food" : "Sign up for a discount"}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeSlider: {
    paddingBottom: 30,
  },
  container: {
    position: "relative",
    width: "100%",
  },
  homeSliderMain: {
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
  },
  item: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  info: {
    position: "absolute",
    top: "15%",
    left: "7%",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.7)",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#7e7e7e",
  },
});

export default Hero;
