import { createContext } from "react";
import { User } from "../models/User";
import { LoginCredentials } from "../models/Login";
import { RegisterCredentials } from "../models/Register";

interface IAuthContext {
  user?: User;
  login: (user: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (user: RegisterCredentials) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});
