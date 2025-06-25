"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { decodeJWT, JwtUser } from "@/helpers/jwt-decode";

interface IAuthDataAccessLayer {
  user: JwtUser | null;
  setUser: Dispatch<SetStateAction<JwtUser | null>>;
}

export const AuthDataAccessLayer = createContext({} as IAuthDataAccessLayer);

export const AuthDalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<JwtUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decodedUser = decodeJWT(token);
          setUser(decodedUser.payload);
        } catch (error) {
          console.error("Failed to decode user from token:", error);
          localStorage.clear();
          document.startViewTransition(() => {
            window.location.href = "/login";
          });
          setUser(null);
        }
      } else {
        document.startViewTransition(() => {
          window.location.href = "/login";
        });
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthDataAccessLayer.Provider value={{ user, setUser }}>
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
