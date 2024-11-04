import { api } from "@/services/api";
import { Musician } from "@/types/musician";

export const getMusicians = async (): Promise<Musician[]> => {
  try {
    const response = await api.get("/musician");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch musicians:", error);
    throw error;
  }
};

export const createMusician = async (musicianData: {
  name: string;
  email: string;
  password: string;
  instrumentIds: number[];
}): Promise<Musician> => {
  try {
    const response = await api.post("/musician", musicianData);
    return response.data;
  } catch (error) {
    console.error("Failed to create musician:", error);
    throw error;
  }
};

export const updateMusician = async (
  id: number,
  musicianData: { name?: string; email?: string; instrumentIds?: number[] }
): Promise<Musician> => {
  try {
    const response = await api.patch(`/musician/${id}`, musicianData);
    return response.data;
  } catch (error) {
    console.error("Failed to update musician:", error);
    throw error;
  }
};

export const deleteMusician = async (id: number): Promise<void> => {
  try {
    await api.delete(`/musician/${id}`);
  } catch (error) {
    console.error("Failed to delete musician:", error);
    throw error;
  }
};