import { fetchRecommendationsMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import SimpleCard from "./SimpleCard";

interface Recommendations {
  id: string;
}

const Recommendations = ({ id }: Recommendations) => {
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchRecommendationsMovies(id));

  if (error) {
    return (
      <Text className="text-red-500 text-center mt-4">
        Failed to load recommendations movies.
      </Text>
    );
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
    <View className="flex-1">
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Recommendations Movies
      </Text>
      <FlatList
        data={movies ?? []}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4" />}
        className="mb-4 mt-3"
        renderItem={({ item }) => <SimpleCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">
            Recommendations Movies not found
          </Text>
        }
      />
    </View>
  );
};

export default Recommendations;
