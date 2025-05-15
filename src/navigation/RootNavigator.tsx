import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../state/movieStore";
import AppNavigator from "./AppNavigator";
import AuthStack from "./AuthStack";

const RootNavigator = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
