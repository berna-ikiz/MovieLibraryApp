import React from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { GenreType } from "../utils/type/movieType";
import Colors from "../theme/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  genres: GenreType[];
  selectedGenres: GenreType[];
  onSelectGenre: (genre: GenreType) => void;
};

const GenreModal = (Props: Props) => {
  const { visible, onClose, genres, selectedGenres, onSelectGenre }: Props =
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
          <Text style={styles.modalTitle}>Select Genres</Text>
          <View style={styles.genreListContainer}>
            <FlatList
              data={genres}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) =>
                renderGenreItem({ item, selectedGenres, onSelectGenre })
              }
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const renderGenreItem = ({
  item,
  selectedGenres,
  onSelectGenre,
}: {
  item: GenreType;
  selectedGenres: GenreType[];
  onSelectGenre: (genre: GenreType) => void;
}) => {
  const isSelected = selectedGenres.some((g) => g.id === item.id);
  return (
    <TouchableOpacity
      style={[styles.genreItem, isSelected && styles.genreItemSelected]}
      onPress={() => onSelectGenre(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.genreText}>{item.name}</Text>
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
    backgroundColor: "rgba(142, 68, 173, 0.2)",
  },
  genreText: {
    fontSize: 18,
    color: Colors.gray400,
  },
});

export default GenreModal;
