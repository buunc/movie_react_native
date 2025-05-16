import BackButton from "@/components/BackButton";
import MovieDetail from "@/components/MovieDetail";
import MovieInfo from "@/components/MovieInfo";
import Recommendations from "@/components/Recommendations";
import Similar from "@/components/Similar";
import Reviews from "@/components/Reviews";
import Cast from "@/components/Cast";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  useEffect(() => {
    if (movie?.title) {
      updateSearchCount(movie);
    }
  }, [movie]);

  if (error) {
    return (
      <Text className="text-red-500 text-center mt-4">
        Failed to load movie.
      </Text>
    );
  }

  if (loading || !movie) {
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
        <MovieDetail movie={movie} />
        <View className="flex-col items-start justify-center px-5">
          <Link href={`/movies/videos/${id}`} className="mt-2" asChild>
            <TouchableOpacity className="flex-row items-center justify-center bg-red-600 px-3 py-3 rounded-md gap-3">
              <Image source={icons.play} className="size-4" />
              <Text className="text-white font-bold">Watch Movie</Text>
            </TouchableOpacity>
          </Link>
          <Cast id={id as string} />
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
          <Reviews id={id as string} />
        </View>
      </ScrollView>

      <BackButton />
    </View>
  );
};

export default MovieDetails;
