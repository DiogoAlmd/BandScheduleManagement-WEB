import { api } from "@/services/api";
import { Scale } from "@/types/scale";

export const getScales = async (): Promise<Scale[]> => {
  try {
    const response = await api.get("/scale");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch scales:", error);
    throw error;
  }
};

export const createScale = async (
  adminId: string,
  scaleData: {
    eventDate: string;
    musicians: { musicianId: number; instrumentIds: number[] }[];
  }
): Promise<Scale> => {
  try {
    const response = await api.post(`scale/${adminId}`, scaleData);
    return response.data;
  } catch (error) {
    console.error("Failed to create scale:", error);
    throw error;
  }
};

export const deleteScale = async (id: number): Promise<void> => {
  try {
    await api.delete(`/scale/${id}/delete`);
  } catch (error) {
    console.error("Failed to delete scale:", error);
    throw error;
  }
};