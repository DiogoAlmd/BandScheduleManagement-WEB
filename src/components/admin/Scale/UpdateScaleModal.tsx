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
} from "@/components/ui/dialog";
import { updateScale } from "@/services/data/ScaleService";
import { getMusicians } from "@/services/data/MusiciansService";
import { getInstruments } from "@/services/data/InstrumentService";
import { Musician } from "@/types/musician";
import { Instrument } from "@/types/instrument";
import Select, { MultiValue } from "react-select";
import { Scale } from "@/types/scale";

interface UpdateScaleModalProps {
  scale: Scale;
  onScaleUpdated: (updatedScale: Scale) => void;
}

export default function UpdateScaleModal({
  scale,
  onScaleUpdated,
}: UpdateScaleModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [eventDate, setEventDate] = useState<string>(scale.eventDate);
  const [musicianSelections, setMusicianSelections] = useState<
    { musicianId: number | null; instrumentIds: number[] }[]
  >(scale.scaleMusician.map((sm) => ({
    musicianId: sm.musician.id,
    instrumentIds: sm.instruments.map((inst) => inst.id),
  })));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setMusicians(await getMusicians());
        setInstruments(await getInstruments());
      } catch {
        setError("Failed to load musicians or instruments.");
      }
    }
    fetchData();
  }, []);

  const musicianOptions = musicians.map((musician) => ({
    value: musician.id,
    label: musician.name,
  }));

  const instrumentOptions = instruments.map((instrument) => ({
    value: instrument.id,
    label: instrument.name,
  }));

  const handleMusicianChange = (
    selectedMusician: { value: number } | null,
    index: number
  ) => {
    const newSelections = [...musicianSelections];
    newSelections[index].musicianId = selectedMusician
      ? selectedMusician.value
      : null;
    setMusicianSelections(newSelections);
  };

  const handleInstrumentsChange = (
    selectedInstruments: MultiValue<{ value: number; label: string }> | null,
    index: number
  ) => {
    const newSelections = [...musicianSelections];
    newSelections[index].instrumentIds = selectedInstruments
      ? selectedInstruments.map((instrument) => instrument.value)
      : [];
    setMusicianSelections(newSelections);
  };

  const onSubmit = async () => {
    try {
      const filteredMusicians = musicianSelections
        .filter(
          (selection) =>
            selection.musicianId && selection.instrumentIds.length > 0
        )
        .map((selection) => ({
          musicianId: selection.musicianId!,
          instrumentIds: selection.instrumentIds,
        }));

      const updatedScale = await updateScale(scale.id, {
        eventDate,
        musicians: filteredMusicians,
      });
      onScaleUpdated(updatedScale);
      setIsOpen(false);
    } catch {
      setError("Failed to update scale.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit Scale</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Scale</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            placeholder="Event Date"
          />
          {musicianSelections.map((selection, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Select
                options={musicianOptions.filter(
                  (option) =>
                    !musicianSelections.some(
                      (selected) => selected.musicianId === option.value
                    ) || selection.musicianId === option.value
                )}
                value={musicianOptions.find(
                  (option) => option.value === selection.musicianId
                )}
                onChange={(selected) => handleMusicianChange(selected, index)}
                placeholder="Select Musician"
              />
              <Select
                options={instrumentOptions}
                isMulti
                value={instrumentOptions.filter((option) =>
                  selection.instrumentIds.includes(option.value)
                )}
                onChange={(selected) =>
                  handleInstrumentsChange(selected, index)
                }
                placeholder="Select Instruments"
              />
            </div>
          ))}
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={onSubmit}>Confirm</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
