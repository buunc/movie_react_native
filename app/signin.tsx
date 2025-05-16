import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import FormInput from "@/components/FormInput";
import { Link, Redirect } from "expo-router";

import { useAuth } from "@/context/AuthContext";

const SignIn = () => {
  const { session, signin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    signin({ email, password });
  };

  if (session) return <Redirect href="/" />;
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", rowGap: 16 }}
      >
        <View className="flex-col items-center justify-center">
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-3 mx-auto" />
          <Text className="text-5xl text-accent font-bold">MovieFlix</Text>
          <Text className="text-sm text-white font-bold">
            Find all movies in one place
          </Text>
        </View>
        <FormInput
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <FormInput
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <TouchableOpacity
          className="bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-full"
          onPress={handleSubmit}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <Text className="text-white">
          Don't have account?{" "}
          <Link href="/signup" className="text-accent">
            Sign Up now!
          </Link>
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignIn;
