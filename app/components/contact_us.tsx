import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios"; // Use axios for HTTP requests

const ContactUs: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    if (!userName || !userEmail || !message) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const templateParams = {
      user_name: userName,
      user_email: userEmail,
      message: message,
    };

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_4w92gwl",
            template_id: "template_3fueuke",
            user_id: "Xo2LfNQJlzLI6-zKe",
            template_params: templateParams,
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Message Sent");
        setUserName("");
        setUserEmail("");
        setMessage("");
      } else {
        Alert.alert("Error", "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while sending your message");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.icons}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/Ezio7777/E-Mandi")}
        >
          <Text style={styles.iconText}>GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.instagram.com/sunitxg_007")
          }
        >
          <Text style={styles.iconText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/in/sunit-pal-1a792824a/")
          }
        >
          <Text style={styles.iconText}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.facebook.com/Sunit Pal")}
        >
          <Text style={styles.iconText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Contact Us</Text>

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          keyboardType="email-address"
          value={userEmail}
          onChangeText={setUserEmail}
        />
        <TextInput
          style={styles.message}
          placeholder="Your Message"
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <Button title="Send" onPress={sendEmail} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconText: {
    color: "#1e90ff",
  },
  formContainer: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 8,
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
  message: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ContactUs;
