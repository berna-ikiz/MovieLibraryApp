import React from "react";
import { View } from "react-native";
import Navigation from "./navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

export default () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
