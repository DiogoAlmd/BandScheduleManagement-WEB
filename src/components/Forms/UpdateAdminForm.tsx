import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema, updateUserSchema } from "@/schemas/User/update-user.schema";
import { Admin } from "@/types/admin";

interface UpdateAdminFormProps {
  admin: Admin;
  onSubmit: (data: UpdateUserSchema) => void;
}

export default function UpdateAdminForm({ admin, onSubmit }: UpdateAdminFormProps) {

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: admin.name,
      email: admin.email,
    },
  });

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
      <Button type="submit">Update Profile</Button>
    </form>
  );
}
