import BackButton from "@/components/BackButton";
import MovieDetail from "@/components/MovieDetail";
import MovieInfo from "@/components/MovieInfo";
import MovieVideos from "@/components/MovieVideos";
import Recommendations from "@/components/Recommendations";
import Similar from "@/components/Similar";
import { fetchMovieDetails } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const Videos = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  if (error || !movie) {
    return (
      <Text className="text-red-500 text-center mt-4">
        Failed to load movie.
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
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <MovieVideos id={id as string} />
        <MovieDetail movie={movie} />
        <View className="flex-col items-start justify-center mt-5 px-5">
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget ? `$${movie.budget / 1000000} million` : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movie?.revenue ? `$${movie.revenue / 1000000} million` : "N/A"
              }
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />
          <Similar id={id as string} />
          <Recommendations id={id as string} />
        </View>
      </ScrollView>
      <BackButton />
    </View>
  );
};

export default Videos;
