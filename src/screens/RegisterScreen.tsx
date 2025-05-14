import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../utils/colors";

const Register = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.gray600}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.gray600}
        style={styles.input}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
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
  input: {
    height: 50,
    borderColor: Colors.gray300,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: Colors.gray200,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.gray200,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
