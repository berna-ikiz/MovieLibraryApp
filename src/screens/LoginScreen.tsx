import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginForm from "../components/LoginForm";
import Colors from "../utils/colors";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginForm buttonTitle="Login" isLogin={true} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: Colors.black,
    gap: 8,
  },
});
