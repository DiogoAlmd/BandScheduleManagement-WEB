"use client";

import { UsersProvider } from "@/providers/UserProvider";
import UsersList from "@/pages/Admin/Users";

export default function UsersPage() {
  return (
    <UsersProvider>
      <UsersList />
    </UsersProvider>
  );
}
