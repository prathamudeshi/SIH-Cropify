import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from "react-native-ratings";
import { RootStackParamList } from "./navigationTypes"; // Adjust the path as necessary

interface ProductCardProps {
  data: {
    _id: string;
    image: string;
    brand: string;
    name: string;
    rating: string;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const savedRole = await AsyncStorage.getItem("role");
      setRole(savedRole);
    };

    fetchRole();
  }, []);

  const onDetail = () => {
    navigation.navigate("Detail", { id: data._id });
  };

  return (
    <View style={styles.productThumb}>
      {data && (
        <>
          <TouchableOpacity onPress={onDetail} style={styles.cursor}>
            <View style={styles.imgWrapper}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: data.image + "?im=Resize=(420,420)" }}
                  style={styles.image}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.info}>
            <Text style={styles.catName}>{data.brand}</Text>
            <Text style={styles.title}>{data.name}</Text>
            <Rating
              type="star"
              fractions={1}
              startingValue={parseFloat(data.rating)}
              readonly
              imageSize={20}
              style={styles.rating}
            />
            <Text style={styles.brand}>
              By <Text style={styles.brandLink}>{data.brand}</Text>
            </Text>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>Rs {data.price}/KG</Text>
            </View>

            {role !== "farmer" && (
              <Button title="View Details" onPress={onDetail} color="#3bb77e" />
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productThumb: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  imgWrapper: {
    width: "100%",
    height: 150,
    marginBottom: 15,
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  info: {
    paddingHorizontal: 5,
  },
  catName: {
    fontSize: 14,
    color: "#000",
    opacity: 0.8,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginVertical: 5,
  },
  rating: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  brand: {
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 10,
  },
  brandLink: {
    color: "#3bb77e",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3bb77e",
  },
  cursor: {
    cursor: "pointer",
  },
});

export default ProductCard;
