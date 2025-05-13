import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../utils/colors";
import { HeaderType } from "../utils/movieType";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, showBackButton }: HeaderType) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={{ color: Colors.white }}>Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryDark,
  },
  backButton: {
    marginRight: 10,
  },
});
