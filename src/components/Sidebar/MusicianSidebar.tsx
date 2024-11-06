"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MusicianSidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <Button
        variant="link"
        className="font-semibold text-xl mb-4 text-white hover:underline text-left p-0"
        onClick={() => router.push("/dashboard/musician/home")}
      >
        Musician Dashboard
      </Button>
      <nav className="flex flex-col gap-4">
        <Button onClick={() => router.push("/dashboard/musician/scales")}>Scales</Button>
      </nav>
    </aside>
  );
}
