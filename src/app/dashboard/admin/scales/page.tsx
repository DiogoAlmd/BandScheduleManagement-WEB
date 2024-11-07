import ScalePage from "@/pages/Admin/Scale";
import { ScaleProvider } from "@/providers/ScaleProvider";
import { MusicianProvider } from "@/providers/MusicianProvider";

export default function ScalesPage() {
  return (
    <MusicianProvider>
      <ScaleProvider>
        <ScalePage />
      </ScaleProvider>
    </MusicianProvider>
  );
}
