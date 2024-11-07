import MusicianProfile from "@/pages/Musician/MusicianProfile";
import { MusicianProvider } from "@/providers/MusicianProvider";
import { InstrumentsProviders } from "@/providers/InstrumentProviders";

export default function AdminProfilePage() {
  return (
    <InstrumentsProviders>
      <MusicianProvider>
        <MusicianProfile />
      </MusicianProvider>
    </InstrumentsProviders>
  );
}
