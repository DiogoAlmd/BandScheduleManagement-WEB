"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { Instrument } from "@/types/instrument";


export default function Instruments() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [newInstrument, setNewInstrument] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstruments();
  }, []);

  async function fetchInstruments() {
    try {
      setLoading(true);
      const response = await api.get("/instruments");
      setInstruments(response.data);
    } catch (err) {
      console.error("Error fetching instruments:", err);
      setError("Failed to load instruments.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddInstrument() {
    if (!newInstrument) return;
    try {
      const response = await api.post("/instruments", { name: newInstrument });
      setInstruments([...instruments, response.data]);
      setNewInstrument("");
    } catch (err) {
      console.error("Error adding instrument:", err);
      setError("Failed to add instrument.");
    }
  }

  async function handleDeleteInstrument(id: number) {
    try {
      await api.delete(`/instruments/${id}`);
      setInstruments(instruments.filter((instrument) => instrument.id !== id));
    } catch (err) {
      console.error("Error deleting instrument:", err);
      setError("Failed to delete instrument.");
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Instruments</h2>
      
      <div className="flex items-center space-x-4">
        <Input
          type="text"
          placeholder="New instrument"
          value={newInstrument}
          onChange={(e) => setNewInstrument(e.target.value)}
        />
        <Button onClick={handleAddInstrument}>Add Instrument</Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading instruments...</p>
      ) : (
        <ul className="space-y-2">
          {instruments.map((instrument) => (
            <li key={instrument.id} className="flex items-center justify-between p-2 border rounded">
              <span>{instrument.name}</span>
              <Button variant="destructive" onClick={() => handleDeleteInstrument(instrument.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
