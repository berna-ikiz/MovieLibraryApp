import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../theme/colors";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/movieStore";
import { logout } from "../services/authService";
import { auth } from "../services/firebase";
import { deleteUser } from "firebase/auth";
import {
  DoorOpenIcon,
  EmoticonSadIcon,
  DeleteEmptyIcon,
} from "../assets/icons";
import { CustomText } from "../theme/fontContext";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out? Even the popcorn is getting cold 🍿😢",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                dispatch(logout());
                console.log("User has been logged out!");
              }
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Failed to log out.",
                text2: "Please try again later.",
                position: "top",
                visibilityTime: 3000,
              });
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure to delete your account? Even my emoji is crying 😢",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await deleteUser(user);
                console.log("User has been Deleted!");
                dispatch(logout());
              }
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Failed to delete account.",
                text2: "Please try again later.",
                position: "top",
                visibilityTime: 3000,
              });
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="🎬 Movie Library" showBackButton={false} />
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <DoorOpenIcon size={24} color={Colors.white} />
        <CustomText style={styles.buttonText}>Log out</CustomText>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View style={styles.contentContainer}>
          <EmoticonSadIcon size={100} color={Colors.gray800} />
          <CustomText style={styles.sadFunnyText}>
            Whatever you choose, just know you're crashing my soul.
          </CustomText>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteAccount}
      >
        <DeleteEmptyIcon size={24} color={Colors.white} />
        <CustomText style={styles.buttonText}>Delete Account</CustomText>
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
  sadFunnyText: {
    color: Colors.gray800,
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 12,
  },
});
