import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { store } from "./state/movieStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { setUser } from "./state/slices/authSlice";
import RootNavigator from "./navigation/RootNavigator";

export default () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <Main />
      </GestureHandlerRootView>
    </Provider>
  );
};

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user ?? null));
    });
    return () => unsubscribe();
  }, []);
  return <RootNavigator />;
};
