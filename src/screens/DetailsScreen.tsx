import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { MovieDetailType, RootStackParamList } from "../utils/movieType";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../utils/colors";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchMovieDetails } from "../services/movieApi";
import Loading from "../components/Loading";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;
type Props = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen = ({ route }: Props) => {
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const { movieId } = route.params;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data.movieDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (isloading) {
    return <Loading title={""} />;
  }

  const releaseYear = movie?.release_date?.split("-")[0] || "N/A";

  return (
    <View style={styles.container}>
      {movie && (
        <>
          <Header title={movie.title} showBackButton={true} />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.poster}
          />
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.voteContainer}>
            <Icon name="heart-outline" size={34} color={Colors.primaryDark} />
            <Text style={styles.voteText}>
              {movie.vote_average} / {releaseYear}
            </Text>
          </View>
          <ScrollView
            style={styles.descriptionScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <Text style={styles.description}>{movie.overview}</Text>
          </ScrollView>
        </>
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
});
