import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode } from "react";

import { AuthContext } from "../contexts/auth";
import { useLoadingAPI } from "../contexts/loading";
import { User } from "../models/User";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const { showSpinner } = useLoadingAPI();

  const signIn = async () => {
    showSpinner();
    // TO DO
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
