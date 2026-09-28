import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authService, type User } from "@/services/auth.service";
import { tokenService } from "@/services/token.service";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  const loadUser = async () => {
    try {
      const token = await tokenService.getAccessToken();
      console.log("contexttoken",token)

      if (!token) {
        return;
      }

      const currentUser = await authService.getCurrentUser();
      // console.log("currentuser",currentUser)
      setUser(currentUser);
    } catch (error) {
      console.log("Session restore failed:", error);

      await tokenService.removeAccessToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<void> => {
    const data = await authService.login({
      email,
      password,
    });

    setUser(data.user);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<void> => {
    const data = await authService.register({
      name,
      email,
      password,
      phone,
    });

    setUser(data.user);
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}