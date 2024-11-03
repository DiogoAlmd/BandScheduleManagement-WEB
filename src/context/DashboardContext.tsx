"use client";
import { createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface DashboardContextData {
  isAdmin: boolean;
  isMusician: boolean;
}

const DashboardContext = createContext<DashboardContextData>({} as DashboardContextData);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { userRole } = useAuth();

  const isAdmin = userRole === "admin";
  const isMusician = userRole === "musician";

  return (
    <DashboardContext.Provider value={{ isAdmin, isMusician }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}