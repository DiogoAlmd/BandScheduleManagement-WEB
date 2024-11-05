"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import {
  UpdateMusicianSchema,
  updateMusicianSchema,
} from "@/schemas/Musician/update-musician.schema";
import { Musician } from "@/types/musician";
import { Instrument } from "@/types/instrument";
import { getInstruments } from "@/services/data/InstrumentService";

interface UpdateMusicianFormProps {
  musician: Musician;
  onSubmit: (data: UpdateMusicianSchema) => void;
}

export default function UpdateMusicianForm({
  musician,
  onSubmit,
}: UpdateMusicianFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<
    { value: number; label: string }[]
  >([]);

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
        reset({
          name: musician.name,
          email: musician.email,
          instrumentIds: musician.instruments.map((inst) => inst.id),
        });
      } catch {
        setError("Failed to load instruments.");
      }
    }

    fetchInstruments();
  }, [musician, reset]);

  const instrumentOptions = instruments.map((instrument) => ({
    value: instrument.id,
    label: instrument.name,
  }));

  return (
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
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div>
        <Select
          options={instrumentOptions}
          isMulti
          value={selectedInstruments}
          onChange={(selected) => {
            setSelectedInstruments(selected as { value: number; label: string }[]);
            setValue("instrumentIds", selected ? selected.map((s) => s.value) : []);
          }}
          placeholder="Select instruments"
        />
        {errors.instrumentIds && (
          <p className="text-red-500 text-sm">
            {errors.instrumentIds.message}
          </p>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Confirm</Button>
    </form>
  );
}