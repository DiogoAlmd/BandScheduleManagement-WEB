"use client";
import { useEffect, useState } from "react";
import { getAdminDetails } from "@/services/data/AdminService";
import { Admin } from "@/types/admin";
import { useAuth } from "@/context/AuthContext";
import UpdateAdminForm from "@/components/Forms/UpdateAdminForm";

export default function AdminProfile() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchAdminDetails() {
      try {
        const adminData = await getAdminDetails(userId!);
        setAdmin(adminData);
      } catch {
        setError("Failed to load admin details.");
      }
    }
    fetchAdminDetails();
  }, [userId]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {admin && <UpdateAdminForm admin={admin} onAdminUpdated={setAdmin} />}
    </div>
  );
}
