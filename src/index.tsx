import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./state/movieStore";
import RootNavigator from "./navigation/RootNavigator";
import Toast from "react-native-toast-message";
import { StyleSheet } from "react-native";
import toastConfig from "./utils/toastConfig";
import { checkAuth } from "./services/authService";

export default () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <Main />
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </Provider>
  );
};

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return <RootNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
