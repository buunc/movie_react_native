import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { fetchTVSeries } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import MovieCard from "./MovieCard";

const TvSeries = () => {
  const { data: movies, loading, error } = useFetch(() => fetchTVSeries());

  if (error) {
    return null;
  }

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="mt-10 self-center"
      />
    );
  }

  return (
    <>
      <Text className="text-lg text-white font-bold mb-3">
        Latest TV Series
      </Text>

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-2 pb-32"
        scrollEnabled={false}
      />
    </>
  );
};

export default TvSeries;
