import { SignInRequest } from "../schema/SignInRequest";
import { SignUpRequest } from "../schema/SignUpRequest";
import { env } from "../../env/client.mjs";

const API_URL = env.NEXT_PUBLIC_API_URL;

// Client Side API Calls
export async function login(email: string, password: string) {
  const data = SignInRequest.safeParse({
    email,
    password,
  });
  if (!data.success) throw data.error;

  const response = await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.data),
  }).then((res) => res.json());

  if (response.error) throw response.error;

  return response;
}

export async function signup(email: string, password: string) {
  const data = SignUpRequest.safeParse({
    email,
    password,
  });
  if (!data.success) throw data.error;

  const response = await fetch(API_URL + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.data),
  }).then((res) => res.json());

  if (response.error) throw response.error;

  return response;
}
