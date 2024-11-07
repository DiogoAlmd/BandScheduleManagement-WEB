"use client";

import { useState } from "react";
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

interface UpdateMusicianFormProps {
  musician: Musician;
  instruments: Instrument[];
  onSubmit: (data: UpdateMusicianSchema) => void;
}

export default function UpdateMusicianForm({
  musician,
  instruments,
  onSubmit,
}: UpdateMusicianFormProps) {

  const instrumentOptions = instruments.map((instrument) => ({
    value: instrument.id,
    label: instrument.name,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateMusicianSchema>({
    resolver: zodResolver(updateMusicianSchema),
    defaultValues: {
      name: musician.name,
      email: musician.email,
      instrumentIds: musician.instruments.map((inst) => inst.id),
    },
  });

  const [selectedInstruments, setSelectedInstruments] = useState(
    musician.instruments.map((inst) => ({
      value: inst.id,
      label: inst.name,
    }))
  );

  const handleFormSubmit = async (data: UpdateMusicianSchema) => {
    onSubmit({
      ...data,
      instrumentIds: selectedInstruments.map((inst) => inst.value),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col space-y-4"
    >
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
            setSelectedInstruments(
              selected as { value: number; label: string }[]
            );
            setValue(
              "instrumentIds",
              selected ? selected.map((s) => s.value) : []
            );
          }}
          placeholder="Select instruments"
        />
        {errors.instrumentIds && (
          <p className="text-red-500 text-sm">{errors.instrumentIds.message}</p>
        )}
      </div>
      <Button type="submit">Confirm</Button>
    </form>
  );
}
