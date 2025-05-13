import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../utils/movieType";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../utils/colors";
import Header from "../components/Header";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;
type Props = {
  route: DetailsScreenRouteProp;
};
const DetailsScreen = ({ route }: Props) => {
  const { movie } = route.params;
  const releaseYear = movie.release_date?.split("-")[0] || "N/A";

  return (
    <View style={styles.container}>
      <Header title={movie.title} showBackButton={true} />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.poster}
      />
      <Text>{movie.title}</Text>
      <Text>{movie.vote_avarage}</Text>
      <Text>{releaseYear}</Text>
      <ScrollView
        style={styles.descriptionScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.description}>{movie.overview}</Text>
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
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.black,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.primaryDark,
    fontWeight: "bold",
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
  },
});
