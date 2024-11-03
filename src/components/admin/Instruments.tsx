"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instrument } from "@/types/instrument";
import { createInstrument, deleteInstrument } from "@/services/data/InstrumentService";

interface InstrumentsListProps {
  initialInstruments: Instrument[];
}

export default function InstrumentsList({ initialInstruments }: InstrumentsListProps) {
  const [instruments, setInstruments] = useState(initialInstruments);
  const [newInstrument, setNewInstrument] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (instruments.length === 0 && !error) {
    setError("No instruments found or failed to load instruments.");
  }

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
    </div>
  );
}
