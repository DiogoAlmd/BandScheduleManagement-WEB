"use client";
import AdminHome from "@/components/admin/AdminHome";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import MusicianHome from "@/components/musician/MusicianHome";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { userRole } = useAuth();

  return (
    <DashboardLayout>
      {userRole === "admin" ? <AdminHome /> : <MusicianHome />}
    </DashboardLayout>
  );
}