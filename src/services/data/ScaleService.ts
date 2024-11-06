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

export const getMusicianScales = async (id: number): Promise<Scale[]> => {
  try {
    const response = await api.get(`/scale/musicianScales/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch musician scales:", error);
    throw error;
  }
};

export const createScale = async (
  adminId: number,
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

export const updateScale = async (
  scaleId: number,
  updateData: {
    eventDate?: string;
    musicians?: { musicianId: number; instrumentIds: number[] }[];
  }
): Promise<Scale> => {
  try {
    const response = await api.patch(`/scale/${scaleId}/update`, updateData);
    return response.data;
  } catch (error) {
    console.error("Failed to update scale:", error);
    throw error;
  }
};
