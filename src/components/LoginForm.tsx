import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../services/authService";
import { AppDispatch, RootState } from "../state/movieStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../utils/type/authType";
import Loading from "./Loading";
import Toast from "react-native-toast-message";
import { CustomText } from "../theme/fontContext";
import { Fonts } from "../theme/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

  const handleSubmit = async () => {
    if (!email || !password) {
      Toast.show({
        type: "info",
        text1: "Please fill all fields.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    try {
      if (isLogin) {
        await dispatch(login({ email, password })).unwrap();
      } else {
        await dispatch(register({ email, password })).unwrap();
      }
    } catch (err) {
      setPassword("");
      Toast.show({
        type: "info",
        text1: isLogin ? "Login Failed" : "Register Failed",
        text2: typeof err === "string" ? err : "An unexpected error occurred.",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  if (isLoading) {
    return <Loading title={""} />;
  }

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === "ios" ? 100 : 0}
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.gray600}
          style={styles.input}
          autoCapitalize="none"
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          placeholderTextColor={Colors.gray600}
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <CustomText style={styles.buttonText}>{buttonTitle}</CustomText>
        </TouchableOpacity>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate(isLogin ? "Register" : "Login");
            }}
          >
            <View style={styles.footer}>
              <CustomText style={styles.footerText}>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </CustomText>
              <CustomText style={[styles.footerText, styles.footerLink]}>
                {isLogin ? " Register" : " Login"}
              </CustomText>
            </View>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    fontFamily: Fonts.fontFamily.regular,
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
