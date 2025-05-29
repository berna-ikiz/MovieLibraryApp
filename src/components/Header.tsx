import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../theme/colors";
import { HeaderType } from "../utils/type/movieType";
import { useNavigation } from "@react-navigation/native";
import { CustomText } from "../theme/fontContext";
import AppIcon from "../assets/icons";
const { height } = Dimensions.get("window");

const Header = ({ title, showBackButton }: HeaderType) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AppIcon name="chevron-left" size={28} color={Colors.gray600} />
          </TouchableOpacity>
        )}
        <CustomText style={styles.headerTitle} numberOfLines={1}>
          {title.length < 27 ? `${title}` : `${title.substring(0, 27)}...`}
        </CustomText>
        <View style={styles.backButtonPlaceholder} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingTop:
      Platform.OS === "android"
        ? height > 800
          ? 40
          : 20
        : height > 800
        ? 60
        : 30,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    paddingRight: 16,
  },
  backButtonPlaceholder: {
    width: 44,
  },
});
