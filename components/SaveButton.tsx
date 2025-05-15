import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { icons } from "@/constants/icons";
import { isMovieSaved } from "@/services/appwrite";
import { saveMovie, unSaveMovie } from "@/services/appwrite";
import Toast from "react-native-toast-message";

const SaveButton = (movie: MovieDetails) => {
  const { user } = useAuth();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (movie?.id && user?.$id) {
      checkSaved();
    }
  }, [movie.id, user.$id]);

  const checkSaved = async () => {
    try {
      const result = await isMovieSaved(movie, user.$id);
      setIsSaved(!!result);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong!",
      });
    }
  };

  const onSaveMovie = async () => {
    try {
      await saveMovie(movie, user.$id);
      setIsSaved(true);
      Toast.show({
        type: "success",
        text1: "Movie Saved",
        text2: `${movie.title} added to your saved list.`,
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not save the movie.",
      });
    }
  };

  const onUnSaveMovie = async () => {
    try {
      await unSaveMovie(movie.id, user.$id);
      setIsSaved(false);
      Toast.show({
        type: "info",
        text1: "Movie Removed",
        text2: `${movie.title} removed from saved list.`,
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not unsave the movie.",
      });
    }
  };

  return (
    <>
      {isSaved ? (
        <TouchableOpacity
          className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2"
          onPress={onUnSaveMovie}
        >
          <Image source={icons.save} className="size-4" tintColor="#AB8BFF" />
          <Text className="text-white font-bold text-sm">Saved</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2"
          onPress={onSaveMovie}
        >
          <Image source={icons.save} className="size-4" tintColor="#fff" />
          <Text className="text-white font-bold text-sm">Save</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default SaveButton;
