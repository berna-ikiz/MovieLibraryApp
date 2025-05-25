import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../theme/colors";
import { HeaderType } from "../utils/type/movieType";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "../assets/icons";
import { CustomText } from "../theme/fontContext";

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
            <ChevronLeftIcon size={28} color={Colors.gray600} />
          </TouchableOpacity>
        )}
        <CustomText style={styles.headerTitle} numberOfLines={1}>
          {title.length < 27 ? `${title}` : `${title.substring(0, 27)}...`}
        </CustomText>
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
