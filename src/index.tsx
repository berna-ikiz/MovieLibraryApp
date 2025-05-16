import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { store } from "./state/movieStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { setUser } from "./state/slices/authSlice";
import RootNavigator from "./navigation/RootNavigator";
import { UserInfo } from "./utils/type/authType";
import Toast from "react-native-toast-message";
import { StyleSheet } from "react-native";

export default () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <Main />
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
};

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo: UserInfo = {
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName ?? null,
        };
        dispatch(setUser(userInfo ?? null));
      }
    });
    return () => unsubscribe();
  }, []);
  return <RootNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
