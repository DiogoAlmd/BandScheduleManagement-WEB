"use client";
import AdminHome from "@/components/admin/AdminHome";
import MusicianHome from "@/components/musician/MusicianHome";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { userRole } = useAuth();

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {userRole === "admin" ? <AdminHome /> : <MusicianHome />}
    </div>
  );
}
