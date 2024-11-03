"use client";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { userRole, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <div className="font-semibold text-xl mb-4">Dashboard</div>
        <nav className="flex flex-col gap-4">
          <Button onClick={() => router.push("/scales")}>Scales</Button>
          {userRole === "admin" && (
            <>
              <Button onClick={() => router.push("/musicians")}>Musicians</Button>
              <Button onClick={() => router.push("/instruments")}>Instruments</Button>
            </>
          )}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-gray-100 border-b px-4 py-2 flex justify-end items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/profile")}>
            Profile
          </Button>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
