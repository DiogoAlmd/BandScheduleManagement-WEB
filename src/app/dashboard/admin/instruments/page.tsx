import InstrumentsList from "@/components/admin/Instruments";
import { Instrument } from "@/types/instrument";
import { getInstruments } from "@/services/data/InstrumentService";

export default async function InstrumentsPage() {
  const initialInstruments: Instrument[] = await getInstruments();

  return <InstrumentsList initialInstruments={initialInstruments} />;
}
