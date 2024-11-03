"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MusicianSidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div className="font-semibold text-xl mb-4">Musician Dashboard</div>
      <nav className="flex flex-col gap-4">
        <Button onClick={() => router.push("/scales")}>Scales</Button>
      </nav>
    </aside>
  );
}