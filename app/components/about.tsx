import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const About: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About E-Mandi</Text>

      <View style={styles.card}>
        <View style={styles.cardImage}>{/* Image Placeholder */}</View>
        <Text style={styles.cardText}>
          Name: Sunit Pal {"\n"} Enroll No: 211B384
        </Text>
      </View>

      <View style={styles.description}>
        <Text style={styles.subheader}>Project Developer</Text>
        <Text style={styles.paragraph}>
          I am a student at Jaypee University of Engineering and Technology,
          Guna, and I have developed and maintained the E-Mandi website.
        </Text>
        <Text style={styles.paragraph}>
          E-Mandi is an innovative online platform revolutionizing agricultural
          trading. It connects farmers directly with consumers, facilitating
          seamless transactions and eliminating middlemen. Through a
          user-friendly interface, farmers can showcase their produce, while
          consumers gain access to fresh, locally sourced goods. E-Mandi
          promotes fair pricing, transparency, and sustainability in the
          agricultural supply chain.
        </Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: "center",
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default About;
