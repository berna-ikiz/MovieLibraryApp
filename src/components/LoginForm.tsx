import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../services/auth";
import { AppDispatch, RootState } from "../state/movieStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../utils/type/authType";
import Loading from "./Loading";
import Toast from "react-native-toast-message";

type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

type Props = {
  buttonTitle: string;
  isLogin: boolean;
};

const LoginForm = (Props: Props) => {
  const { buttonTitle, isLogin } = Props;
  const navigation = useNavigation<AuthStackNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<TextInput>(null);
  const isLoading = useSelector((state: RootState) => state.auth.loading);

  const handleSubmit = () => {
    try {
      if (email && password) {
        if (isLogin) {
          console.log(email);
          console.log(password);
          dispatch(login(email, password));
        } else {
          console.log(email);
          console.log(password);
          dispatch(register(email, password));
        }
      } else {
        console.log("here");
        Toast.show({
          type: "error",
          text1: "Please fill all fields.",
          position: "top",
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Unexpected error occured.",
          text2: error.message,
          position: "top",
          visibilityTime: 3000,
        });
      } else {
        if (error instanceof Error) {
          Toast.show({
            type: "error",
            text1: "Unexpected error occured.",
            position: "top",
            visibilityTime: 3000,
          });
        }
      }
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading title={""} />;
  }

  return (
    <>
      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.gray600}
        style={styles.input}
        autoCapitalize="none"
        onEndEditing={(e) => setEmail(e.nativeEvent.text)}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={Colors.gray600}
        style={styles.input}
        secureTextEntry={true}
        onEndEditing={(e) => setPassword(e.nativeEvent.text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Text
            style={[styles.footerText, styles.footerLink]}
            onPress={() => {
              navigation.navigate(isLogin ? "Register" : "Login");
            }}
          >
            {isLogin ? " Register" : " Login"}
          </Text>
        </View>
      </View>
    </>
  );
};

export default LoginForm;

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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  footerText: {
    color: Colors.gray400,
    fontWeight: "500",
    fontSize: 16,
  },
  footerLink: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
