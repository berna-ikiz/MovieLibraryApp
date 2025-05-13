import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/movieApi";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../state/slices/moviesSlice";
import { FlatList } from "react-native-gesture-handler";
import { RootState } from "../state/movieStore";
import { MovieType } from "../utils/movieType";
import Colors from "../utils/colors";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.moviesData.movies);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchPopularMovies(page);
        dispatch(setMovies({ movies: data.movies }));
      } catch (error) {
        //TODO: Toast message
        console.error("API error", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [page]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => RenderItem({ item })}
      />
    </View>
  );
};

const RenderItem = ({ item }: { item: MovieType }) => {
  console.log({ item });
  return (
    <View style={styles.movieItemContainer}>
      <View style={styles.movieCard}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.movieCardTextContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>{item.release_date}</Text>
        </View>
      </View>
      <View style={styles.movieItemDevider}></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
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
    marginLeft: 16,
    justifyContent: "center",
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    textAlign: "center",
    color: Colors.white,
  },
  movieItemDevider: {
    height: 1,
    backgroundColor: Colors.gray800,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },
});
