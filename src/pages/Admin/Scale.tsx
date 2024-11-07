"use client";
import CreateScaleModal from "@/components/Modals/CreateScaleModal";
import ScaleList from "@/components/Dashboard/Scales/ScaleList";
import { useScales } from "@/providers/ScaleProvider";

export default function ScalePage() {
  const { scales, error, deleteScale } = useScales();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Scales</h2>
      <div className="flex items-center space-x-4">
        <CreateScaleModal />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <ScaleList scales={scales} onDelete={deleteScale} />
    </div>
  );
}
