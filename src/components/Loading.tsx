import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../theme/colors";
import Header from "./Header";

const Loading = ({ title }: { title: string | null }) => {
  return (
    <View style={styles.loadingContainer}>
      {title && <Header title={title} showBackButton={false} />}
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },
});
