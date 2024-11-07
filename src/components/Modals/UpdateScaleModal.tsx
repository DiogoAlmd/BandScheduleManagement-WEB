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
import Select, { MultiValue } from "react-select";
import { Plus, Trash2 } from "lucide-react";
import { Scale } from "@/types/scale";
import { useMusicians } from "@/providers/MusicianProvider";
import { useScales } from "@/providers/ScaleProvider";

interface UpdateScaleModalProps {
  scale: Scale;
}

export default function UpdateScaleModal({ scale }: UpdateScaleModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState<string>(
    new Date(scale.eventDate).toISOString().slice(0, 16)
  );
  const [musicianSelections, setMusicianSelections] = useState<
    {
      musicianId: number | null;
      instrumentIds: number[];
      musicianInstruments: { value: number; label: string }[];
    }[]
  >(
    scale.scaleMusician.map((sm) => ({
      musicianId: sm.musician.id,
      instrumentIds: sm.instruments.map((inst) => inst.id),
      musicianInstruments: sm.instruments.map((inst) => ({
        value: inst.id,
        label: inst.name,
      })),
    }))
  );

  const [isOpen, setIsOpen] = useState(false);
  const { data: musicians } = useMusicians();
  const { updateScale } = useScales();

  const musicianOptions = musicians.map((musician) => ({
    value: musician.id,
    label: musician.name,
  }));

  const handleMusicianChange = (
    selectedMusician: { value: number } | null,
    index: number
  ) => {
    const newSelections = [...musicianSelections];
    if (selectedMusician) {
      const selectedMusicianData = musicians.find(
        (musician) => musician.id === selectedMusician.value
      );
      if (selectedMusicianData) {
        newSelections[index].musicianId = selectedMusician.value;
        newSelections[index].musicianInstruments =
          selectedMusicianData.instruments.map((inst) => ({
            value: inst.id,
            label: inst.name,
          }));
      }
    } else {
      newSelections[index].musicianId = null;
      newSelections[index].musicianInstruments = [];
    }
    newSelections[index].instrumentIds = [];
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

  const handleAddMusicianSelection = () => {
    setMusicianSelections([
      ...musicianSelections,
      { musicianId: null, instrumentIds: [], musicianInstruments: [] },
    ]);
  };

  const handleRemoveMusicianSelection = (index: number) => {
    const newSelections = [...musicianSelections];
    newSelections.splice(index, 1);
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

      await updateScale(scale.id, {
        eventDate,
        musicians: filteredMusicians,
      });

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
                options={selection.musicianInstruments}
                isMulti
                value={selection.musicianInstruments.filter((option) =>
                  selection.instrumentIds.includes(option.value)
                )}
                onChange={(selected) =>
                  handleInstrumentsChange(selected, index)
                }
                placeholder="Select Instruments"
              />
              <Button
                variant="outline"
                onClick={() => handleRemoveMusicianSelection(index)}
                className="ml-2"
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={handleAddMusicianSelection}
            className="flex items-center"
          >
            <Plus className="mr-2" /> Add Musician
          </Button>
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
