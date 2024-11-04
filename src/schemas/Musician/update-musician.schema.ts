import { z } from "zod";

export const updateMusicianSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).optional(),
  email: z.string().email({ message: "Invalid email address." }).optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter.")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter.")
    .regex(/(?=.*\d)/, "Password must contain at least one number.")
    .regex(/(?=.*[@$!%*?&])/, "Password must contain at least one special character.")
    .optional(),
  instrumentIds: z.array(z.number()).optional(),
});

export type UpdateMusicianSchema = z.infer<typeof updateMusicianSchema>;
