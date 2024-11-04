"use client";

import { useEffect, useState } from "react";
import { getMusicians, deleteMusician } from "@/services/data/MusiciansService";
import { Musician } from "@/types/musician";
import { Button } from "@/components/ui/button";
import CreateMusicianModal from "@/components/admin/CreateMusicianModal";

export default function MusicianList() {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setMusicians(await getMusicians());
    }
    fetchData();
  }, []);

  const handleMusicianCreated = (newMusician: Musician) => {
    setMusicians([...musicians, newMusician]);
  };

  const handleDeleteMusician = async (id: number) => {
    try {
      await deleteMusician(id);
      setMusicians(musicians.filter((musician) => musician.id !== id));
    } catch {
      setError("Failed to delete musician.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard - Musicians</h1>
      {error && <p className="text-red-500">{error}</p>}

      <CreateMusicianModal onMusicianCreated={handleMusicianCreated} />

      <ul className="space-y-2 mt-4">
        {musicians.map((musician) => (
          <li key={musician.id} className="flex justify-between items-center p-2 border rounded">
            <div>
              <p>
                {musician.name} - {musician.email}
              </p>
              <p>Instruments: {musician.instruments.map((inst) => inst.name).join(", ")}</p>
            </div>
            <Button variant="destructive" onClick={() => handleDeleteMusician(musician.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
