"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/admin/SideBar";
import MusicianSidebar from "@/components/musician/SideBar";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";


interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const { isAdmin, isMusician } = useDashboard();
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {isAdmin && <AdminSidebar />}
      {isMusician && <MusicianSidebar />}
      <main className="flex-1 flex flex-col">
        <header className="bg-gray-100 border-b px-4 py-2 flex justify-end items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/profile")}>Profile</Button>
          <Button variant="destructive" onClick={() => router.push("/login/sign-in")}>Logout</Button>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}