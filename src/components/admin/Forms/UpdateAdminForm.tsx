import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema, updateUserSchema } from "@/schemas/User/update-user.schema";
import { Admin } from "@/types/admin";
import { updateAdmin } from "@/services/data/AdminService";

interface UpdateAdminFormProps {
  admin: Admin;
  onAdminUpdated: (updatedAdmin: Admin) => void;
}

export default function UpdateAdminForm({ admin, onAdminUpdated }: UpdateAdminFormProps) {
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: admin.name,
      email: admin.email,
    },
  });

  const onSubmit = async (data: UpdateUserSchema) => {
    try {
      const requestData = data.password ? data : { ...data, password: undefined };

      const updatedAdmin = await updateAdmin(admin.id, requestData);
      onAdminUpdated(updatedAdmin);
      reset(requestData);
    } catch {
      setError("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Update Profile</Button>
    </form>
  );
}
