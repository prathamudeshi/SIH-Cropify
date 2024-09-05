import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import for AsyncStorage
import { RootStackParamList } from "./navigationTypes";
import BASE_URL from "../constants/server";

const Signup: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [role, setRole] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
  };

  const handleClick = () => {
    navigation.navigate("Home");
  };

  const onSubmitSignUp = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: role,
          email: email,
          password: password,
          name: name,
          phno: phno,
          state: state,
          city: city,
          pin: pin,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        await AsyncStorage.setItem("token", json.authtoken);
        await AsyncStorage.setItem("role", json.role);
        handleClick();
      } else {
        let message = "";
        switch (json.error) {
          case "Exist":
            message = "User Already Exists";
            break;
          case "pin":
            message = "Give a valid PIN code";
            break;
          case "phno":
            message = "Give a valid Phone No";
            break;
          case "state":
            message = "Give a valid state Name";
            break;
          case "email":
            message = "Give a valid Email";
            break;
          case "password":
            message = "Give a valid Password";
            break;
          case "name":
            message = "Give a valid Name";
            break;
          default:
            message = "Invalid Credentials";
        }
        Alert.alert("Warning", message);
      }
    } catch (error) {
      const err = error as Error;
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputGroup}>
        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={(itemValue: string) =>
            handleChange(setRole, itemValue)
          } // Correct typing for itemValue
        >
          <Picker.Item label="Farmer" value="farmer" />
          <Picker.Item label="Buyer" value="buyer" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => handleChange(setName, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phno}
        onChangeText={(text) => handleChange(setPhno, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => handleChange(setEmail, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => handleChange(setPassword, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={(text) => handleChange(setState, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={(text) => handleChange(setCity, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="PIN code"
        keyboardType="numeric"
        value={pin}
        onChangeText={(text) => handleChange(setPin, text)}
      />

      <Button title="Sign Up" onPress={onSubmitSignUp} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  link: {
    color: "#1e90ff",
    marginTop: 10,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
});

export default Signup;
