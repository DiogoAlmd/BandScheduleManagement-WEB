"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createUserSchema,
  CreateUserSchema,
} from "@/schemas/User/create-user.schema";
import { Admin } from "@/types/admin";
import { createAdmin } from "@/services/data/AdminService";

interface CreateAdminFormProps {
  onAdminCreated: (admin: Admin) => void;
}

export default function CreateAdminForm({
  onAdminCreated,
}: CreateAdminFormProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserSchema) => {
    try {
      const newAdmin = await createAdmin(data);
      onAdminCreated(newAdmin);
      reset();
    } catch {
      setError("Failed to create admin.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Name" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Create Admin</Button>
    </form>
  );
}
