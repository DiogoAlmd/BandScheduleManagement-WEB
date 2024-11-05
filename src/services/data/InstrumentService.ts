import { api } from "@/services/api";
import { Instrument } from "@/types/instrument";

export const getInstruments = async (): Promise<Instrument[]> => {
    try {
      const response = await api.get("/instrument");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch instrument:", error);
      return [];
    }
}

export const createInstrument = async (name: string): Promise<Instrument> => {
  const response = await api.post("/instrument", { name });
  return response.data;
};

export const deleteInstrument = async (id: number): Promise<void> => {
  await api.delete(`/instrument/${id}`);
};