"use client";
import { Admin } from "@/types/admin";
import { useAuth } from "@/context/AuthContext";
import UpdateAdminForm from "@/components/Forms/UpdateAdminForm";
import { useUsers } from "@/providers/UserProvider";

export default function AdminProfile() {
  const { updateUser } = useUsers();
  const { user, refreshToken } = useAuth();

  const handleAdminUpdate = async (name?: string, email?: string, password?: string) => {
    await updateUser(user!.id, name, email, password);
    await refreshToken();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      {user && <UpdateAdminForm admin={user as Admin} onSubmit={handleAdminUpdate} />}
    </div>
  );
}
