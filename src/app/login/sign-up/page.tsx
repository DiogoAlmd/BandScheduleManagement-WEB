"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/schemas/Auth/register.schema";
import { signUp } from "@/services/data/sign-up";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterSchema) => {
    setError(null);

    try {
      await signUp(data.name, data.email, data.password);
      router.push("/login/sign-in");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
      <><CardHeader>
      <CardTitle>Register</CardTitle>
    </CardHeader><form onSubmit={handleSubmit(handleRegister)}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              required />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              required />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              required />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
        </CardContent>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <CardFooter>
          <Button type="submit" className="w-full">Register</Button>
        </CardFooter>
      </form></>
  );
}
