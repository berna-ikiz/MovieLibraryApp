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
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);
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
    }
  }, [favorites]);

  return (
    <View style={styles.container}>
      <TabSelector
        searchText={searchText}
        setSearchText={setSearchText}
        dataSearch={searchResults as MovieType[]}
        dataFilter={filteredMovies as MovieType[]}
        renderItemSearch={renderItem}
        renderItemFilter={renderItem}
        onFilterChange={async (genresSelected, ratingSelected) => {
          setSelectedGenres(genresSelected);
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
  console.log("render Item", item);
  return (
    <TouchableOpacity
      style={styles.searchCard}
      onPress={() => navigation.navigate("Details", { movieId: item.id })}
    >
      {item.poster_path ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.poster, styles.noImageIconContainer]}>
          <Icon name="movie-roll" size={40} color={Colors.gray800} />
        </View>
      )}
      <Text style={styles.movieTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
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
  poster: {
    width: "50%",
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
});
