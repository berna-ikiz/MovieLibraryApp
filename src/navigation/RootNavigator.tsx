import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/movieStore";
import AppNavigator from "./AppNavigator";
import AuthStack from "./AuthStack";
import { fetchUserFavorites } from "../services/favoriteService";
import { auth } from "../services/firebase";
import { checkAuth } from "../services/authService";
import Loading from "../components/Loading";

const RootNavigator = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const checkingAuth = useSelector(
    (state: RootState) => state.auth.checkingAuth
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      dispatch(fetchUserFavorites(currentUser?.uid));
    }
  }, [currentUser, dispatch]);

  if (checkingAuth) {
    return <Loading title={""} />;
  }
  return (
    <NavigationContainer>
      {currentUser ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
