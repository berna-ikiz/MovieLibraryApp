import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../utils/colors";
import { HeaderType } from "../utils/type/movieType";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
            <Icon name="keyboard-backspace" size={24} color={Colors.primary} />
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
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 60,
  },
});
