import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, RelativePathString } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

interface ProfileInfoProp {
  href: RelativePathString;
  value: string;
}

const ProfileInfo = ({ href, value }: ProfileInfoProp) => (
  <Link href={href} asChild>
    <TouchableOpacity className="bg-transparent border border-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-full">
      <Text className="text-white">{value}</Text>
    </TouchableOpacity>
  </Link>
);

const Profile = () => {
  const { user, signout, verify } = useAuth();
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <View className="flex flex-col gap-5 mt-5 px-5">
        <Text className="text-white text-xl font-bold">
          Hi {user?.name ?? "there"}!
        </Text>
        <ProfileInfo
          href={"profile/edit" as RelativePathString}
          value="Edit Profile"
        />
        <ProfileInfo
          href={"profile/changepassword" as RelativePathString}
          value="Change Password"
        />
        {!user.emailVerification && (
          <TouchableOpacity
            className="bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-full"
            onPress={verify}
          >
            <Text>Verify Email</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center w-full"
          onPress={signout}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
