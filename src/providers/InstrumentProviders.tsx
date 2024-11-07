"use client";

import { createContext, ReactNode, useContext, useCallback } from "react";
import { Instrument } from "@/types/instrument";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getInstruments, createInstrument as createInstrumentService, deleteInstrument as deleteInstrumentService } from "@/services/data/InstrumentService";
import { toast } from "react-hot-toast";

interface InstrumentsProvidersData {
  data: Instrument[];
  status: UseQueryResult<Instrument[]>["status"];
  error: string | null;
  refetch: () => void;
  createInstrument: (name: string) => Promise<void>;
  deleteInstrument: (id: number) => Promise<void>;
}

const InstrumentsContext = createContext<InstrumentsProvidersData | undefined>(undefined);

export const InstrumentsProviders = ({ children }: { children: ReactNode }) => {
  const { data = [], status, error, refetch } = useQuery({
    queryKey: ["instruments"],
    queryFn: getInstruments,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const createInstrument = useCallback(async (name: string) => {
    try {
      await createInstrumentService(name);
      refetch();
      toast.success("Instrument added successfully!");
    } catch (err) {
      console.error("Failed to add instrument:", err);
      toast.error("Failed to add instrument.");
    }
  }, [refetch]);

  const deleteInstrument = useCallback(async (id: number) => {
    try {
      await deleteInstrumentService(id);
      refetch();
      toast.success("Instrument deleted successfully!");
    } catch (err) {
      console.error("Failed to delete instrument:", err);
      toast.error("Failed to delete instrument.");
    }
  }, [refetch]);

  return (
    <InstrumentsContext.Provider
      value={{
        data,
        status,
        error: error instanceof Error ? error.message : null,
        refetch,
        createInstrument,
        deleteInstrument,
      }}
    >
      {children}
    </InstrumentsContext.Provider>
  );
};

export const useGetAllInstruments = () => {
  const context = useContext(InstrumentsContext);
  if (context === undefined) {
    throw new Error("useGetAllInstruments deve ser usado dentro de um InstrumentsProviders");
  }
  return context;
};
