import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { castMemberType, MovieDetailType } from "../utils/type/movieType";
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";
import Colors from "../theme/colors";
import Header from "../components/Header";
import { fetchCastDetails, fetchMovieDetails } from "../services/movieService";
import Loading from "../components/Loading";
import { RootStackParamList } from "../utils/type/authType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/movieStore";
import { addLikedMovie, removeLikedMovie } from "../services/favoriteService";
import { addFavorite, removeFavorite } from "../state/slices/favoritesSlice";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import AppIcon from "../assets/icons";
import { CustomText } from "../theme/fontContext";
import Toast from "react-native-toast-message";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;
type Props = {
  route: DetailsScreenRouteProp;
};

const { width, height } = Dimensions.get("window");

const DetailsScreen = ({ route }: Props) => {
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [cast, setCast] = useState<castMemberType[] | []>([]);
  const [isloading, setIsLoading] = useState(true);
  const { movieId } = route.params;
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorite = favorites.some((fav) => fav.id === movieId);
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch();
  const releaseYear = movie?.release_date?.split("-")[0] || "";
  const heartScale = useSharedValue(1);
  const posterHeartOpacity = useSharedValue(0);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        const castData = await fetchCastDetails(movieId);

        if (!movieData || !castData) {
          Toast.show({
            type: "info",
            text1: "Failed to refresh movies. Please try again.",
            position: "top",
            visibilityTime: 3000,
          });
          return;
        }
        setMovie(movieData.movieDetails);
        setCast(castData.castData);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to fetch movie details:", error);
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const handleAddRemoveFavorite = async () => {
    if (!user || !movie) return;
    try {
      if (isFavorite) {
        await removeLikedMovie(user.uid, movieId);
        dispatch(removeFavorite(movieId));
      } else {
        await addLikedMovie(user.uid, movie);
        dispatch(
          addFavorite({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            genres: movie.genres?.join(","),
            release_date: releaseYear,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
          })
        );
      }
    } catch (error) {
      Toast.show({
        type: "info",
        text1: "Failed to update favorites.",
        text2: "Please try again.",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const handleFavorite = () => {
    heartScale.value = withSequence(
      withTiming(0.7, { duration: 100 }),
      withTiming(1.2, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    handleAddRemoveFavorite();
  };

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      posterHeartOpacity.value = 0; // Reset animation
      runOnJS(handleAddRemoveFavorite)();

      if (!isFavorite) {
        posterHeartOpacity.value = withSequence(
          withTiming(1, { duration: 200 }),
          withTiming(1, { duration: 1600 }),
          withTiming(0, { duration: 200 })
        );
      }
    });

  const animatedPosterHeartStyle = useAnimatedStyle(() => {
    const scale =
      posterHeartOpacity.value === 1
        ? withTiming(1.2, { duration: 200 })
        : withTiming(1, { duration: 200 });

    return {
      opacity: posterHeartOpacity.value,
      transform: [{ translateX: -27 }, { translateY: -27 }, { scale }],
    };
  });

  if (isloading) {
    return <Loading title={""} />;
  }

  return (
    <View style={styles.container}>
      {movie && <Header title={movie.title} showBackButton={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {movie && (
          <ScrollView>
            <GestureDetector gesture={doubleTap}>
              <Animated.View>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  }}
                  style={styles.poster}
                  resizeMode="cover"
                />
                {isFavorite && (
                  <Animated.View
                    style={[styles.heartContainer, animatedPosterHeartStyle]}
                    entering={ZoomIn.duration(400).easing(Easing.ease)}
                    exiting={ZoomOut.duration(400).easing(Easing.ease)}
                  >
                    <AppIcon
                      name="heart"
                      size={54}
                      color={"rgba(220, 185, 235, 0.8)"}
                    />
                  </Animated.View>
                )}
              </Animated.View>
            </GestureDetector>
            <View style={styles.voteContainer}>
              <Animated.View style={animatedHeartStyle}>
                <TouchableOpacity onPress={handleFavorite}>
                  {isFavorite ? (
                    <AppIcon name="heart" size={34} color={Colors.primary} />
                  ) : (
                    <AppIcon
                      name="heart-outline"
                      size={34}
                      color={Colors.primary}
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>
              <View style={styles.voteInfo}>
                <CustomText style={styles.voteText}>
                  ⭐ {movie.vote_count?.toLocaleString()}
                </CustomText>
                <CustomText style={styles.voteSubText}>
                  {" "}
                  / {releaseYear}
                </CustomText>
              </View>
            </View>
            {cast && (
              <FlatList
                data={movie.genres}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.genreBox}>
                    <CustomText style={styles.genreText}>
                      {item.name}
                    </CustomText>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            )}
            <View style={styles.descriptionBox}>
              <CustomText
                style={
                  movie.overview
                    ? styles.description
                    : [styles.description, styles.noDescription]
                }
              >
                {movie.overview
                  ? movie.overview
                  : "This movie does not have a description available."}
              </CustomText>
              {cast && (
                <>
                  <CustomText style={styles.castTitle}>Cast</CustomText>
                  <View style={styles.divider} />
                  <FlatList
                    data={cast}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.castScroll}
                    renderItem={({ item }) => (
                      <View style={styles.castItem}>
                        <Image
                          source={
                            item.profile_path
                              ? {
                                  uri: `https://image.tmdb.org/t/p/w185${item.profile_path}`,
                                }
                              : require("../assets/no-image.webp")
                          }
                          style={styles.castImage}
                          resizeMode="cover"
                        />
                        <CustomText style={styles.castName} numberOfLines={1}>
                          {item.name}
                        </CustomText>
                      </View>
                    )}
                  />
                </>
              )}
            </View>
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  poster: {
    width: width,
    height: height * 0.5,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 10,
  },
  heartContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionBox: {
    flex: 1,
    backgroundColor: "rgba(37, 35, 38, 0.7)",
    overflow: "hidden",
    margin: 4,
    borderRadius: 20,
    paddingBottom: 14,
  },
  description: {
    color: Colors.gray400,
    lineHeight: 24,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 16,
    marginHorizontal: 10,
    fontWeight: "300",
    letterSpacing: 1,
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  noDescription: {
    textAlign: "center",
    color: Colors.gray600,
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  voteText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 34,
  },
  voteSubText: {
    color: Colors.gray600,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 34,
  },
  voteInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 12,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 5,
    gap: 5,
  },
  genreScroll: {
    marginVertical: 5,
    paddingLeft: 16,
    maxHeight: 40,
    minHeight: 40,
  },
  genreBox: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  genreText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  castScroll: { paddingLeft: 16 },
  castItem: {
    alignItems: "center",
    width: 100,
  },
  castImage: {
    width: 70,
    height: 100,
    borderRadius: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
  castName: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  castTitle: {
    color: Colors.primaryDark,
    fontSize: 24,
    fontWeight: "900",
    paddingHorizontal: 16,
    marginTop: 10,
    marginLeft: 16,
    marginBottom: 2,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.primaryDark,
    marginHorizontal: 8,
    marginBottom: 16,
    opacity: 0.6,
  },
});
