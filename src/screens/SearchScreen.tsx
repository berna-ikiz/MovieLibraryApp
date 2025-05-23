import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GenreType, MovieType } from "../utils/type/movieType";
import { fetchMoviesByFilters, searchMovies } from "../services/movieService";
import TabSelector from "../components/TabSelector";
import Colors from "../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreType | null>(null);
  const [selectedRating, setSelectedRating] = useState<{
    minRating?: number;
    maxRating?: number;
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    setCurrentPage(1);
    const delayDebounce = setTimeout(async () => {
      if (searchText.trim().length > 1) {
        setIsLoading(true);
        try {
          const movies = await searchMovies(currentPage, searchText);
          setSearchResults(movies);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  useEffect(() => {
    setFilteredMovies([]);
    setCurrentPage(1);

    if (
      selectedGenre ||
      selectedRating?.minRating ||
      selectedRating?.maxRating
    ) {
      loadMoreMoviesByFilters();
    }
  }, [selectedGenre, selectedRating]);

  const loadMoreMoviesByFilters = async () => {
    if (fetchingMore) return;
    setFetchingMore(true);
    try {
      const genreId = selectedGenre?.id.toString() ?? "";
      const minRating = selectedRating?.minRating;
      const maxRating = selectedRating?.maxRating;
      const nextPage = currentPage + 1;

      const newMovies = await fetchMoviesByFilters(
        genreId,
        nextPage,
        minRating,
        maxRating
      );
      setFilteredMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const uniqueMovies = newMovies.filter(
          (m: MovieType) => !existingIds.has(m.id)
        );
        return [...prev, ...uniqueMovies];
      });

      setCurrentPage(nextPage);
    } catch (error) {
      console.log("Load more error", error);
    } finally {
      setFetchingMore(false);
    }
  };

  const loadMoreSearchResults = async () => {
    if (fetchingMore || isLoading) return;
    setFetchingMore(true);
    try {
      const nextPage = currentPage + 1;
      const moreMovies = await searchMovies(nextPage, searchText);
      if (moreMovies.length > 0) {
        setSearchResults((prev) => [...prev, ...moreMovies]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      //TODO toast
      console.log(error);
    } finally {
      setFetchingMore(false);
    }
  };

  return (
    <View style={styles.container}>
      <TabSelector
        searchText={searchText}
        setSearchText={setSearchText}
        dataSearch={searchResults}
        dataFilter={filteredMovies}
        renderItemSearch={RenderItem}
        renderItemFilter={RenderItem}
        onFilterChange={async (genreSelected, ratingSelected) => {
          setSelectedGenre(genreSelected);
          setSelectedRating(ratingSelected);
        }}
        isLoading={isLoading}
        navigation={navigation}
        loadMoreMoviesByFilters={loadMoreMoviesByFilters}
        loadMoreSearchResults={loadMoreSearchResults}
        fetchingMore={fetchingMore}
        currentPage={currentPage}
        onEndReachedThreshold={0.5}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const RenderItem = ({ item, navigation }: any) => {
  return (
    <TouchableOpacity
      style={styles.filterCard}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  filterCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: Colors.black,
    overflow: "hidden",
    alignItems: "center",
  },
  poster: {
    width: "100%",
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
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default SearchScreen;
