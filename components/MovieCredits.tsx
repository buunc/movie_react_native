import { View, Text, FlatList } from "react-native";
import { fetchMovieCredits } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import SimpleCard from "./SimpleCard";

const MovieCredits = ({ id }: { id: string }) => {
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovieCredits(id));

  if (error || loading || !movies) {
    return <></>;
  }

  return (
    <View className="flex-1 mx-5">
      <Text className="text-lg text-accent font-bold mt-5 mb-3">
        Movies Credit
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
            Movies credits not found
          </Text>
        }
      />
    </View>
  );
};

export default MovieCredits;
