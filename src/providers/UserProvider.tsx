"use client";

import { createContext, ReactNode, useContext, useCallback } from "react";
import { Admin } from "@/types/admin";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getAdmins,
  createAdmin as createAdminService,
  deleteAdmin as deleteAdminService,
  updateAdmin as updateAdminService,
} from "@/services/data/AdminService";
import { toast } from "react-hot-toast";

interface UsersContextData {
  data: Admin[];
  status: UseQueryResult<Admin[]>["status"];
  error: string | null;
  refetch: () => void;
  createUser: (name: string, email: string, password: string) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number, name?: string, email?: string, password?: string) => Promise<void>;
}

const UsersContext = createContext<UsersContextData | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const { data = [], status, error, refetch } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const createUser = useCallback(async (name: string, email: string, password: string) => {
    try {
      await createAdminService({ name, email, password });
      refetch();
      toast.success("Admin user added successfully!");
    } catch (err) {
      console.error("Failed to add user:", err);
      toast.error("Failed to add user.");
    }
  }, [refetch]);

  const deleteUser = useCallback(async (id: number) => {
    try {
      await deleteAdminService(id);
      refetch();
      toast.success("Admin user deleted successfully!");
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error("Failed to delete user.");
    }
  }, [refetch]);

  const updateUser = useCallback(async (id: number, name?: string, email?: string, password?: string) => {
    try {
      const updateData: Partial<{ name: string; email: string; password: string }> = {};
      
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) updateData.password = password;

      await updateAdminService(id, updateData);
      refetch();
      toast.success("Admin user updated successfully!");
    } catch (err) {
      console.error("Failed to update user:", err);
      toast.error("Failed to update user.");
    }
  }, [refetch]);

  return (
    <UsersContext.Provider
      value={{
        data,
        status,
        error: error instanceof Error ? error.message : null,
        refetch,
        createUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers deve ser usado dentro de um UsersProvider");
  }
  return context;
};
