"use client";

import MusicianList from "@/pages/Admin/Musician";
import { MusicianProvider } from "@/providers/MusicianProvider";
import { InstrumentsProviders } from "@/providers/InstrumentProviders";

export default function MusiciansPage() {
  return (
    <InstrumentsProviders>
      <MusicianProvider>
        <MusicianList />
      </MusicianProvider>
    </InstrumentsProviders>
  );
}
