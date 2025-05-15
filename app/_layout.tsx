import { Stack,  } from "expo-router";
import "./globals.css";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { useEmailVerificationHandler } from "@/hooks/useEmailVerificationHandler";

export default function RootLayout() {
  useEmailVerificationHandler();

  return (
    <>
      <StatusBar hidden={true} />
      <AuthProvider>
        <Stack>
          <Stack.Screen name="signin" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="profile/edit" options={{ headerShown: false }} />
          <Stack.Screen name="profile/changepassword" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
      <Toast />
    </>
  );
}
