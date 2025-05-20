import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../theme/colors";
import { TextInput } from "react-native-gesture-handler";
import {
  fetchGenres,
  fetchMoviesByFilters,
  searchMovies,
} from "../services/movieApi";
import Loading from "../components/Loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { GenreType, MovieType } from "../utils/type/movieType";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GenreModal from "../components/GenreModal";
import RatingModal from "../components/RatingModal";

const SearchScreen = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState<
    { minRating: number | undefined; maxRating: number | undefined } | undefined
  >(undefined);

  const navigation = useNavigation();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchText.trim().length > 1) {
        setIsLoading(true);
        try {
          const results = await searchMovies(searchText);
          setResults(results);
        } catch (error) {
          //TODO toast message
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  useEffect(() => {
    if (activeTab === "filter") {
      const getGenres = async () => {
        const genres = await fetchGenres();
        setGenres(genres);
      };
      getGenres();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "filter") return;
    if (
      selectedGenres.length > 0 ||
      (selectedRating && (selectedRating.minRating || selectedRating.maxRating))
    ) {
      setFilteredMovies([]);
      loadMoreMoviesByFilters(1);
    } else {
      setFilteredMovies([]);
      setCurrentPage(1);
    }
  }, [selectedGenres, selectedRating, activeTab]);

  const toggleGenre = (genre: GenreType) => {
    setSelectedGenres((prev) =>
      prev.some((g) => g.id === genre.id)
        ? prev.filter((g) => g.id !== genre.id)
        : [...prev, genre]
    );
  };
  const loadMoreMoviesByFilters = async (page: number) => {
    if (fetchingMore) return;
    setFetchingMore(true);
    try {
      const genreIds = selectedGenres.map((g) => g.id.toString());
      const minRating = selectedRating?.minRating;
      const maxRating = selectedRating?.maxRating;

      const newMovies = await fetchMoviesByFilters(
        genreIds,
        page,
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
      setCurrentPage(page);
    } catch (error) {
      //TODO toast message
      console.log("Load more error", error);
    } finally {
      setFetchingMore(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab("search")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "search" && styles.activeTabText,
            ]}
          >
            Search
          </Text>
          {activeTab === "search" && <View style={styles.underline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab("filter")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "filter" && styles.activeTabText,
            ]}
          >
            Filter
          </Text>
          {activeTab === "filter" && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {activeTab === "search" && (
          <>
            <TextInput
              style={styles.input}
              placeholder="search movie"
              value={searchText}
              onChangeText={setSearchText}
            />
            {isLoading && <Loading title={""} />}
            <FlatList
              data={results}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => renderItem({ item, navigation })}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
        {activeTab === "filter" && (
          <>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.filterCard}
                onPress={() => setShowGenreModal(true)}
              >
                <MaterialIcons
                  name="category"
                  size={24}
                  color={Colors.white}
                  style={styles.icon}
                />
                <Text style={styles.filterCardText}>Genres</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterCard}
                onPress={() => setShowRatingModal(true)}
              >
                <MaterialIcons
                  name="star-rate"
                  size={24}
                  color={Colors.white}
                  style={styles.icon}
                />
                <Text style={styles.filterCardText}>
                  {selectedRating?.minRating || selectedRating?.maxRating
                    ? `${selectedRating?.minRating ?? 0} - ${
                        selectedRating?.maxRating ?? 0
                      }`
                    : "Rating"}
                </Text>
              </TouchableOpacity>
            </View>
            {filteredMovies.length > 0 && (
              <FlatList
                data={filteredMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderItem({ item, navigation })}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                onEndReached={() => loadMoreMoviesByFilters(currentPage + 1)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  fetchingMore ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : null
                }
              />
            )}
            <RatingModal
              visible={showRatingModal}
              onClose={() => setShowRatingModal(false)}
              onSelectRating={setSelectedRating}
            />
            <GenreModal
              visible={showGenreModal}
              onClose={() => setShowGenreModal(false)}
              genres={genres}
              selectedGenres={selectedGenres}
              onSelectGenre={toggleGenre}
            />
          </>
        )}
      </View>
    </View>
  );
};

const renderItem = ({ item, navigation }: any) => {
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

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: 50,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabText: {
    fontSize: 20,
    color: Colors.white,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  underline: {
    height: 3,
    backgroundColor: Colors.primary,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  content: { marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 6,
    color: Colors.gray400,
    fontSize: 20,
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    padding: 5,
    marginTop: -15,
  },
  filterCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray800,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    minWidth: 140,
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  filterCardText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
