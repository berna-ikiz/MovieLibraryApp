import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../theme/colors";
import { TextInput } from "react-native-gesture-handler";
import { searchMovies } from "../services/movieApi";
import Loading from "../components/Loading";

const SearchScreen = () => {
  const [activeTab, setActiveTab] = useState("Search");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchText.trim().length > 1) {
        setIsLoading(true);
        try {
          const results = await searchMovies(searchText);
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
          </>
        )}
        {activeTab === "filter" && (
          <Text style={styles.tabText}>Filter UI here</Text>
        )}
      </View>
    </View>
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
});
