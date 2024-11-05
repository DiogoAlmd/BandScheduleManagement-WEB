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
import { updateMusician } from "@/services/data/MusiciansService";
import { Musician } from "@/types/musician";

import { UpdateMusicianSchema } from "@/schemas/Musician/update-musician.schema";
import UpdateMusicianForm from "../Forms/UpdateMusicianForm";

interface UpdateMusicianModalProps {
  musician: Musician;
  onMusicianUpdated: (updatedMusician: Musician) => void;
}

export default function UpdateMusicianModal({
  musician,
  onMusicianUpdated,
}: UpdateMusicianModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: UpdateMusicianSchema) => {
    try {
      const requestData = data.password ? data : { ...data, password: undefined };
      const updatedMusician = await updateMusician(musician.id, {
        ...requestData,
        instrumentIds: data.instrumentIds,
      });
      onMusicianUpdated(updatedMusician);
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
        <UpdateMusicianForm musician={musician} onSubmit={handleFormSubmit} />
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
