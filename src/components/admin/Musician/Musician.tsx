"use client";

import { useEffect, useState } from "react";
import { getMusicians, deleteMusician } from "@/services/data/MusiciansService";
import { Musician } from "@/types/musician";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CreateMusicianModal from "./CreateMusicianModal";
import UpdateMusicianModal from "./UpdateMusicianModal";

export default function MusicianList() {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMusicians();
        setMusicians(data);
      } catch {
        setError("Failed to load musicians.");
      }
    }
    fetchData();
  }, []);

  const handleMusicianCreated = (newMusician: Musician) => {
    setMusicians([...musicians, newMusician]);
  };

  const handleMusicianUpdated = (updatedMusician: Musician) => {
    setMusicians((prevMusicians) =>
      prevMusicians.map((musician) =>
        musician.id === updatedMusician.id ? updatedMusician : musician
      )
    );
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
      {error && <p className="text-red-500">{error}</p>}

      <CreateMusicianModal onMusicianCreated={handleMusicianCreated} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {musicians.map((musician) => (
          <Card key={musician.id} className="border shadow-md">
            <CardHeader>
              <CardTitle>{musician.name}</CardTitle>
              <p className="text-sm text-gray-500">{musician.email}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                <strong>Instruments:</strong>{" "}
                {musician.instruments.map((inst) => inst.name).join(", ")}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <UpdateMusicianModal
                musician={musician}
                onMusicianUpdated={handleMusicianUpdated}
              />
              <Button
                variant="destructive"
                onClick={() => handleDeleteMusician(musician.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
