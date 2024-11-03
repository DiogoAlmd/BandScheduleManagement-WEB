"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { Scale } from "@/types/scale";


export default function Scales() {
  const [scales, setScales] = useState<Scale[]>([]);
  const [newScale, setNewScale] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScales();
  }, []);

  async function fetchScales() {
    try {
      setLoading(true);
      const response = await api.get("/scales");
      setScales(response.data);
    } catch (err) {
      console.error("Error fetching scales:", err);
      setError("Failed to load scales.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddScale() {
    if (!newScale) return;
    try {
      const response = await api.post("/newScale", { name: newScale });
      setScales([...newScale, response.data]);
      setNewScale("");
    } catch (err) {
      console.error("Error adding instrument:", err);
      setError("Failed to add instrument.");
    }
  }

  async function handleDeleteScale(id: number) {
    try {
      await api.delete(`/scales/${id}`);
      setScales(scales.filter((scale) => scale.id !== id));
    } catch (err) {
      console.error("Error deleting scale:", err);
      setError("Failed to delete scale.");
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Instruments</h2>
      
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder="New scale"
          value={newScale}
          onChange={(e) => setNewScale(e.target.value)}
        />
        <Button onClick={handleAddScale}>Add Scale</Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading scales...</p>
      ) : (
        <ul className="space-y-2">
          {scales.map((scale) => (
            <li key={scale.id} className="flex items-center justify-between p-2 border rounded">
              <Button variant="destructive" onClick={() => handleDeleteScale(scale.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
