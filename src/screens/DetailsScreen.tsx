import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import { HeartIcon, HeartOutlineIcon } from "../assests/icons";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;
type Props = {
  route: DetailsScreenRouteProp;
};

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
        })
      );
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
      posterHeartOpacity.value = 0; // Reset animasyon
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
      {movie && (
        <>
          <Header title={movie.title} showBackButton={true} />
          <GestureDetector gesture={doubleTap}>
            <Animated.View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
                style={styles.poster}
              />
              {isFavorite && (
                <Animated.View
                  style={[styles.heartContainer, animatedPosterHeartStyle]}
                  entering={ZoomIn.duration(400).easing(Easing.ease)}
                  exiting={ZoomOut.duration(400).easing(Easing.ease)}
                >
                  <HeartIcon size={54} color={"rgba(220, 185, 235, 0.4)"} />
                </Animated.View>
              )}
            </Animated.View>
          </GestureDetector>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.voteContainer}>
            <Animated.View style={animatedHeartStyle}>
              <TouchableOpacity onPress={handleFavorite}>
                {isFavorite ? (
                  <HeartIcon size={34} color={Colors.primary} />
                ) : (
                  <HeartOutlineIcon size={34} color={Colors.primary} />
                )}
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.voteText}>
              {movie.vote_average} / {releaseYear}
            </Text>
          </View>
          {cast && (
            <ScrollView
              horizontal
              style={styles.genreScroll}
              showsHorizontalScrollIndicator={false}
            >
              {movie.genres?.map((genre) => (
                <View style={styles.genreBox} key={genre.id}>
                  <Text
                    style={styles.genreText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {genre.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
          <ScrollView
            style={styles.descriptionScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <Text
              style={movie.overview ? styles.description : styles.noDescription}
            >
              {movie.overview ? movie.overview : "NO DESCRIPTION"}
            </Text>
          </ScrollView>
        </>
      )}
      {cast && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.castScroll}
          >
            {cast.map((person) => (
              <View style={styles.castItem} key={person.id}>
                <Image
                  source={
                    person.profile_path
                      ? {
                          uri: `https://image.tmdb.org/t/p/w185${person.profile_path}`,
                        }
                      : require("../assests/no-image.webp")
                  }
                  style={styles.castImage}
                />
                <Text style={styles.castName} numberOfLines={1}>
                  {person.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
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
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
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
  descriptionScroll: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 6,
  },
  description: {
    color: Colors.white,
    lineHeight: 22,
    marginBottom: 16,
    textAlign: "justify",
  },
  noDescription: {
    textAlign: "center",
    color: Colors.gray800,
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: Colors.gray800,
    textShadowOffset: { width: 0, height: 2 },
    opacity: 0.4,
    marginTop: 80,
  },
  voteText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 34,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginRight: 10,
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
    borderRadius: 20,
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
});
