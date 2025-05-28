import React from "react";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Modal from "react-native-modal";
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
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const GenreModal = ({
  visible,
  onClose,
  genres,
  selectedGenre,
  onSelectGenre,
}: Props) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.9}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      style={styles.modal}
    >
      <View style={styles.modalView}>
        <CustomText style={styles.modalTitle}>Select Genres</CustomText>
        <View style={styles.genreListContainer}>
          {genres.length === 0 ? (
            <CustomText style={{ color: Colors.gray400, textAlign: "center" }}>
              No genres found.
            </CustomText>
          ) : (
            <FlatList
              data={genres}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) =>
                renderGenreItem({ item, selectedGenre, onSelectGenre })
              }
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <CustomText style={styles.closeButtonText}>Close</CustomText>
        </TouchableOpacity>
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
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    elevation: 10,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: width * 0.8,
    height: height * 0.8,
    borderRadius: 18,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
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
    flex: 1,
    maxHeight: 300,
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
