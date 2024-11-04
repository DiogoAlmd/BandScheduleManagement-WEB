import { UpdateMusicianSchema } from "@/schemas/Musician/update-musician.schema";
import { api } from "@/services/api";
import { Admin } from "@/types/admin";


export const getAdminDetails = async (adminId: string): Promise<Admin> => {
  try {
    const response = await api.get(`/user/${adminId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin details:", error);
    throw error;
  }
};

export const updateAdmin = async (adminId: number, data: UpdateMusicianSchema): Promise<Admin> => {
  try {
    const response = await api.patch(`/user/${adminId}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update admin profile:", error);
    throw error;
  }
};
