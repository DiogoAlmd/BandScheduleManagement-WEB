import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z
    .string({ required_error: "Email is required." })
    .email("Invalid email address."),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, "Password must be at least 8 characters.")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter.")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter.")
    .regex(/(?=.*\d)/, "Password must contain at least one number.")
    .regex(/(?=.*[@$!%*?&])/, "Password must contain at least one special character."),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required." })
    .min(8, "Password must be at least 8 characters."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;
