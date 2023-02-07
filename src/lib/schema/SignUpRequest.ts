import { z } from "zod";

export const SignUpRequest = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignUpRequestType = z.infer<typeof SignUpRequest>;

