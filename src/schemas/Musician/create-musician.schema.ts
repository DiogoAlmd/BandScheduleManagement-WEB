import { z } from "zod";

export const createMusicianSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, "Password must be at least 8 characters.")
    .regex(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter."
    )
    .regex(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter."
    )
    .regex(/(?=.*\d)/, "Password must contain at least one number.")
    .regex(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special character."
    ),
  instrumentIds: z.array(z.number()).min(0),
});

export type CreateMusicianSchema = z.infer<typeof createMusicianSchema>;
