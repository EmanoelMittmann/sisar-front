import { cookies } from "next/headers";

export async function deleteSession() {
  const store = await cookies();

  store.delete("access_token");
}
