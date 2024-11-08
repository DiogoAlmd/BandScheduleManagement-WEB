"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import UpdateMusicianForm from "@/components/Forms/UpdateMusicianForm";
import { updateMusician } from "@/services/data/MusiciansService";
import { UpdateMusicianSchema } from "@/schemas/Musician/update-musician.schema";
import { Musician } from "@/types/musician";
import { useGetAllInstruments } from "@/providers/InstrumentProviders";
import { useMusicians } from "@/providers/MusicianProvider";

export default function MusicianProfile() {
  const [error, setError] = useState<string | null>(null);
  const { user, refreshToken } = useAuth();
  const { data: instruments } = useGetAllInstruments();
  const { updateMusician } = useMusicians();

  const handleFormSubmit = async (data: UpdateMusicianSchema) => {
    try {
      const requestData = data.password
        ? data
        : { ...data, password: undefined };
      await updateMusician(
        user!.id,
        data.name,
        data.email,
        data.instrumentIds,
        data.password
      );

      await refreshToken();
    } catch {
      setError("Failed to update musician.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Musician Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <UpdateMusicianForm
          musician={user as Musician}
          onSubmit={handleFormSubmit}
          instruments={instruments}
        />
      )}
    </div>
  );
}
