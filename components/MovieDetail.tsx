import { MovieDetails } from "@/interfaces/interfaces";
import { View, Image, Text } from "react-native";
import SaveButton from "./SaveButton";
import { icons } from "@/constants/icons";

const MovieDetail = ({ movie }: { movie: MovieDetails }) => {
  return (
    <>
      <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          className="w-full h-[550px]"
          resizeMode="stretch"
        />
      </View>
      <View className="flex-col items-start justify-center mt-5 px-5">
        <Text className="text-white font-bold text-xl">{movie?.title}</Text>
        <View className="flex-row items-center gap-x-1 mt-2">
          <Text className="text-light-200 text-sm">
            {movie?.release_date?.split("-")[0]}
          </Text>
          <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
        </View>
        <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white font-bold text-sm">
            {Math.round(movie?.vote_average ?? 0)}/10
          </Text>
          <Text className="text-light-200 text-sm">
            ({movie?.vote_count} votes)
          </Text>
        </View>
        <SaveButton {...movie} />
      </View>
    </>
  );
};

export default MovieDetail;
