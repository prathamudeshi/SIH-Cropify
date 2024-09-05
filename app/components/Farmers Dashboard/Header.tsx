import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs"; // Using react-icons for icon representation

type HeaderProps = {
  OpenSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={OpenSidebar} style={styles.menuIcon}>
        <BsJustify />
      </TouchableOpacity>
      <View style={styles.headerLeft}></View>
      <View style={styles.headerRight}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  menuIcon: {
    padding: 10,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Header;
