import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeWrapper } from "@/theme";
import { ListenerErrorClientProvider } from "@/context/listeners/listener-error-client";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sisar",
  description: "A application for managing your schedules and appointments",
  icons: {
    icon: "/scheduler.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="bottom-left" />
        <ListenerErrorClientProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </ListenerErrorClientProvider>
      </body>
    </html>
  );
}
