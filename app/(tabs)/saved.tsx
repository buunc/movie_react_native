import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { useFetch } from "@/services/useFetch";
import { getSavedMovies } from "@/services/appwrite";
import SavedCard from "@/components/SavedCard";
import UnSaveButton from "@/components/UnSaveButton";
import SearchBar from "@/components/SearchBar";
import { unSaveMovie } from "@/services/appwrite";
import Toast from "react-native-toast-message";
import { SavedMovie } from "@/interfaces/interfaces";

const Saved = () => {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<SavedMovie[]>([]);
  const [searchMovies, setSearchMovie] = useState<SavedMovie[]>([]);

  const { data, loading, error, refetch } = useFetch(() =>
    getSavedMovies(user.$id)
  );

  const handleSearchMovies = (searchTerm: string) => {
    return (
      movies?.filter((movie: SavedMovie) => {
        return movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }) || []
    );
  };

  const handleRemove = async (movie_id: number) => {
    try {
      await unSaveMovie(movie_id, user.$id);
      setMovies((prev) => prev.filter((movie) => movie.movie_id !== movie_id));
      setSearchMovie((prev) =>
        prev.filter((movie) => movie.movie_id !== movie_id)
      );
      Toast.show({
        type: "success",
        text1: "Movie removed",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to remove movie",
      });
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setMovies(data);
      setSearchMovie(data);
    }
  }, [data]);

  useEffect(() => {
    const result = handleSearchMovies(searchQuery);
    setSearchMovie(result);
  }, [searchQuery]);

  useFocusEffect(
    useCallback(() => {
      if (user.$id) refetch();
    }, [user.$id])
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={searchMovies}
        renderItem={({ item }) => (
          <View className="relative w-[30%]">
            <SavedCard movie={item} />
            <UnSaveButton onRemove={() => handleRemove(item.movie_id)} />
          </View>
        )}
        keyExtractor={(item) => item.movie_id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />

              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="my-3"
                />
              )}

              {error && (
                <Text className="text-red-500 px-5 my-3">
                  Error: {error.message}
                </Text>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                Saved movies will be display here!
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Saved;
