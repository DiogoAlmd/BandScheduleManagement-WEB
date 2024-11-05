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
import { Admin } from "@/types/admin";
import UpdateAdminForm from "@/components/Forms/UpdateAdminForm";


interface UpdateAdminModalProps {
  admin: Admin;
  onAdminUpdated: (updatedAdmin: Admin) => void;
}

export default function UpdateAdminModal({
  admin,
  onAdminUpdated,
}: UpdateAdminModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdminUpdate = (updatedAdmin: Admin) => {
    onAdminUpdated(updatedAdmin);
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
        <UpdateAdminForm
          admin={admin}
          onAdminUpdated={handleAdminUpdate}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
