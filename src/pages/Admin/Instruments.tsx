"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllInstruments } from "@/providers/InstrumentProviders";
import { useState } from "react";


export default function InstrumentsList() {
  const {
    data: instruments,
    status,
    error,
    createInstrument,
    deleteInstrument,
  } = useGetAllInstruments();
  const [newInstrument, setNewInstrument] = useState("");

  const handleAddInstrument = async () => {
    if (!newInstrument) return;
    await createInstrument(newInstrument);
    setNewInstrument("");
  };

  const handleDeleteInstrument = async (id: number) => {
    await deleteInstrument(id);
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
      {status === "pending" ? (
        <p>Loading instruments...</p>
      ) : status === "error" ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-2">
          {instruments.map((instrument) => (
            <li
              key={instrument.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span>{instrument.name}</span>
              <Button
                variant="destructive"
                onClick={() => handleDeleteInstrument(instrument.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
