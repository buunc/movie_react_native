import { fetchCast } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { FlatList, Text, View } from "react-native";
import CastCard from "./CastCard";

const Cast = ({ id }: { id: string }) => {
  const { data: cast, loading, error } = useFetch(() => fetchCast(id));

  if (error) {
    return (
      <Text className="text-red-500 text-center mt-4">
        Failed to load recommendations movies.
      </Text>
    );
  }

  if (loading) {
    return <></>;
  }

  return (
    <View className="flex-1">
      <Text className="text-lg text-white font-bold mt-5 mb-3">Cast</Text>
      <FlatList
        data={cast ?? []}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4" />}
        className="mb-4 mt-3"
        renderItem={({ item }) => <CastCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">Cast not found</Text>
        }
      />
    </View>
  );
};

export default Cast;
