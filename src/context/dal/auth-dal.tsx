"use client";

import { createContext, useContext } from "react";
import { JwtUser } from "@/helpers/jwt-decode";

export const AuthDataAccessLayer =
  createContext<Promise<JwtUser | null> | null>(null);

export const AuthDalProvider = ({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: Promise<JwtUser | null>;
}) => {
  return (
    <AuthDataAccessLayer.Provider value={userPromise}>
      {children}
    </AuthDataAccessLayer.Provider>
  );
};

export function useAuthCtx() {
  const context = useContext(AuthDataAccessLayer);

  if (!context) {
    throw new Error("useAuthCtx must be used within an AuthDalProvider");
  }

  return context;
}
