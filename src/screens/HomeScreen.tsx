import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/movieService";
import { useDispatch, useSelector } from "react-redux";
import { appendMovies, clearMovies } from "../state/slices/moviesSlice";
import { FlatList } from "react-native";
import { RootState } from "../state/movieStore";
import { MovieType } from "../utils/type/movieType";
import Colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { RootStackParamList } from "../utils/type/authType";
import { TMDB_CONFIG } from "../utils/constants/constants";
import { CustomText } from "../theme/fontContext";
import Toast from "react-native-toast-message";

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.moviesData.movies);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const showErrorToast = (message: string) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: message,
      position: "top",
      visibilityTime: 4000,
    });
  };

  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const initialPage = TMDB_CONFIG.MAX_PAGES
          ? Math.floor(Math.random() * TMDB_CONFIG.MAX_PAGES) + 1
          : 1;
        setPage(initialPage);
        const data = await fetchPopularMovies(initialPage);
        if (!data) {
          showErrorToast("Failed to load movies. Please try again.");
          return;
        }
        dispatch(appendMovies({ movies: data.movies }));
      } catch (error) {
        showErrorToast("Something went wrong.");
      } finally {
        setIsLoading(false);
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
      if (!data) {
        showErrorToast("Failed to refresh movies. Please try again.");
        return;
      }
      dispatch(appendMovies({ movies: data.movies }));
      setPage(nextPage);
    } catch (error) {
      showErrorToast("Something went wrong.");
    } finally {
      setFetchingMore(false);
    }
  };

  const loadRefreshingMovies = async (page: number) => {
    try {
      const data = await fetchPopularMovies(page);
      if (!data) {
        showErrorToast("Failed to load more movies. Please try again.");
        return;
      }
      dispatch(clearMovies());
      dispatch(appendMovies({ movies: data.movies }));
    } catch (error) {
      showErrorToast("Something went wrong.");
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    try {
      //Because API only allow 500 pages.
      const newPage = TMDB_CONFIG.MAX_PAGES
        ? Math.floor(Math.random() * TMDB_CONFIG.MAX_PAGES) + 1
        : 1;
      await loadRefreshingMovies(newPage);
    } catch (error) {
      console.log("Refresh failed:", error);
    }
  };

  if (isLoading) {
    return <Loading title="🎬 Movie Library" />;
  }

  return (
    <View style={styles.container}>
      <Header title="🎬 Movie Library" showBackButton={false} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => RenderItem({ item, navigation })}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={
          fetchingMore ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : null
        }
      />
    </View>
  );
};

const RenderItem = ({
  item,
  navigation,
}: {
  item: MovieType;
  navigation: HomeScreenNavigationProp;
}) => {
  const releaseYear = item.release_date?.split("-")[0] || "";
  return (
    <View style={styles.movieItemContainer}>
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
        </View>
      </TouchableOpacity>
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
