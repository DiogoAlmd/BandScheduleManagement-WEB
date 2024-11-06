"use client";

import { useEffect, useState } from "react";
import { deleteScale, getMusicianScales } from "@/services/data/ScaleService";
import { Scale } from "@/types/scale";

import CreateScaleModal from "@/components/Modals/CreateScaleModal";
import ScaleList from "@/components/Dashboard/Scales/ScaleList";
import { useAuth } from "@/context/AuthContext";

export default function MusicianScalePage() {
  const [scales, setScales] = useState<Scale[]>([]);
  const [error, setError] = useState<string | null>(null);
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

  const handleDeleteScale = async (id: number) => {
    try {
      await deleteScale(id);
      setScales(scales.filter((scale) => scale.id !== id));
    } catch {
      setError("Failed to delete scale.");
    }
  };

  const handleUpdateScale = (updatedScale: Scale) => {
    setScales((prevScales) =>
      prevScales.map((scale) =>
        scale.id === updatedScale.id ? updatedScale : scale
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Scales</h2>

      <div className="flex items-center space-x-4">
        <CreateScaleModal onScaleCreated={() => {}} />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ScaleList 
        scales={scales} 
        onDelete={handleDeleteScale} 
        onUpdate={handleUpdateScale} 
      />
    </div>
  );
}
