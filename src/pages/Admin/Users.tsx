"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CreateAdminModal from "@/components/Modals/CreateAdminModal";
import UpdateAdminModal from "@/components/Modals/UpdateAdminModal";
import { useUsers } from "@/providers/UserProvider";

export default function UsersList() {
  const { data: users, error, createUser, deleteUser } = useUsers();

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Users</h2>
      {error && <p className="text-red-500">{error}</p>}

      <CreateAdminModal createUser={createUser} />

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
              <UpdateAdminModal admin={user} />
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
