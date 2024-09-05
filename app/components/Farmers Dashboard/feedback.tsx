import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { AirbnbRating } from "react-native-ratings"; // Use AirbnbRating from react-native-ratings
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../constants/server";
const User_img = require("../../../assets/images/user_img.png");

const Feedback: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/api/feedback/show`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token || "",
          },
        });
        const json = await response.json();
        console.log(json.feedback);
        setData(json.feedback);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <View style={styles.customer}>
        <Image source={User_img} style={styles.userImage} />
        <View style={styles.info}>
          <Text style={styles.customerName}>{item.name}</Text>
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={20}
            isDisabled
            showRating={false}
            starContainerStyle={styles.rating}
          />
        </View>
      </View>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      <Text style={styles.review}>"{item.review}"</Text>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>RS. {item.price}</Text>
        <Text style={styles.productQuantity}>
          Weight:{" "}
          {item.quantity < 1
            ? item.quantity * 1000 + "GM"
            : item.quantity + "KG"}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feedbacks</Text>
        <Text style={styles.headerSubtitle}>
          There are <Text style={styles.headerCount}>{data.length}</Text>{" "}
          Reviews Of Your Product
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    marginVertical: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  headerCount: {
    color: "#faaf00",
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  customer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    justifyContent: "center",
  },
  customerName: {
    fontWeight: "bold",
  },
  rating: {
    alignSelf: "flex-start",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  review: {
    fontSize: 16,
    marginVertical: 5,
  },
  productDetails: {
    marginTop: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#444",
  },
  productQuantity: {
    fontSize: 14,
    color: "#444",
  },
});

export default Feedback;
