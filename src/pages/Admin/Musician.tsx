"use client";


import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import CreateMusicianModal from "@/components/Modals/CreateMusicianModal";
import UpdateMusicianModal from "@/components/Modals/UpdateMusicianModal";
import { useMusicians } from "@/providers/MusicianProvider";

export default function MusicianList() {
  const {
    data: musicians,
    error,
    deleteMusician,
  } = useMusicians();

  const handleDeleteMusician = async (id: number) => {
    await deleteMusician(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Musicians</h2>
      {error && <p className="text-red-500">{error}</p>}

      <CreateMusicianModal />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {musicians.map((musician) => (
          <Card key={musician.id} className="border shadow-md">
            <CardHeader>
              <CardTitle>{musician.name}</CardTitle>
              <p className="text-sm text-gray-500">{musician.email}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                <strong>Instruments:</strong>{" "}
                {musician.instruments.map((inst) => inst.name).join(", ")}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <UpdateMusicianModal
                musician={musician}
              />
              <Button
                variant="destructive"
                onClick={() => handleDeleteMusician(musician.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
