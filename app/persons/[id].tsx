import BackButton from "@/components/BackButton";
import { fetchPerson } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import PersonDetails from "@/components/PersonDetails";
import MovieCredits from "@/components/MovieCredits";

const Persons = () => {
  const { id } = useLocalSearchParams();

  const {
    data: person,
    loading,
    error,
  } = useFetch(() => fetchPerson(id as string));

  return (
    <View className="bg-primary flex-1">
      {error ? (
        <Text className="text-red-500 text-center mt-4">
          Failed to load person.
        </Text>
      ) : loading || !person ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        >
          <PersonDetails {...person} />
          <MovieCredits id={id as string} />
        </ScrollView>
      )}

      <BackButton />
    </View>
  );
};

export default Persons;
