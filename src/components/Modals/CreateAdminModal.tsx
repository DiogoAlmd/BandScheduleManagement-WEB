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
import CreateAdminForm from "@/components/Forms/CreateAdminForm";

interface CreateAdminModalProps {
  onAdminCreated: (admin: Admin) => void;
}

export default function CreateAdminModal({ onAdminCreated }: CreateAdminModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdminCreated = (newAdmin: Admin) => {
    onAdminCreated(newAdmin);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add New Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
        </DialogHeader>
        <CreateAdminForm onAdminCreated={handleAdminCreated} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
