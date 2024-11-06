"use client";
import { useState } from "react";
import { Admin } from "@/types/admin";
import { useAuth } from "@/context/AuthContext";
import UpdateAdminForm from "@/components/Forms/UpdateAdminForm";
import { UpdateUserSchema } from "@/schemas/User/update-user.schema";
import { updateAdmin } from "@/services/data/AdminService";

export default function AdminProfile() {
  const [error, setError] = useState<string | null>(null);
  const { user, refreshToken } = useAuth();

  const handleFormSubmit = async (data: UpdateUserSchema) => {
    try {
      const requestData = data.password ? data : { ...data, password: undefined };
      await updateAdmin(user!.id, {
        ...requestData,
      });
      
      await refreshToken();
    } catch {
      setError("Failed to update musician.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {user && <UpdateAdminForm admin={user as Admin} onSubmit={handleFormSubmit} />}
    </div>
  );
}
