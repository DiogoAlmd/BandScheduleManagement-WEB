"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMusicians } from "@/providers/MusicianProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateMusicianSchema,
  createMusicianSchema,
} from "@/schemas/Musician/create-musician.schema";
import { Instrument } from "@/types/instrument";
import Select from "react-select";
import { getInstruments } from "@/services/data/InstrumentService";

export default function CreateMusicianModal() {
  const { createMusician } = useMusicians();
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  async function fetchInstruments() {
    const data = await getInstruments();
      setInstruments(data);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateMusicianSchema>({
    resolver: zodResolver(createMusicianSchema),
  });

  const onSubmit = async (data: CreateMusicianSchema) => {
    const instrumentIds = selectedInstruments.map((inst) => inst.value);
      await createMusician(data.name, data.email, instrumentIds, data.password);
      reset();
      setSelectedInstruments([]);
      setIsOpen(false);
  };

  const instrumentOptions = instruments.map((instrument) => ({
    value: instrument.id,
    label: instrument.name,
  }));

  const [selectedInstruments, setSelectedInstruments] = useState<
    { value: number; label: string }[]
  >([]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => {setIsOpen(true); fetchInstruments()}}>Add New Musician</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Musician</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {errors.instrumentIds && (
              <p className="text-red-500 text-sm">
                {errors.instrumentIds.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
