import { useContext, createContext, useState, useEffect } from "react";
import { account } from "@/services/appwrite";
import { ID } from "react-native-appwrite";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

interface AuthContextType {
  session: any;
  user: any;
  error: string | null;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signout: () => Promise<void>;
  update: (data: { name: string }) => Promise<void>;
  changePassword: (data: {
    oldPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

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
      const session = await account.createEmailPasswordSession(email, password);
      setSession(session);
      const user = await account.get();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
      const session = await account.create(ID.unique(), email, password, name);
      setSession(session);
      const user = await account.get();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const verify = async () => {
    try {
      const user = await account.get();
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
    }
  };

  const update = async ({ name }: { name: string }) => {
    try {
      const session = await account.updateName(name);
      setSession(session);
      const user = await account.get();
      setUser(user);
      router.replace("/profile");
    } catch (error) {
      console.log(error);
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
      const session = await account.updatePassword(newPassword, oldPassword);
      setSession(session);
      const user = await account.get();
      setUser(user);
      router.replace("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    await account.deleteSession("current");
    setSession(null);
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
