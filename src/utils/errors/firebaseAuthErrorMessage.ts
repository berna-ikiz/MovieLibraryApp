import { View, Text } from "react-native";
import React from "react";

const firebaseAuthErrorMessage: { [key: string]: string } = {
  "auth/email-already-in-use": "This email address is already in use.",
  "auth/invalid-email": "The email address is invalid.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/too-many-requests": "Too many login attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/operation-not-allowed": "This operation is not allowed.",
  "auth/invalid-credential": "This credentials are invalid or have expired.",
  "auth/unknown": "An unexpected error occurred.",
};

export const getAuthErrorMessage = (code: string): string => {
  return (
    firebaseAuthErrorMessage[code] || firebaseAuthErrorMessage["auth/unknown"]
  );
};
