import { decodeJWT } from "@/helpers/jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
  const store = (await cookies()).get("access_token")?.value;
  const session = decodeJWT(store as string);

  if (!session.payload) {
    redirect("/login");
  }

  return { isAuth: true, userData: session.payload };
});
