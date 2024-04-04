import { createContext, useContext } from "react";

import { User } from "../models/User";

interface AuthContextData {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);
