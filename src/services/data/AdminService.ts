
import { CreateUserSchema } from "@/schemas/User/create-user.schema";
import { UpdateUserSchema } from "@/schemas/User/update-user.schema";
import { api } from "@/services/api";
import { Admin } from "@/types/admin";

export const createAdmin = async (data: CreateUserSchema): Promise<Admin> => {
  try {
    const response = await api.post("/user", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create admin:", error);
    throw error;
  }
};

export const getAdminDetails = async (adminId: string): Promise<Admin> => {
  try {
    const response = await api.get(`/user/${adminId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin details:", error);
    throw error;
  }
};

export const getAdmins = async (): Promise<Admin[]> => {
  try {
    const response = await api.get(`/user`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin details:", error);
    throw error;
  }
};

export const updateAdmin = async (adminId: number, data: UpdateUserSchema): Promise<Admin> => {
  try {
    const response = await api.patch(`/user/${adminId}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update admin profile:", error);
    throw error;
  }
};

export const deleteAdmin = async (adminId: number): Promise<void> => {
  try {
    await api.delete(`/user/${adminId}`);
  } catch (error) {
    console.error("Failed to delete admin:", error);
    throw error;
  }
};
