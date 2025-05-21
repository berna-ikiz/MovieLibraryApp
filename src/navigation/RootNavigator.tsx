import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/movieStore";
import AppNavigator from "./AppNavigator";
import AuthStack from "./AuthStack";
import { fetchUserFavorites } from "../services/favoriteService";

const RootNavigator = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchUserFavorites(user?.uid));
    }
  }, [user && user.uid]);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
