import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/movieApi";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchPopularMovies(page);
        console.log(data);
      } catch (error) {
        //TODO: Toast message
        console.error("API error", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  });
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
