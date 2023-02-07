import { SignInRequest } from "../schema/SignInRequest";
import { SignUpRequest } from "../schema/SignUpRequest";
import { clientEnv } from "../../env/schema.mjs";

const API_URL = clientEnv.NEXT_PUBLIC_API_URL;

export async function signin(email: string, password: string) {
  const data = SignInRequest.safeParse({
    email,
    password,
  });
  if (!data.success) throw data.error;

  const response = await fetch(API_URL+"/auth/signin", {
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
