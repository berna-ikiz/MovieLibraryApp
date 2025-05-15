import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Colors from "../utils/colors";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";

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
