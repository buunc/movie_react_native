import { Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

const SavedCard = ({
  movie: { movie_id, title, poster_url },
}: SavedCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity>
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
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

export default SavedCard;
