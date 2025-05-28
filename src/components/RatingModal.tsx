import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import AppIcon from "../assets/icons";
import Colors from "../theme/colors";
import Toast from "react-native-toast-message";
import toastConfig from "../utils/config/toastConfig";
import { CustomText } from "../theme/fontContext";

type Props = {
  visible: boolean;
  onClose: () => void;
  initialMinRating?: number;
  initialMaxRating?: number;
  onSelectRating: ({
    minRating,
    maxRating,
  }: {
    minRating: number | undefined;
    maxRating: number | undefined;
  }) => void;
};

const MAX_RATING = 10;

const RatingModal = ({
  visible,
  onClose,
  initialMinRating = 0,
  initialMaxRating = 0,
  onSelectRating,
}: Props) => {
  const [minRating, setMinRating] = useState(initialMinRating);
  const [maxRating, setMaxRating] = useState(initialMaxRating);

  // initialMinRating ve initialMaxRating değişirse iç state'i resetle
  useEffect(() => {
    setMinRating(initialMinRating);
    setMaxRating(initialMaxRating);
  }, [initialMinRating, initialMaxRating, visible]);

  const handleApply = () => {
    if (minRating <= maxRating) {
      onSelectRating({ minRating, maxRating });
      onClose();
    } else {
      Toast.show({
        type: "info",
        text1: "Minimum rating cannot be higher than maximum rating",
        position: "top",
        topOffset: 60,
        visibilityTime: 3000,
      });
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.9}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={true}
      style={styles.modal}
    >
      <View style={styles.ratingContainer}>
        <CustomText style={styles.title}>Select Rating Range</CustomText>
        <CustomText style={styles.label}>Minimum Rating</CustomText>
        <View style={styles.iconsContainer}>
          {renderMinRating(setMinRating, minRating)}
        </View>
        <CustomText style={styles.label}>Maximum Rating</CustomText>
        <View style={styles.iconsContainer}>
          {renderMaxRating(setMaxRating, maxRating)}
        </View>

        <View style={styles.modalButtonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.modalButton}>
            <CustomText style={styles.modalButtonText}>Cancel</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleApply} style={styles.modalButton}>
            <CustomText style={styles.modalButtonText}>Apply</CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <Toast config={toastConfig} />
    </Modal>
  );
};

const renderMinRating = (
  setMinRating: (rate: number) => void,
  minRating: number
) => {
  const minRatingIcons = [];
  for (let i = 1; i <= MAX_RATING; i++) {
    minRatingIcons.push(
      <TouchableOpacity
        key={`min-${i}`}
        onPress={() => (i === minRating ? setMinRating(0) : setMinRating(i))}
        activeOpacity={0.7}
      >
        <AppIcon
          name="popcorn"
          size={24}
          color={i <= minRating ? Colors.primary : Colors.gray600}
          style={{ marginHorizontal: 3 }}
        />
      </TouchableOpacity>
    );
  }
  return minRatingIcons;
};

const renderMaxRating = (
  setMaxRating: (rate: number) => void,
  maxRating: number
) => {
  const maxRatingIcons = [];
  for (let i = 1; i <= MAX_RATING; i++) {
    maxRatingIcons.push(
      <TouchableOpacity
        key={`max-${i}`}
        onPress={() => (i === maxRating ? setMaxRating(0) : setMaxRating(i))}
        activeOpacity={0.7}
      >
        <AppIcon
          name="popcorn"
          size={24}
          color={i <= maxRating ? Colors.primary : Colors.gray600}
          style={{ marginHorizontal: 3 }}
        />
      </TouchableOpacity>
    );
  }
  return maxRatingIcons;
};

export default RatingModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  ratingContainer: {
    backgroundColor: Colors.black,
    width: "80%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  label: {
    color: Colors.gray400,
    fontSize: 16,
    marginVertical: 8,
    alignSelf: "flex-start",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignItems: "center",
  },
  modalButtonText: {
    color: Colors.gray400,
    fontSize: 18,
    fontWeight: "bold",
  },
});
