import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import Colors from "../../theme/colors";
import {
  ErrorIcon,
  StarBorderIcon,
  DeleteVariantIcon,
} from "../../assests/icons";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.toastContainer, styles.errorContainer]}>
      {text1 ? (
        <View style={styles.toastMessageContainer}>
          <ErrorIcon size={18} color={Colors.danger} style={styles.icon} />
          <Text style={styles.titleText}>{text1}</Text>
        </View>
      ) : null}
      {text2 ? <Text style={styles.messageText}>{text2}</Text> : null}
    </View>
  ),
  success: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.toastContainer, styles.successContainer]}>
      {text1 ? (
        <View style={styles.toastMessageContainer}>
          <StarBorderIcon
            size={18}
            color={Colors.success}
            style={styles.icon}
          />
          <Text style={styles.titleText}>{text1}</Text>
        </View>
      ) : null}
      {text2 ? <Text style={styles.messageText}>{text2}</Text> : null}
    </View>
  ),
  delete: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.toastContainer, styles.errorContainer]}>
      {text1 ? (
        <View style={styles.toastMessageContainer}>
          <DeleteVariantIcon
            size={18}
            color={Colors.success}
            style={styles.icon}
          />
          <Text style={styles.titleText}>{text1}</Text>
        </View>
      ) : null}
      {text2 ? <Text style={styles.messageText}>{text2}</Text> : null}
    </View>
  ),
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
