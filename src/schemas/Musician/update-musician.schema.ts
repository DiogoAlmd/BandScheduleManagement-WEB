import { z } from "zod";

export const updateMusicianSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .optional(),
  email: z.string().email({ message: "Invalid email address." }).optional(),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters.",
    })
    .refine((val) => !val || /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((val) => !val || /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((val) => !val || /\d/.test(val), {
      message: "Password must contain at least one number.",
    })
    .refine((val) => !val || /[@$!%*?&]/.test(val), {
      message: "Password must contain at least one special character.",
    }),
  instrumentIds: z.array(z.number()).optional(),
});

export type UpdateMusicianSchema = z.infer<typeof updateMusicianSchema>;
