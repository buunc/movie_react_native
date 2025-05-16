import { Text, TouchableOpacity, Image } from "react-native";
import { Cast } from "@/interfaces/interfaces";

const CastCard = ({ name, profile_path, character }: Cast) => {
  return (
    <TouchableOpacity className="w-32 relative">
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${profile_path}`,
        }}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-sm font-bold mt-2 text-light-200">
        {name}
      </Text>
      <Text className="text-sm text-light-200">
        {character}
      </Text>
    </TouchableOpacity>
  );
};

export default CastCard;
