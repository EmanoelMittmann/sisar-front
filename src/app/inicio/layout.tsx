"use client";
import NavigationMobile from "@/components/custom_components/navigation-mobile";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthDalProvider } from "@/context/dal/auth-dal";
// import { AuthDalProvider } from "@/context/dal/auth-dal";
// import { useAuthUser } from "@/context/dal/use-auth-user";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <AuthDalProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="hidden max-sm:hidden sm:hidden md:flex lg:flex items-center" />
        <main className="flex flex-col w-full items-center justify-center">
          <NavigationMobile />
          <div className="h-full w-full">{children}</div>
        </main>
      </SidebarProvider>
    </AuthDalProvider>
  );
}
