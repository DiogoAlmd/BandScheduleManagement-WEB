"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import UpdateAdminForm from "@/components/Forms/UpdateAdminForm";
import { Admin } from "@/types/admin";
import { useUsers } from "@/providers/UserProvider";

interface UpdateAdminModalProps {
  admin: Admin;
}

export default function UpdateAdminModal({ admin }: UpdateAdminModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateUser } = useUsers();

  const handleAdminUpdate = async (name?: string, email?: string, password?: string) => {
    await updateUser(admin.id, name, email, password);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Admin Profile</DialogTitle>
        </DialogHeader>
        <UpdateAdminForm admin={admin} onSubmit={handleAdminUpdate} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
