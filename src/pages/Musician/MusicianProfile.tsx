"use client";

import { useEffect, useState } from "react";
import { Musician } from "@/types/musician";
import { useAuth } from "@/context/AuthContext";
import UpdateMusicianForm from "@/components/Forms/UpdateMusicianForm";
import { getMusicianDetails, updateMusician } from "@/services/data/MusiciansService";
import { UpdateMusicianSchema } from "@/schemas/Musician/update-musician.schema";

export default function MusicianProfile() {
  const [musician, setMusician] = useState<Musician | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchMusicianDetails() {
      try {
        setLoading(true);
        const musicianData = await getMusicianDetails(userId!);
        setMusician(musicianData);
      } catch {
        setError("Failed to load musician details.");
      } finally {
        setLoading(false);
      }
    }
    fetchMusicianDetails();
  }, [userId]);

  const handleFormSubmit = async (data: UpdateMusicianSchema) => {
    try {
      const requestData = data.password ? data : { ...data, password: undefined };
      const updatedMusician = await updateMusician(userId!, {
        ...requestData,
        instrumentIds: data.instrumentIds,
      });
      setMusician(updatedMusician);
    } catch {
      setError("Failed to update musician.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Musician Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {musician && (
        <UpdateMusicianForm musician={musician} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}
