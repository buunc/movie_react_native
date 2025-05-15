import { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FormInput from "@/components/FormInput";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { Link, Redirect } from "expo-router";

import { useAuth } from "@/context/AuthContext";

const signup = () => {
  const { session, signup } = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    signup({ email, password, name });
  };
  
  if (session) return <Redirect href="/" />
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <SafeAreaView className="flex-1 flex-col items-center justify-center px-5 gap-5">
        <View className="flex-col items-center justify-center">
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-3 mx-auto" />
          <Text className="text-5xl text-accent font-bold">MovieFlix</Text>
          <Text className="text-sm text-white font-bold">
            Find all movies in one place
          </Text>
        </View>
        <FormInput
          placeholder="Enter your name"
          value={name}
          onChangeText={(text: string) => {
            setName(text);
          }}
        />
        <FormInput
          placeholder="Enter your email"
          value={email}
          onChangeText={(text: string) => {
            setEmail(text);
          }}
        />
        <FormInput
          placeholder="Enter your password"
          value={password}
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <TouchableOpacity
          className="bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-full"
          onPress={handleSubmit}
        >
          <Text>Register</Text>
        </TouchableOpacity>
        <Text className="text-white">
          Already have an account? {" "}
          <Link href="/signup" className="text-accent">
            Log In now!
          </Link>
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default signup;
