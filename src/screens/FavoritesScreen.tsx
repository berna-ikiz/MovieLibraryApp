import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import TabSelector from "../components/TabSelector";
import Colors from "../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  FavoriteMovieType,
  GenreType,
  MovieType,
} from "../utils/type/movieType";
import { useSelector } from "react-redux";
import { RootState } from "../state/movieStore";

const FavoritesScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<FavoriteMovieType[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<FavoriteMovieType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreType | null>(null);
  const [selectedRating, setSelectedRating] = useState<{
    minRating?: number;
    maxRating?: number;
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  useEffect(() => {
    if (favorites) {
      setSearchResults(favorites);
      setFilteredMovies(favorites);
    }
  }, [favorites]);

  useEffect(() => {
    if (searchText.trim().length > 1) {
      setIsLoading(true);

      const searchedFavoriteMovies = favorites.filter((item) => {
        return item.title
          .toLocaleLowerCase()
          .includes(searchText.toLowerCase());
      });
      if (searchedFavoriteMovies) {
        setIsLoading(false);
        setSearchResults(searchedFavoriteMovies);
      }
    } else {
      setSearchResults(favorites);
    }
  }, [searchText]);

  useEffect(() => {
    setFilteredMovies([]);
    if (
      selectedGenre ||
      selectedRating?.minRating ||
      selectedRating?.maxRating
    ) {
      const searchedFavoriteMovies = favorites.filter((item) => {
        return (
          (selectedRating?.minRating &&
            item.vote_average > selectedRating?.minRating) ||
          (selectedRating?.maxRating &&
            item.vote_average < selectedRating?.maxRating)
        );
      });
      setFilteredMovies(searchedFavoriteMovies);
    } else {
      setFilteredMovies(favorites);
    }
  }, [selectedGenre, selectedRating]);

  return (
    <View style={styles.container}>
      <TabSelector
        searchText={searchText}
        setSearchText={setSearchText}
        dataSearch={searchResults as MovieType[]}
        dataFilter={filteredMovies as MovieType[]}
        renderItemSearch={renderItem}
        renderItemFilter={renderItem}
        onFilterChange={async (genreSelected, ratingSelected) => {
          setSelectedGenre(genreSelected);
          setSelectedRating(ratingSelected);
        }}
        isLoading={isLoading}
        navigation={navigation}
        onEndReachedThreshold={0.5}
        numColumns={1}
      />
    </View>
  );
};

const renderItem = ({ item, navigation }: any) => {
  const releaseYear = item.release_date?.split("-")[0] || "N/A";
  return (
    <View style={styles.movieItemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { movieId: item.id })}
      >
        <View style={styles.movieCard}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.poster}
          />
          <View style={styles.movieCardTextContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.year}>{releaseYear}</Text>
          </View>
          <TouchableOpacity>
            <Icon
              name={"heart"}
              size={40}
              color={Colors.primary}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={styles.movieItemDevider}></View>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  searchCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: Colors.black,
    overflow: "hidden",
    alignItems: "center",
  },
  movieTitle: {
    color: Colors.gray300,
    fontSize: 20,
    padding: 8,
    textAlign: "center",
  },
  noImageIconContainer: {
    borderWidth: 1,
    borderColor: Colors.gray700,
    alignItems: "center",
    justifyContent: "center",
  },
  movieItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  movieCard: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  movieCardTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  year: {
    color: Colors.gray500,
    fontSize: 14,
    textAlign: "center",
  },
  heartIcon: { paddingHorizontal: 10 },
  movieItemDevider: {
    height: 1,
    backgroundColor: Colors.gray800,
    marginTop: 10,
  },
});
