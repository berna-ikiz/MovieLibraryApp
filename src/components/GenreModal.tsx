import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatListComponent,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { GenreType } from "../utils/type/movieType";
import { FlatList } from "react-native-gesture-handler";
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
          <FlatList
            data={genres}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              renderGenreItem({ item, selectedGenres, onSelectGenre })
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
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
  const isSelected = (genre: GenreType) =>
    selectedGenres.some((g) => g.id === genre.id);

  const selected = isSelected(item);
  console.log(selected);
  return (
    <TouchableOpacity
      style={[styles.genreItem, selected && styles.genreItemSelected]}
      onPress={() => onSelectGenre(item)}
    >
      <Text style={[styles.genreText, selected && styles.genreItemSelected]}>
        {item.name}
      </Text>
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
    backgroundColor: Colors.black,
    maxHeight: "70%",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: Colors.gray500,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  genreItem: {
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  genreText: {
    fontSize: 18,
    color: Colors.white,
  },
  genreTextSelected: {
    color: Colors.white,
    fontWeight: "bold",
  },
  genreItemSelected: {
    backgroundColor: Colors.primary,
  },
});

export default GenreModal;
