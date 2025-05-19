import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Colors from "../theme/colors";
import LoginForm from "../components/LoginForm";

const Register = () => {
  return (
    <View style={styles.container}>
      <LoginForm buttonTitle="Register" isLogin={false} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: Colors.black,
    gap: 8,
  },
});
