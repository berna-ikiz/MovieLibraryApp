import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import AppIcon from "../assets/icons";
import Colors from "../theme/colors";
import { CustomText } from "../theme/fontContext";

type Props = {
  visible: boolean;
  onClose: () => void;
  initialMinRating?: number;
  onSelectRating: ({ minRating }: { minRating: number | undefined }) => void;
};

const MAX_RATING = 10;

const RatingModal = ({
  visible,
  onClose,
  initialMinRating = 0,
  onSelectRating,
}: Props) => {
  const [minRating, setMinRating] = useState(initialMinRating);

  useEffect(() => {
    setMinRating(initialMinRating);
  }, [initialMinRating, visible]);

  const handleApply = () => {
    onSelectRating({ minRating });
    onClose();
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
        <CustomText style={styles.label}>Filter movies by rating</CustomText>
        <View style={styles.iconsContainer}>
          {renderMinRating(setMinRating, minRating)}
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
    </Modal>
  );
};

const renderMinRating = (
  setMinRating: (rate: number) => void,
  minRating: number
) => {
  console.log(minRating);
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
          size={26}
          color={i <= minRating ? Colors.primary : Colors.gray600}
          style={{ marginHorizontal: 3 }}
        />
      </TouchableOpacity>
    );
  }
  return minRatingIcons;
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
    marginBottom: 10,
    fontWeight: "bold",
  },
  label: {
    color: Colors.gray600,
    fontSize: 16,
    marginVertical: 8,
    marginBottom: 12,
    alignSelf: "center",
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
