import React, { useState, useEffect, JSX } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Loading from "../components/Loading";
import GenreModal from "../components/GenreModal";
import RatingModal from "../components/RatingModal";
import Colors from "../theme/colors";
import { GenreType, MovieType } from "../utils/type/movieType";
import { fetchGenres } from "../services/movieService";

type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
  dataSearch: MovieType[];
  dataFilter: MovieType[];
  renderItemSearch: ({ item, navigation }: any) => JSX.Element;
  renderItemFilter: ({ item, navigation }: any) => JSX.Element;
  onFilterChange: (
    genres: GenreType[],
    rating: { minRating?: number; maxRating?: number } | undefined
  ) => Promise<void>;
  isLoading: boolean;
  navigation: any;
  loadMoreMoviesByFilters?: () => void;
  loadMoreSearchResults?: () => void;
  fetchingMore?: boolean;
  currentPage?: number;
  onEndReachedThreshold?: number;
  numColumns?: number;
  columnWrapperStyle?: ViewStyle;
};

const TabSelector = ({
  searchText,
  setSearchText,
  dataSearch,
  dataFilter,
  renderItemSearch,
  renderItemFilter,
  onFilterChange,
  isLoading,
  navigation,
  loadMoreMoviesByFilters,
  loadMoreSearchResults,
  fetchingMore,
  currentPage,
  onEndReachedThreshold,
  numColumns,
  columnWrapperStyle,
}: Props) => {
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);
  const [selectedRating, setSelectedRating] = useState<{
    minRating?: number;
    maxRating?: number;
  }>();
  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const [activeTab, setActiveTab] = useState("search");
  const [genres, setGenres] = useState<GenreType[]>([]);

  const toggleGenre = (genre: GenreType) => {
    setSelectedGenres((prev) =>
      prev.some((g) => g.id === genre.id)
        ? prev.filter((g) => g.id !== genre.id)
        : [...prev, genre]
    );
  };

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
    onFilterChange(selectedGenres, selectedRating);
  }, [selectedGenres, selectedRating]);

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
              placeholderTextColor={Colors.gray500}
            />
            {isLoading ? (
              <Loading title={""} />
            ) : (
              <FlatList
                data={dataSearch}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                  renderItemSearch({ item, navigation })
                }
                numColumns={numColumns}
                columnWrapperStyle={
                  columnWrapperStyle ? columnWrapperStyle : null
                }
                showsVerticalScrollIndicator={false}
                onEndReached={() => {
                  if (loadMoreSearchResults && currentPage !== undefined) {
                    loadMoreSearchResults();
                  }
                }}
                onEndReachedThreshold={onEndReachedThreshold}
                ListEmptyComponent={
                  <Text
                    style={{
                      color: Colors.gray400,
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    {searchText.length > 1
                      ? "No results found"
                      : "Filter for movies"}
                  </Text>
                }
              />
            )}
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
            <FlatList
              data={dataFilter}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => renderItemFilter({ item, navigation })}
              numColumns={numColumns}
              columnWrapperStyle={
                columnWrapperStyle ? columnWrapperStyle : null
              }
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                if (loadMoreMoviesByFilters && currentPage !== undefined) {
                  loadMoreMoviesByFilters();
                }
              }}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={
                <Text
                  style={{
                    color: Colors.gray400,
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  {searchText.length > 1
                    ? "No results found"
                    : "Search for movies"}
                </Text>
              }
              ListFooterComponent={
                fetchingMore ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : null
              }
            />
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

export default TabSelector;
