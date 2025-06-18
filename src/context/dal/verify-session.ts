"use server";

import { decodeJWT } from "@/helpers/jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
  const store = (await cookies()).get("access_token")?.value;

  if (!store) return;

  const session = decodeJWT(store as string);

  if (!session) return;

  if (!session.payload || session instanceof Error) {
    redirect("/login");
  }

  return { isAuth: true, userData: session.payload };
});
