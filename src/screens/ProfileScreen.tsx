import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../utils/colors";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="🎬 Movie Library" showBackButton={false} />
      <TouchableOpacity style={styles.button}>
        <Icon name="door-open" size={30} color={Colors.white} />
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.deleteButton]}>
        <Icon name="delete-empty" size={30} color={Colors.white} />
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    gap: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: Colors.gray800,
    fontSize: 24,
  },
  deleteButtonText: {
    fontSize: 20,
    color: Colors.white,
  },
});
