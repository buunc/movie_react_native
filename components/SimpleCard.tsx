import { Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { Movie } from "@/interfaces/interfaces";

const SimpleCard = ({ id, title, poster_path }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-32 relative">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "htps://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={1}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default SimpleCard;
