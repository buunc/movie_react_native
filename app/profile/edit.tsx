import { useState } from "react";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import FormInput from "@/components/FormInput";
import { useAuth } from "@/context/AuthContext";
import BackButton from "@/components/BackButton";

const Edit = () => {
  const { user, error, update } = useAuth();
  const [name, setName] = useState<string>(user.name);

  const handleSubmit = () => {
    update({ name });
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <SafeAreaView className="flex-1 flex-col px-5 gap-5">
        <Text className="text-white text-xl font-bold">Edit Profile</Text>
        <FormInput
          placeholder="Enter your name"
          value={name}
          onChangeText={(text: string) => {
            setName(text);
          }}
        />
        {error && <Text className="text-sm text-white font-bold">{error}</Text>}
        <TouchableOpacity
          className="bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-full"
          onPress={handleSubmit}
        >
          <Text>Update</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <BackButton />
    </View>
  );
};

export default Edit;
