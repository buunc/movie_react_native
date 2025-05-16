import { useContext, createContext, useState, useEffect } from "react";
import { account } from "@/services/appwrite";
import { ID, OAuthProvider } from "react-native-appwrite";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { AppwriteSession, AppwriteUser } from "@/interfaces/interfaces";

interface AuthContextType {
  session: any;
  user: any;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signout: () => Promise<void>;
  verify: () => Promise<void>;
  update: (data: { name: string }) => Promise<void>;
  changePassword: (data: {
    oldPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const showToastMessage = (type: string, title: string, error: any) => {
  Toast.show({
    type: type,
    text1: title,
    text2: error instanceof Error ? error.message : "Unknown Error",
  });
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<AppwriteSession | null>(null);
  const [user, setUser] = useState<AppwriteUser | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await account.get();
      setUser(response);
      setSession(response);
    } catch (error) {
      signout();
    }
  };

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const session: AppwriteSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(session);
      const user: AppwriteUser = await account.get();
      setUser(user);
    } catch (error) {
      showToastMessage("error", "Login Failed", error);
    }
  };

  const signup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await account.create(ID.unique(), email, password, name);

      const session: AppwriteSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(session);

      const user: AppwriteUser = await account.get();
      setUser(user);
    } catch (error) {
      showToastMessage("error", "Register Failed", error);
    }
  };

  const verify = async () => {
    try {
      const user: AppwriteUser = await account.get();
      if (user.emailVerification) {
        throw new Error("Already verify");
      }
      await account.createVerification("movies://verify");
      Toast.show({
        type: "info",
        text1: "Verification Email Sent",
        text2: "Please check your inbox.",
      });
    } catch (error) {
      console.log(error);
      showToastMessage("error", "Verification Failed", error);
    }
  };

  const update = async ({ name }: { name: string }) => {
    try {
      const session: AppwriteSession = await account.updateName(name);
      setSession(session);
      const user: AppwriteUser = await account.get();
      setUser(user);
      router.replace("/profile");
    } catch (error) {
      showToastMessage("error", "Update Failed", error);
    }
  };

  const changePassword = async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      const session: AppwriteSession = await account.updatePassword(
        newPassword,
        oldPassword
      );
      setSession(session);
      const user: AppwriteUser = await account.get();
      setUser(user);
      router.replace("/profile");
    } catch (error) {
      showToastMessage("error", "Change Password Failed", error);
    }
  };

  const signout = async () => {
    await account.deleteSession("current");
    setSession(null);
    setUser(null);
  };
  const contextData = {
    session,
    user,
    signin,
    signup,
    verify,
    update,
    changePassword,
    signout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
