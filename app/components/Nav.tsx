import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import BASE_URL from "../constants/server";

// Define prop types for Nav component
interface NavProps {
  setSearchData: (data: any) => void;
}

const Nav: React.FC<NavProps> = ({ setSearchData }) => {
  const navigation = useNavigation();
  const [searchItem, setSearchItem] = useState("");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const savedRole = await AsyncStorage.getItem("role");
      setRole(savedRole);
    };

    fetchRole();
  }, []);

  const onSearch = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Fetch token separately
      const response = await fetch(
        `${BASE_URL}/api/search/show/${searchItem}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            "auth-token": token || "", // Handle null or undefined token safely
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          Alert.alert(
            "Not Found",
            `Product with name '${searchItem}' not found`
          );
          setSearchData([]); // Clear searchData state
        } else {
          Alert.alert("Error", `Failed to fetch data (${response.status})`);
        }
      } else {
        const json = await response.json();
        setSearchData(json);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error fetching data:", err.message);
      Alert.alert("Error", "Failed to fetch data. Please try again later.");
    }
  };

  return (
    <View style={styles.navbarBody}>
      {/* Navigation and other UI elements */}
      {/* Include input for search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={(text) => setSearchItem(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <Icon name="search" size={20} color="#23c686" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarBody: {
    backgroundColor: "#23c686",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    borderColor: "#23c686",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    flex: 1,
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});

export default Nav;
