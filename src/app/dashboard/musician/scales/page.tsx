import MusicianScalePage from "@/pages/Musician/MusicianScale";
import { MusicianProvider } from "@/providers/MusicianProvider";
import { ScaleProvider } from "@/providers/ScaleProvider";

export default function ScalesPage() {

  return (
    <MusicianProvider>
      <ScaleProvider>
      <MusicianScalePage />
      </ScaleProvider>
    </MusicianProvider>
  );
}
