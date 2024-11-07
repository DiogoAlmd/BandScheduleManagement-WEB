"use client";

import { useEffect, useState } from "react";
import { getMusicianScales } from "@/services/data/ScaleService";
import { Scale } from "@/types/scale";
import ScaleList from "@/components/Dashboard/Scales/ScaleList";
import { useAuth } from "@/context/AuthContext";
import { useScales } from "@/providers/ScaleProvider";

export default function MusicianScalePage() {
  const [scales, setScales] = useState<Scale[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { deleteScale } = useScales();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMusicianScales(user!.id);
        setScales(data);
      } catch {
        setError("Failed to load scales.");
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Scales</h2>

      {error && <p className="text-red-500">{error}</p>}

      <ScaleList scales={scales} onDelete={deleteScale} />
    </div>
  );
}
