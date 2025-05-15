import { useEffect } from "react";
import * as Linking from "expo-linking";
import { account } from "@/services/appwrite";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export const useEmailVerificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { queryParams, path } = Linking.parse(event.url);

      if (path === "verify" && queryParams.userId && queryParams.secret) {
        try {
          await account.updateVerification(
            queryParams.userId,
            queryParams.secret
          );

          Toast.show({
            type: "success",
            text1: "Verified!",
            text2: "Your email has been verified.",
          });

          navigation.navigate("/");
        } catch (err) {
          Toast.show({
            type: "error",
            text1: "Verification Failed",
            text2: "Please try again later.",
          });
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);
};
