"use client";

import { useEffect, useState } from "react";
import { getScales, createScale, deleteScale } from "@/services/data/ScaleService";
import { Scale } from "@/types/scale";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function ScaleList() {
  const [scales, setScales] = useState<Scale[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newEventDate, setNewEventDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getScales();
        setScales(data);
      } catch {
        setError("Failed to load scales.");
      }
    }
    fetchData();
  }, []);

  const handleAddScale = async () => {
    if (!newEventDate) return;
    try {
      const newScale = await createScale({ eventDate: newEventDate, musicians: [] });
      setScales([...scales, newScale]);
      setNewEventDate("");
    } catch {
      setError("Failed to add scale.");
    }
  };

  const handleDeleteScale = async (id: number) => {
    try {
      await deleteScale(id);
      setScales(scales.filter((scale) => scale.id !== id));
    } catch {
      setError("Failed to delete scale.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Scales</h2>

      <div className="flex items-center space-x-4">
        <input
          type="datetime-local"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={handleAddScale}>Add Scale</Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {scales.map((scale) => {
          return (
            <Card key={scale.id} className="border shadow-md">
              <CardHeader>
                <CardTitle>
                  {new Date(scale.eventDate).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  <strong>Created By:</strong> {scale.createdBy.name}
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Musicians:</strong>
                </p>
                <ul className="text-gray-600 text-sm list-disc ml-4">
                  {scale.scaleMusician.map((scaleMusician) => (
                    <li key={scaleMusician.id}>
                      {scaleMusician.musician.name} - Instruments:{" "}
                      {scaleMusician.instruments
                        .map((instrument) => instrument.name)
                        .join(", ")}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteScale(scale.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
