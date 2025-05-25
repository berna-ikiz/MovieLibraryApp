import React from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { GenreType } from "../utils/type/movieType";
import Colors from "../theme/colors";
import { CustomText } from "../theme/fontContext";

type Props = {
  visible: boolean;
  onClose: () => void;
  genres: GenreType[];
  selectedGenre: GenreType | null;
  onSelectGenre: (genre: GenreType) => void;
};

const GenreModal = (Props: Props) => {
  const { visible, onClose, genres, selectedGenre, onSelectGenre }: Props =
    Props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText style={styles.modalTitle}>Select Genres</CustomText>
          <View style={styles.genreListContainer}>
            <FlatList
              data={genres}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) =>
                renderGenreItem({ item, selectedGenre, onSelectGenre })
              }
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CustomText style={styles.closeButtonText}>Close</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const renderGenreItem = ({
  item,
  selectedGenre,
  onSelectGenre,
}: {
  item: GenreType;
  selectedGenre: GenreType | null;
  onSelectGenre: (genre: GenreType) => void;
}) => {
  const isSelected = selectedGenre?.id === item.id;
  return (
    <TouchableOpacity
      style={[styles.genreItem, isSelected && styles.genreItemSelected]}
      onPress={() => onSelectGenre(item)}
      activeOpacity={0.7}
    >
      <CustomText style={styles.genreText}>{item.name}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(18, 18, 18, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "85%",
    height: "70%",
    backgroundColor: Colors.black,
    borderRadius: 18,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: Colors.primary,
  },
  genreListContainer: {
    width: "100%",
    flexGrow: 0,
    flexShrink: 1,
    maxHeight: "80%",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: Colors.primaryDark,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  closeButtonText: {
    color: Colors.gray400,
    fontSize: 18,
    fontWeight: "bold",
  },
  genreItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 6,
    width: "100%",
    alignItems: "center",
  },
  genreItemSelected: {
    backgroundColor: "rgba(142, 68, 173, 0.3)",
  },
  genreText: {
    fontSize: 18,
    color: Colors.gray400,
  },
});

export default GenreModal;
