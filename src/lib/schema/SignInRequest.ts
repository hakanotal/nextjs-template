import { z } from "zod";

export const SignInRequest = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInRequestType = z.infer<typeof SignInRequest>;
