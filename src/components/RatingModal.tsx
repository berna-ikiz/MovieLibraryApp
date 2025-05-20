import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../theme/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  initialMinRating?: number;
  initialMaxRating?: number;
  onSelectRating: (rating: number) => void;
};

const MAX_RATING = 10;

const RatingModal = (Props: Props) => {
  const {
    visible,
    onClose,
    initialMinRating = 0,
    initialMaxRating = 10,
    onSelectRating,
  } = Props;

  const [minRating, setMinRating] = useState(initialMinRating);
  const [maxRating, setMaxRating] = useState(initialMaxRating);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.title}>Select Rating Range</Text>
          <Text style={styles.label}>Minimum Rating</Text>
          <View style={styles.iconsContainer}>
            {renderMinRating(setMinRating, minRating)}
          </View>
          <Text style={styles.label}>Maximum Rating</Text>
          <View style={styles.iconsContainer}>
            {renderMaxRating(setMaxRating, maxRating)}
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
      <TouchableOpacity onPress={() => setMinRating(i)} activeOpacity={0.7}>
        <Icon
          name="popcorn"
          size={24}
          color={i <= minRating ? Colors.primary : Colors.gray600}
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
      <TouchableOpacity onPress={() => setMaxRating(i)} activeOpacity={0.7}>
        <Icon
          name="popcorn"
          size={24}
          color={i <= maxRating ? Colors.primary : Colors.gray600}
        />
      </TouchableOpacity>
    );
  }
  return maxRatingIcons;
};

export default RatingModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(18, 18, 18, 0.9)",
    justifyContent: "center",
    alignItems: "center",
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
    marginHorizontal: 2,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: Colors.gray400,
    fontSize: 18,
    fontWeight: "bold",
  },
});
