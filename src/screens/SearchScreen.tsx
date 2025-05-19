import {
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
import { getGenres, searchMovies } from "../services/movieApi";
import Loading from "../components/Loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { GenreType, MovieType } from "../utils/type/movieType";

const SearchScreen = () => {
  const [activeTab, setActiveTab] = useState("Search");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchText.trim().length > 1) {
        setIsLoading(true);
        try {
          const results = await searchMovies(searchText);
          setResults(results);
          console.log(results);
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
      const fetchGenres = async () => {
        const genres = await getGenres();
        console.log(genres);
        setGenres(genres);
      };
      fetchGenres();
      console.log("genres", genres);
    }
  }, [activeTab]);

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
          <Text style={styles.tabText}>Filter UI here</Text>
        )}
      </View>
    </View>
  );
};

const renderItem = ({ item, navigation }: any) => {
  console.log(item);
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
});
