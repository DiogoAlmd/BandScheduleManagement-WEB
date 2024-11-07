"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Musician } from "@/types/musician";
import { UpdateMusicianSchema } from "@/schemas/Musician/update-musician.schema";
import UpdateMusicianForm from "../Forms/UpdateMusicianForm";
import { useMusicians } from "@/providers/MusicianProvider";
import { useGetAllInstruments } from "@/providers/InstrumentProviders";

interface UpdateMusicianModalProps {
  musician: Musician;
}

export default function UpdateMusicianModal({
  musician,
}: UpdateMusicianModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateMusician } = useMusicians();
  const { data: instruments, } = useGetAllInstruments();

  const handleFormSubmit = async (data: UpdateMusicianSchema) => {
    try {
      await updateMusician(
        musician.id,
        data.name,
        data.email,
        data.instrumentIds,
        data.password
      );
      setIsOpen(false);
    } catch {
      setError("Failed to update musician.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit Musician</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Musician</DialogTitle>
        </DialogHeader>
        <UpdateMusicianForm musician={musician} onSubmit={handleFormSubmit} instruments={instruments}/>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
