import { Scale } from "@/types/scale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import UpdateScaleModal from "@/components/Modals/UpdateScaleModal";

interface ScaleListProps {
  scales: Scale[];
  onDelete: (id: number) => void;
}

export default function ScaleList({ scales, onDelete }: ScaleListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {scales.map((scale) => (
        <Card key={scale.id} className="border shadow-md flex flex-col h-full">
          <CardHeader>
            <CardTitle>{new Date(scale.eventDate).toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-700 text-sm">
              <strong>Created By:</strong> {scale.createdBy.name}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              <strong>Musicians:</strong>
            </p>
            <ul className="text-gray-600 text-sm list-disc ml-4">
              {scale.scaleMusician.map((scaleMusician) => (
                <li key={scaleMusician.id}>
                  {scaleMusician.musician.name} - Instruments:{" "}
                  {scaleMusician.instruments
                    .map((instrument) => instrument.name)
                    .join(", ")}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between">
            <UpdateScaleModal scale={scale} />
            <Button variant="destructive" onClick={() => onDelete(scale.id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
