"use client";

import { useEffect, useState } from "react";
import { getAdmins, deleteAdmin } from "@/services/data/AdminService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Admin } from "@/types/admin";
import CreateAdminModal from "@/components/Modals/CreateAdminModal";
import UpdateAdminModal from "@/components/Modals/UpdateAdminModal";

export default function UsersList() {
  const [users, setUsers] = useState<Admin[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAdmins();
        setUsers(data);
      } catch {
        setError("Failed to load users.");
      }
    }
    fetchData();
  }, []);

  const handleUserCreated = (newUser: Admin) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserUpdated = (updatedUser: Admin) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteAdmin(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Users</h2>
      {error && <p className="text-red-500">{error}</p>}

      <CreateAdminModal onAdminCreated={handleUserCreated} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {users.map((user) => (
          <Card key={user.id} className="border shadow-md">
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-sm text-gray-500">{user.email}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">
                <strong>Role:</strong> {user.role}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <UpdateAdminModal
                admin={user}
                onAdminUpdated={handleUserUpdated}
              />
              <Button
                variant="destructive"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
