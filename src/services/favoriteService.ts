import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { setFavorite } from "../state/slices/favoritesSlice";

export const fetchUserFavorites = async (userId: string, dispatch: any) => {
  const q = query(collection(db, "favorites"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  const favorites = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.movieId,
      title: data.title,
      poster_path: data.poster_path,
      genres: data.genres?.split(",") ?? [],
    };
  });

  dispatch(setFavorite(favorites));
};
