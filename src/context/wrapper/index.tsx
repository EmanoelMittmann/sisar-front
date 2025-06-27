"use client";

import { ThemeWrapper } from "@/theme";
import { ListenerErrorClientProvider } from "../listeners/listener-error-client";
import { Toaster } from "sonner";
import { useEffect } from "react";

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  return (
    <ListenerErrorClientProvider>
      <Toaster position="bottom-left" />
      <ThemeWrapper>{children}</ThemeWrapper>
    </ListenerErrorClientProvider>
  );
};
