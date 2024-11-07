"use client";

import { createContext, ReactNode, useContext, useCallback } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Scale } from "@/types/scale";
import {
  getScales,
  createScale as createScaleService,
  updateScale as updateScaleService,
  deleteScale as deleteScaleService,
} from "@/services/data/ScaleService";
import { toast } from "react-hot-toast";

interface ScaleContextData {
  scales: Scale[];
  status: UseQueryResult<Scale[]>["status"];
  error: string | null;
  refetch: () => void;
  createScale: (
    adminId: number,
    newScaleData: {
      eventDate: string;
      musicians: { musicianId: number; instrumentIds: number[] }[];
    }
  ) => Promise<void>;
  updateScale: (
    id: number,
    updatedData: {
      eventDate?: string;
      musicians?: { musicianId: number; instrumentIds: number[] }[];
    }
  ) => Promise<void>;
  deleteScale: (id: number) => Promise<void>;
}

const ScaleContext = createContext<ScaleContextData | undefined>(undefined);

export const ScaleProvider = ({ children }: { children: ReactNode }) => {
  const {
    data = [],
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["scales"],
    queryFn: getScales,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const createScale = useCallback(
    async (
      adminId: number,
      newScaleData: {
        eventDate: string;
        musicians: { musicianId: number; instrumentIds: number[] }[];
      }
    ) => {
      try {
        await createScaleService(adminId, newScaleData);
        refetch();
        toast.success("Scale created successfully!");
      } catch (err) {
        console.error("Failed to create scale:", err);
        toast.error("Failed to create scale.");
      }
    },
    [refetch]
  );

  const updateScale = useCallback(
    async (
      id: number,
      updatedData: {
        eventDate?: string;
        musicians?: { musicianId: number; instrumentIds: number[] }[];
      }
    ) => {
      try {
        await updateScaleService(id, updatedData);
        refetch();
        toast.success("Scale updated successfully!");
      } catch (err) {
        console.error("Failed to update scale:", err);
        toast.error("Failed to update scale.");
      }
    },
    [refetch]
  );

  const deleteScale = useCallback(
    async (id: number) => {
      try {
        await deleteScaleService(id);
        refetch();
        toast.success("Scale deleted successfully!");
      } catch (err) {
        console.error("Failed to delete scale:", err);
        toast.error("Failed to delete scale.");
      }
    },
    [refetch]
  );

  return (
    <ScaleContext.Provider
      value={{
        scales: data,
        status,
        error: error instanceof Error ? error.message : null,
        refetch,
        createScale,
        updateScale,
        deleteScale,
      }}
    >
      {children}
    </ScaleContext.Provider>
  );
};

export const useScales = () => {
  const context = useContext(ScaleContext);
  if (!context) {
    throw new Error("useScales must be used within a ScaleProvider");
  }
  return context;
};
