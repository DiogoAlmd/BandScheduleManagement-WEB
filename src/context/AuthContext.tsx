"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { api } from "@/services/api";

interface AuthContextData {
  isAuthenticated: boolean;
  userRole: string | null;
  userId: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decodedToken = decode(token) as JwtPayload;
      if (decodedToken) {
        setIsAuthenticated(true);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.userId);
        setEmail(decodedToken.email);
      }
    }
  }, []);

  async function login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data;

      Cookies.set("token", accessToken, { expires: 1 });
      const decodedToken = decode(accessToken) as JwtPayload;
      if (decodedToken) {
        setUserRole(decodedToken.role);
        setUserId(decodedToken.userId);
        setEmail(decodedToken.email);
        setIsAuthenticated(true);
      }

      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  function logout() {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    setEmail(null);
    router.push("/login/sign-in");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userId, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
