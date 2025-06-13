'use server'

import { cookies } from "next/headers";

export async function createSession(token: string) {
  const store = await cookies();

  store.set("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
