import { Person } from "@/interfaces/interfaces";
import { View, Text, Image } from "react-native";
import { convertBithday, convertPersonGender } from "@/utils/utils";

const PersonInfo = ({ label, value }: { label: string; value: string }) => {
  return (
    <View className="flex-row flex-wrap mt-1">
      <Text className="font-bold text-white">{label}:&nbsp;</Text>
      <Text className="text-white">{value}</Text>
    </View>
  );
};

const PersonDetails = ({ profile_path, name, birthday, gender, place_of_birth, known_for_department, also_known_as, biography }: Person) => {
  return (
    <>
    <View className="flex-row px-5 py-5 mt-5 gap-3">
      <View className="flex-[1]">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${profile_path}`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
      </View>
      <View className="flex-[2]">
        <Text className="text-accent font-bold text-xl">{name}</Text>
        <PersonInfo label="Birthday" value={convertBithday(birthday)} />
        <PersonInfo label="Gender" value={convertPersonGender(gender)} />
        <PersonInfo label="Place of Birth" value={place_of_birth} />
        <PersonInfo label="Known For" value={known_for_department} />
        <PersonInfo label="Also Known As" value={also_known_as.join(', ')} />
      </View>
    </View>
    <View className="flex-col px-5 mt-5">
      <Text className="text-accent font-bold text-xl">Biography</Text>
      <Text className="text-sm text-white">{biography}</Text>
    </View>
    </>
  );
};

export default PersonDetails;
