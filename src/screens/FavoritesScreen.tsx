import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TabSelector from "../components/TabSelector";
import Colors from "../theme/colors";
import {
  FavoriteMovieType,
  GenreType,
  MovieType,
} from "../utils/type/movieType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/movieStore";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { removeLikedMovie } from "../services/favoriteService";
import { removeFavorite } from "../state/slices/favoritesSlice";
import AppIcon from "../assets/icons";
import { CustomText } from "../theme/fontContext";
import Toast from "react-native-toast-message";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<FavoriteMovieType[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<FavoriteMovieType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreType | null>(null);
  const [selectedRating, setSelectedRating] = useState<{
    minRating?: number;
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const user = useSelector((state: RootState) => state.auth.currentUser);

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
    const searchedFavoriteMovies = favorites.filter((item) => {
      const matchesGenre = selectedGenre
        ? item.genres?.includes(selectedGenre.name)
        : true;

      const matchesRating =
        selectedRating?.minRating !== undefined
          ? item.vote_average > selectedRating.minRating
          : true;

      return matchesGenre && matchesRating;
    });

    setFilteredMovies(searchedFavoriteMovies);
  }, [selectedGenre, selectedRating, favorites]);

  return (
    <View style={styles.container}>
      <TabSelector
        searchText={searchText}
        setSearchText={setSearchText}
        dataSearch={searchResults as MovieType[]}
        dataFilter={filteredMovies as MovieType[]}
        renderItemSearch={({ item }) => (
          <RenderItem item={item} navigation={navigation} user={user} />
        )}
        renderItemFilter={({ item }) => (
          <RenderItem item={item} navigation={navigation} user={user} />
        )}
        onFilterChange={async (genreSelected, ratingSelected) => {
          setSelectedGenre(genreSelected);
          setSelectedRating(ratingSelected);
        }}
        isLoading={isLoading}
        onEndReachedThreshold={0.5}
        numColumns={1}
      />
    </View>
  );
};

const RenderItem = ({ item, navigation, user }: any) => {
  const dispatch = useDispatch();
  const [isFavorite] = useState(true);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const releaseYear = item.release_date?.split("-")[0] || "";

  const animatedItemStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  const handleRemoveFavorite = async () => {
    if (!user || !item) return;
    if (isFavorite) {
      try {
        await removeLikedMovie(user.uid, item.id);
        dispatch(removeFavorite(item.id));
      } catch (error) {
        Toast.show({
          type: "info",
          text1: "Failed to remove from favorites.",
          text2: "Please try again.",
          position: "top",
          visibilityTime: 3000,
        });
      }
    }
  };

  const handleFavorite = () => {
    heartScale.value = withSequence(
      withTiming(0.7, { duration: 100 }),
      withTiming(1.2, { duration: 100 }),
      withTiming(0.7, { duration: 100 })
    );

    opacity.value = withTiming(0, { duration: 400 });
    scale.value = withTiming(0.9, { duration: 400 }, () => {
      runOnJS(handleRemoveFavorite)();
    });
  };

  return (
    <Animated.View style={[styles.movieItemContainer, animatedItemStyle]}>
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
            <CustomText style={styles.title}>{item.title}</CustomText>
            <CustomText style={styles.year}>{releaseYear}</CustomText>
          </View>
          <Animated.View style={animatedHeartStyle}>
            <TouchableOpacity onPress={handleFavorite}>
              {isFavorite ? (
                <AppIcon
                  name="heart"
                  size={40}
                  color={Colors.primary}
                  style={styles.heartIcon}
                />
              ) : (
                <AppIcon
                  name="heart-outline"
                  size={40}
                  color={Colors.primary}
                  style={styles.heartIcon}
                />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableOpacity>
      <View style={styles.movieItemDevider}></View>
    </Animated.View>
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
