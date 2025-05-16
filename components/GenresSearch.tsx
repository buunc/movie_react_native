import { useState, useEffect } from "react";
import { useToggle } from "@/hooks/useToggle";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { fetchGenres } from "@/services/api";
import { Genre } from "@/interfaces/interfaces";

interface GenresSearchProps {
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  applyGenresFilter: () => void;
}

const GenresSearch = ({
  selectedGenres,
  setSelectedGenres,
  applyGenresFilter,
}: GenresSearchProps) => {
  const { isOpen, toggle, close } = useToggle(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const applyFilter = () => {
    close();
    applyGenresFilter();
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetch();
  }, []);
  return (
    <View className="w-full flex-col items-center mt-2">
      <TouchableOpacity
        className="bg-transparent border border-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-full"
        onPress={toggle}
      >
        <Text className="text-white">Search By Genres</Text>
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <View className="flex-row items-center">
              <Switch
                value={selectedGenres.includes(item.id)}
                onValueChange={() => toggleGenre(item.id)}
              />
              <Text className="text-white">{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          className="w-full bg-transparent mt-2 rounded-md text-white"
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 16,
            marginVertical: 16,
          }}
          ListHeaderComponent={
            <TouchableOpacity
              className="bg-transparent border border-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-full"
              onPress={applyFilter}
            >
              <Text className="text-white">Apply</Text>
            </TouchableOpacity>
          }
        />
      )}
    </View>
  );
};

export default GenresSearch;
