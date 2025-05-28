import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BaseToastProps,
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";
import Colors from "../../theme/colors";
import AppIcon from "../../assets/icons";
import { CustomText } from "../../theme/fontContext";

const toastConfig: ToastConfig = {
  error: (props) => <CustomToast {...props} />,
  success: (props) => <CustomToast {...props} />,
  info: (props) => <CustomToast {...props} />,
};

const CustomToast = ({ text1, text2, type }: ToastConfigParams<any>) => {
  const iconMap = {
    error: (
      <AppIcon
        name="exclamation-thick"
        size={18}
        color={Colors.danger}
        style={styles.icon}
      />
    ),
    success: (
      <AppIcon
        name="star-rate"
        size={18}
        color={Colors.success}
        style={styles.icon}
      />
    ),
    info: (
      <AppIcon
        name="delete-empty"
        size={18}
        color={Colors.success}
        style={styles.icon}
      />
    ),
  };

  return (
    <View style={[styles.toastContainer, styles.errorContainer]}>
      {text1 ? (
        <View style={styles.toastMessageContainer}>
          {iconMap[type as keyof typeof iconMap]}
          <CustomText style={styles.titleText}>{text1}</CustomText>
        </View>
      ) : null}
      {text2 ? (
        <CustomText style={styles.messageText}>{text2}</CustomText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    width: "90%",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    marginTop: 12,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  toastMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  errorContainer: {
    backgroundColor: Colors.black,
    borderColor: Colors.primary,
  },
  successContainer: {
    backgroundColor: Colors.black,
    borderColor: Colors.primary,
  },
  titleText: {
    color: Colors.gray200,
    fontSize: 14,
    fontWeight: "bold",
  },
  messageText: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 4,
  },
});

export default toastConfig;
