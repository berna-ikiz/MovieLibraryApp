import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../utils/colors";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/movieStore";
import { logout } from "../services/auth";
import { auth } from "../services/firebase";
import { deleteUser } from "firebase/auth";

const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure to delete account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const user = auth.currentUser;
            if (user) {
              await deleteUser(user);
              console.log("User has been Deleted!");
            }
          } catch (error) {
            //TODO toast message
            console.error("User couldn't be deleted.");
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="🎬 Movie Library" showBackButton={false} />
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Icon name="door-open" size={24} color={Colors.white} />
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Icon name="emoticon-sad" size={100} color={Colors.gray800} />
      </View>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteAccount}
      >
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
