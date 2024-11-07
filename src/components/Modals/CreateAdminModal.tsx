"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import CreateAdminForm from "@/components/Forms/CreateAdminForm";

interface CreateAdminModalProps {
  createUser: (name: string, email: string, password: string) => Promise<void>;
}

export default function CreateAdminModal({ createUser }: CreateAdminModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdminCreated = async (name: string, email: string, password: string) => {
    await createUser(name, email, password);
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
        <CreateAdminForm onSubmit={handleAdminCreated} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
