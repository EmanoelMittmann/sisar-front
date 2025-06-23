"use client";
import NavigationMobile from "@/components/custom_components/navigation-mobile";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthDalProvider } from "@/context/dal/auth-dal";
import React from "react";

export default function SucessoAgendamentoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthDalProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="hidden max-sm:hidden sm:hidden md:flex lg:flex lg:items-center" />
        <main className="flex flex-col w-full items-center justify-center">
          <NavigationMobile />
          <div className="h-full w-full">{children}</div>
        </main>
      </SidebarProvider>
    </AuthDalProvider>
  );
}
