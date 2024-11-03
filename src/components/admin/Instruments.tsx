"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instrument } from "@/types/instrument";
import { createInstrument, deleteInstrument, getInstruments } from "@/services/data/InstrumentService";

export default function InstrumentsList() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [newInstrument, setNewInstrument] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const initialInstruments = await getInstruments();
        setInstruments(initialInstruments);
        setError(null);
      } catch {
        setError("Failed to load instruments.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

  const handleAddInstrument = async () => {
    if (!newInstrument) return;
    try {
      const newInstrumentData = await createInstrument(newInstrument);
      setInstruments([...instruments, newInstrumentData]);
      setNewInstrument("");
    } catch {
      setError("Failed to add instrument.");
    }
  };

  const handleDeleteInstrument = async (id: number) => {
    try {
      await deleteInstrument(id);
      setInstruments(instruments.filter((instrument) => instrument.id !== id));
    } catch {
      setError("Failed to delete instrument.");
    }
  };

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
