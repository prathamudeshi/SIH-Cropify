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
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types";
import BASE_URL from "../constants/server";

const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (text: string) => {
    setSignInEmail(text);
  };
  const onPasswordChange = (text: string) => {
    setSignInPassword(text);
  };

  const handleClick = () => {
    navigation.navigate("Home");
  };

  const onSubmitLogIn = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        await AsyncStorage.setItem("token", json.authtoken);
        await AsyncStorage.setItem("role", json.role);
        handleClick();
      } else {
        Alert.alert("Warning", "Invalid Credentials");
      }
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={signInEmail}
        onChangeText={onEmailChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={signInPassword}
        onChangeText={onPasswordChange}
      />

      <TouchableOpacity
        onPress={() =>
          Alert.alert("Forgot Password?", "Reset link sent to your email.")
        }
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button title="Log In" onPress={onSubmitLogIn} />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
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
  forgotPassword: {
    textAlign: "right",
    color: "#1e90ff",
    marginBottom: 20,
  },
  link: {
    color: "#1e90ff",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Login;
