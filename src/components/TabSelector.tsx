import React, { useState, useEffect, JSX, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import Loading from "../components/Loading";
import GenreModal from "../components/GenreModal";
import RatingModal from "../components/RatingModal";
import Colors from "../theme/colors";
import { GenreType, MovieType } from "../utils/type/movieType";
import { fetchGenres } from "../services/movieService";
import AppIcon from "../assets/icons";
import { CustomText } from "../theme/fontContext";
import { Fonts } from "../theme/fonts";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/movieStore";
import { setGenres } from "../state/slices/moviesSlice";
import { Dimensions } from "react-native";
import { DEFAULT_MAX_RATING } from "../utils/constants/constants";

type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
  dataSearch: MovieType[];
  dataFilter: MovieType[];
  renderItemSearch: ({ item, navigation }: any) => JSX.Element;
  renderItemFilter: ({ item, navigation }: any) => JSX.Element;
  onFilterChange: (
    genres: GenreType | null,
    rating: { minRating?: number } | undefined
  ) => Promise<void>;
  isLoading: boolean;
  loadMoreMoviesByFilters?: () => void;
  loadMoreSearchResults?: () => void;
  fetchingMore?: boolean;
  currentPage?: number;
  onEndReachedThreshold?: number;
  numColumns?: number;
  columnWrapperStyle?: ViewStyle;
};

const { height } = Dimensions.get("window");

const TabSelector = ({
  searchText,
  setSearchText,
  dataSearch,
  dataFilter,
  renderItemSearch,
  renderItemFilter,
  onFilterChange,
  isLoading,
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
  const [selectedGenre, setSelectedGenre] = useState<GenreType | null>(null);
  const [selectedRating, setSelectedRating] = useState<{
    minRating?: number;
  }>();
  const [activeTab, setActiveTab] = useState<"search" | "filter">("search");
  const [headerVisible, setHeaderVisible] = useState(true);
  const prevScrollY = useSharedValue(0);
  const genres = useSelector((state: RootState) => state.moviesData.genres);
  const dispatch = useDispatch();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const SCROLL_THRESHOLD = 20;
      if (currentScrollY <= SCROLL_THRESHOLD && !headerVisible) {
        runOnJS(setHeaderVisible)(true);
      } else if (
        currentScrollY > SCROLL_THRESHOLD &&
        headerVisible &&
        currentScrollY > prevScrollY.value + 5
      ) {
        runOnJS(setHeaderVisible)(false);
      } else if (
        currentScrollY > SCROLL_THRESHOLD &&
        !headerVisible &&
        currentScrollY < prevScrollY.value - 5
      ) {
        runOnJS(setHeaderVisible)(true);
      }

      prevScrollY.value = currentScrollY;
    },
  });

  const headerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(headerVisible ? 0 : -100, {
            duration: 10,
          }),
        },
      ],
      opacity: withTiming(headerVisible ? 1 : 0, {
        duration: 100,
      }),
      height: withTiming(headerVisible ? height * 0.05 : 0, { duration: 100 }),
    };
  }, [headerVisible]);

  const toggleGenre = (genre: GenreType) => {
    if (selectedGenre?.id === genre.id) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
    }
  };

  useEffect(() => {
    const getGenres = async () => {
      if (genres.length === 0) {
        const genres = await fetchGenres();
        dispatch(setGenres(genres));
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    onFilterChange(selectedGenre, selectedRating);
  }, [selectedGenre, selectedRating]);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab("search")}
        >
          <CustomText
            style={[
              styles.tabText,
              activeTab === "search" && styles.activeTabText,
            ]}
          >
            Search
          </CustomText>
          {activeTab === "search" && <View style={styles.underline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab("filter")}
        >
          <CustomText
            style={[
              styles.tabText,
              activeTab === "filter" && styles.activeTabText,
            ]}
          >
            Filter
          </CustomText>
          {activeTab === "filter" && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {activeTab === "search" && (
          <>
            {headerVisible && (
              <Animated.View style={headerStyles}>
                <View style={styles.searchInputContainer}>
                  <AppIcon
                    name="magnify"
                    size={22}
                    color={Colors.primary}
                    style={styles.icon}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="search movie"
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor={Colors.gray500}
                  />
                </View>
              </Animated.View>
            )}
          </>
        )}
        {activeTab === "filter" && (
          <>
            {!showGenreModal && !showRatingModal && (
              <Animated.View style={headerStyles}>
                <View style={styles.filterContainer}>
                  <TouchableOpacity
                    style={styles.filterCard}
                    onPress={() => setShowGenreModal(true)}
                  >
                    <AppIcon
                      name="movie-filter-outline"
                      size={24}
                      color={Colors.white}
                      style={styles.icon}
                    />
                    <CustomText style={styles.filterCardText}>
                      {selectedGenre ? selectedGenre.name : "Genre"}
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.filterCard}
                    onPress={() => setShowRatingModal(true)}
                  >
                    <AppIcon
                      name="star"
                      size={24}
                      color={Colors.white}
                      style={styles.icon}
                    />
                    <CustomText style={styles.filterCardText}>
                      {selectedRating?.minRating
                        ? `${
                            selectedRating?.minRating ?? 0
                          } - ${DEFAULT_MAX_RATING}`
                        : "Rating"}
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
            <RatingModal
              visible={showRatingModal}
              onClose={() => setShowRatingModal(false)}
              initialMinRating={selectedRating?.minRating}
              onSelectRating={setSelectedRating}
            />

            <GenreModal
              visible={showGenreModal}
              onClose={() => setShowGenreModal(false)}
              genres={genres}
              selectedGenre={selectedGenre}
              onSelectGenre={toggleGenre}
            />
          </>
        )}
        {isLoading ? (
          <Loading title={""} />
        ) : (
          !(showGenreModal || showRatingModal) && (
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: headerVisible ? height * 0.02 : 0,
              }}
              data={activeTab === "filter" ? dataFilter : dataSearch}
              keyExtractor={(item) => item.id.toString()}
              renderItem={
                activeTab === "filter" ? renderItemFilter : renderItemSearch
              }
              numColumns={numColumns}
              columnWrapperStyle={
                columnWrapperStyle ? columnWrapperStyle : null
              }
              onScroll={
                showGenreModal || showRatingModal ? undefined : scrollHandler
              }
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                if (
                  activeTab === "search" &&
                  loadMoreSearchResults &&
                  currentPage !== undefined
                ) {
                  loadMoreSearchResults();
                }
                if (
                  activeTab === "filter" &&
                  loadMoreMoviesByFilters &&
                  currentPage !== undefined
                ) {
                  loadMoreMoviesByFilters();
                }
              }}
              scrollEnabled={!showGenreModal && !showRatingModal}
              onEndReachedThreshold={onEndReachedThreshold ?? 0.5}
              ListEmptyComponent={
                <CustomText
                  style={{
                    color: Colors.gray400,
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  {searchText.length > 1
                    ? "No results found"
                    : activeTab === "filter"
                    ? "Filter for movies"
                    : "Search for movies"}
                </CustomText>
              }
              ListFooterComponent={
                fetchingMore ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : null
              }
            />
          )
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
  content: {
    flex: 1,
    marginTop: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 3,
    marginHorizontal: 16,
    marginTop: -10,
  },
  input: {
    flex: 1,
    padding: 8,
    color: Colors.gray400,
    fontSize: 20,
    fontFamily: Fonts.fontFamily.regular,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabSelector;
