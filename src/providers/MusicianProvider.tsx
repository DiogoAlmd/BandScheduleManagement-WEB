"use client";

import { createContext, ReactNode, useContext, useCallback } from "react";
import { Musician } from "@/types/musician";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getMusicians,
  createMusician as createMusicianService,
  deleteMusician as deleteMusicianService,
  updateMusician as updateMusicianService,
} from "@/services/data/MusiciansService";
import { toast } from "react-hot-toast";

interface MusicianContextData {
  data: Musician[];
  status: UseQueryResult<Musician[]>["status"];
  error: string | null;
  refetch: () => void;
  createMusician: (
    name: string,
    email: string,
    instruments: number[],
    password: string
  ) => Promise<void>;
  deleteMusician: (id: number) => Promise<void>;
  updateMusician: (
    id: number,
    name?: string,
    email?: string,
    instrumentIds?: number[],
    password?: string
  ) => Promise<void>;
}

const MusicianContext = createContext<MusicianContextData | undefined>(
  undefined
);

export const MusicianProvider = ({ children }: { children: ReactNode }) => {
  const {
    data = [],
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["musicians"],
    queryFn: getMusicians,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const createMusician = useCallback(
    async (
      name: string,
      email: string,
      instrumentIds: number[],
      password: string
    ) => {
      try {
        await createMusicianService({ name, email, instrumentIds, password });
        refetch();
        toast.success("Musician added successfully!");
      } catch (err) {
        console.error("Failed to add musician:", err);
        toast.error("Failed to add musician.");
      }
    },
    [refetch]
  );

  const deleteMusician = useCallback(
    async (id: number) => {
      try {
        await deleteMusicianService(id);
        refetch();
        toast.success("Musician deleted successfully!");
      } catch (err) {
        console.error("Failed to delete musician:", err);
        toast.error("Failed to delete musician.");
      }
    },
    [refetch]
  );

  const updateMusician = useCallback(
    async (
      id: number,
      name?: string,
      email?: string,
      instrumentIds?: number[],
      password?: string
    ) => {
      try {
        const updateData: Partial<{
          name: string;
          email: string;
          instrumentIds: number[];
          password: string;
        }> = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (instrumentIds) updateData.instrumentIds = instrumentIds;
        if (password) updateData.password = password;

        await updateMusicianService(id, updateData);
        refetch();
        toast.success("Musician updated successfully!");
      } catch (err) {
        console.error("Failed to update musician:", err);
        toast.error("Failed to update musician.");
      }
    },
    [refetch]
  );

  return (
    <MusicianContext.Provider
      value={{
        data,
        status,
        error: error instanceof Error ? error.message : null,
        refetch,
        createMusician,
        deleteMusician,
        updateMusician,
      }}
    >
      {children}
    </MusicianContext.Provider>
  );
};

export const useMusicians = () => {
  const context = useContext(MusicianContext);
  if (context === undefined) {
    throw new Error(
      "useMusicians deve ser usado dentro de um MusicianProvider"
    );
  }
  return context;
};
