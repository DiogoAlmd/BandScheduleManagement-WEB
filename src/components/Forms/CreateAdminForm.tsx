"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserSchema, CreateUserSchema } from "@/schemas/User/create-user.schema";

interface CreateAdminFormProps {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
}

export default function CreateAdminForm({ onSubmit }: CreateAdminFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const handleFormSubmit = async (data: CreateUserSchema) => {
    await onSubmit(data.name, data.email, data.password);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Input placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <Input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <Button type="submit">Create Admin</Button>
    </form>
  );
}
