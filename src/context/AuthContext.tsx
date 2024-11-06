"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { api } from "@/services/api";
import { Instrument } from "@/types/instrument";
import { Admin } from "@/types/admin";
import { Musician } from "@/types/musician";

interface AuthContextData {
  isAuthenticated: boolean;
  user: Admin | Musician | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  name: string;
  instruments: Instrument[];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Admin | Musician | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decodedToken = decode(token) as JwtPayload;
      if (decodedToken) {
        setIsAuthenticated(true);
        setUser({
          id: decodedToken.userId,
          email: decodedToken.email,
          name: decodedToken.name,
          role: decodedToken.role as "admin" | "musician",
          instruments: decodedToken.instruments || [],
        });
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
        setIsAuthenticated(true);
        setUser({
          id: decodedToken.userId,
          email: decodedToken.email,
          name: decodedToken.name,
          role: decodedToken.role as "admin" | "musician",
          instruments: decodedToken.instruments || [],
        });

        if (decodedToken.role === "admin") router.push("/dashboard/admin/home");
        else if (decodedToken.role === "musician") router.push("/dashboard/musician/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function refreshToken() {
    try {
      const response = await api.post("/auth/refresh-token");
      const { accessToken } = response.data;

      Cookies.set("token", accessToken, { expires: 1 });
      const decodedToken = decode(accessToken) as JwtPayload;
      if (decodedToken) {
        setUser({
          id: decodedToken.userId,
          email: decodedToken.email,
          name: decodedToken.name,
          role: decodedToken.role as "admin" | "musician",
          instruments: decodedToken.instruments || [],
        });
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }

  function logout() {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login/sign-in");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
