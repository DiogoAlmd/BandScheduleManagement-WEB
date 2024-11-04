"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { updateMusician } from "@/services/data/MusiciansService";
import { getInstruments } from "@/services/data/InstrumentService";
import { Musician } from "@/types/musician";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateMusicianSchema, updateMusicianSchema } from "@/schemas/Musician/update-musician.schema";
import { Instrument } from "@/types/instrument";
import Select from "react-select";

interface UpdateMusicianModalProps {
  musician: Musician;
  onMusicianUpdated: (updatedMusician: Musician) => void;
}

export default function UpdateMusicianModal({
  musician,
  onMusicianUpdated,
}: UpdateMusicianModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    async function fetchInstruments() {
      try {
        const data = await getInstruments();
        setInstruments(data);

        setSelectedInstruments(
          musician.instruments.map((inst) => ({
            value: inst.id,
            label: inst.name,
          }))
        );
      } catch {
        setError("Failed to load instruments.");
      }
    }

    fetchInstruments();
  }, [musician]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UpdateMusicianSchema>({
    resolver: zodResolver(updateMusicianSchema),
    defaultValues: {
      name: musician.name,
      email: musician.email,
      instrumentIds: musician.instruments.map((inst) => inst.id),
    },
  });

  const onSubmit = async (data: UpdateMusicianSchema) => {
    try {
      const instrumentIds = selectedInstruments.map((inst) => inst.value);
      const updatedMusician = await updateMusician(musician.id, { ...data, instrumentIds });
      onMusicianUpdated(updatedMusician);
      reset();
      setSelectedInstruments([]);
    } catch {
      setError("Failed to update musician.");
    }
  };

  const instrumentOptions = instruments.map((instrument) => ({
    value: instrument.id,
    label: instrument.name,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Musician</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Musician</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <div>
            <Input placeholder="Name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Select
              options={instrumentOptions}
              isMulti
              value={selectedInstruments}
              onChange={(selected) => {
                setSelectedInstruments(selected as { value: number; label: string }[]);
                setValue(
                  "instrumentIds",
                  selected ? selected.map((s) => s.value) : []
                );
              }}
              placeholder="Select instruments"
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {errors.instrumentIds && (
              <p className="text-red-500 text-sm">{errors.instrumentIds.message}</p>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}