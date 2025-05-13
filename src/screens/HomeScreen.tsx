import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/movieApi";
import { useDispatch, useSelector } from "react-redux";
import { appendMovies, setMovies } from "../state/slices/moviesSlice";
import { FlatList } from "react-native-gesture-handler";
import { RootState } from "../state/movieStore";
import { MovieType } from "../utils/movieType";
import Colors from "../utils/colors";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.moviesData.movies);

  useEffect(() => {
    const loadInitialMovies = async () => {
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
    loadInitialMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (fetchingMore) return;
    setFetchingMore(true);
    try {
      const nextPage = page + 1;
      const data = await fetchPopularMovies(nextPage);
      dispatch(appendMovies({ movies: data.movies }));
      console.log(data);
      setPage(nextPage);
    } catch (error) {
      //TODO toast message
      console.error("Load more error", error);
    } finally {
      setFetchingMore(false);
    }
  };

  const load = () => {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  };

  if (loading) {
    load();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => RenderItem({ item })}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={fetchingMore ? load() : null}
      />
    </View>
  );
};

const RenderItem = ({ item }: { item: MovieType }) => {
  const releaseYear = item.release_date?.split("-")[0] || "N/A";
  return (
    <View style={styles.movieItemContainer}>
      <View style={styles.movieCard}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.movieCardTextContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>{releaseYear}</Text>
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
