import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Hero from "../components/hero";
import Product from "../components/Product";
import Top from "../components/Top";
import Nav from "../components/Nav";
import { RootStackParamList } from "../components/navigationTypes"; // Import your type definitions
import BASE_URL from "../constants/server";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Correctly typed navigation
  const [token, setToken] = useState<string | null>(null);

  const [top, setTop] = useState([]);
  const [vegetable, setVegetable] = useState([]);
  const [fruit, setFruit] = useState([]);
  const [flours, setFlours] = useState([]);
  const [masala, setMasala] = useState([]);
  const [rice, setRice] = useState([]);
  const [dal, setDal] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const getToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);

      if (!savedToken) {
        navigation.navigate("Signup" as never); // Correct typing for the route
        return;
      }

      // Fetch data from your backend API
      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/product/view`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": savedToken || "", // Ensure token is a string
            } as HeadersInit, // Explicitly define the headers type
          });
          const json = await response.json();
          const top = json.filter((item: any) => item.rating >= 4);
          const veg = json.filter((item: any) => item.cat === "vegetable");
          const fruit = json.filter((item: any) => item.cat === "fruit");
          const masala = json.filter((item: any) => item.cat === "masala");
          const rice = json.filter((item: any) => item.cat === "rice");
          const dal = json.filter((item: any) => item.cat === "dal");
          const flours = json.filter((item: any) => item.cat === "flours");
          setTop(top);
          setVegetable(veg);
          setFruit(fruit);
          setMasala(masala);
          setRice(rice);
          setDal(dal);
          setFlours(flours);
        } catch (error) {
          // Casting the error to an Error type
          const err = error as Error;
          console.error("Error fetching products:", err.message);
        }
      };

      // Call fetchData function when component mounts
      fetchData();
    };

    getToken();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Nav setSearchData={setSearchData} />
      {searchData.length !== 0 && (
        <>
          <Top name="Search Items" />
          <Product data={searchData} />
        </>
      )}
      <Hero />

      {top.length > 0 && (
        <>
          <Top name="Top Products" />
          <Product data={top} />
        </>
      )}
      {vegetable.length > 0 && (
        <>
          <Top name="Vegetables" />
          <Product data={vegetable} />
        </>
      )}
      {fruit.length > 0 && (
        <>
          <Top name="Fruits" />
          <Product data={fruit} />
        </>
      )}
      {flours.length > 0 && (
        <>
          <Top name="Flours" />
          <Product data={flours} />
        </>
      )}
      {rice.length > 0 && (
        <>
          <Top name="Rice" />
          <Product data={rice} />
        </>
      )}
      {dal.length > 0 && (
        <>
          <Top name="Dal" />
          <Product data={dal} />
        </>
      )}
      {masala.length > 0 && (
        <>
          <Top name="Masalas" />
          <Product data={masala} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
