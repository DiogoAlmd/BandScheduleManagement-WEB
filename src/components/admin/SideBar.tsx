"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <Button
        variant="link"
        className="font-semibold text-xl mb-4 text-white hover:underline text-left p-0"
        onClick={() => router.push("/dashboard/admin/home")}
      >
        Admin Dashboard
      </Button>
      <nav className="flex flex-col gap-4 mt-4">
        <Button onClick={() => router.push("/dashboard/admin/scales")}>Scales</Button>
        <Button onClick={() => router.push("/dashboard/admin/musicians")}>Musicians</Button>
        <Button onClick={() => router.push("/dashboard/admin/instruments")}>Instruments</Button>
      </nav>
    </aside>
  );
}
