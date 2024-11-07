import { InstrumentsProviders } from "@/providers/InstrumentProviders";
import InstrumentsList from "@/pages/Admin/Instruments";

export default function InstrumentsPage() {
  return (
    <InstrumentsProviders>
      <InstrumentsList />
    </InstrumentsProviders>
  );
}
