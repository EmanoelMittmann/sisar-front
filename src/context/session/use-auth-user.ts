import { cache } from "react";
import { verifySession } from "./verify-session";

export const useAuthUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    return session.userData;
  } catch (error) {
    console.log("Error in useAuthUser:", error);
    return null;
  }
});
