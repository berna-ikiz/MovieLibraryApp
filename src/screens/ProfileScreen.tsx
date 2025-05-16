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
        <Icon name="door-open" size={24} color={Colors.white} />
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Icon name="emoticon-sad" size={100} color={Colors.gray800} />
      </View>
      <TouchableOpacity style={[styles.button, styles.deleteButton]}>
        <Icon name="delete-empty" size={24} color={Colors.white} />
        <Text style={styles.buttonText}>Delete Account</Text>
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
    paddingTop: 24,
    paddingBottom: 36,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: Colors.danger,
    position: "absolute",
    bottom: 32,
    left: 24,
    right: 24,
    shadowColor: "#cc4444",
  },
});
