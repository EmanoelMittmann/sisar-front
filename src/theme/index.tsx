"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main>{children}</main>
    </ThemeProvider>
  );
};
