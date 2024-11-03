import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Scale {
  id: number;
  eventDate: string;
  assignedInstrument: string;
  otherMusicians: { name: string; instrument: string }[];
}

export default function MusicianHome() {
  const [scales, setScales] = useState<Scale[]>([]);

  useEffect(() => {
    const fetchScales = async () => {
      try {
        const response = await api.get("/musician/scales");
        setScales(response.data);
      } catch (error) {
        console.error("Failed to fetch scales", error);
      }
    };

    fetchScales();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Scales</h1>
      {scales.length > 0 ? (
        scales.map((scale) => (
          <div key={scale.id} className="border p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">Event Date: {scale.eventDate}</p>
            <p className="text-sm">Assigned Instrument: {scale.assignedInstrument}</p>
            <div className="mt-2">
              <p className="font-semibold">Other Musicians:</p>
              <ul className="pl-4 list-disc">
                {scale.otherMusicians.map((musician, index) => (
                  <li key={index}>
                    {musician.name} - {musician.instrument}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No scales assigned yet.</p>
      )}
    </div>
  );
}
