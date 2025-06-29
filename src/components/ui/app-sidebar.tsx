"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Home, LogOut, CalendarRange, CreditCard, Store } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ThemeButton } from "@/theme/theme-button";
import { useRouter } from "next/navigation";
import { useAuthCtx } from "@/context/dal/auth-dal";

const LIST_MENU = [
  { title: "Início", icon: <Home />, path: "/inicio", type_user: "USER" },
  {
    title: "Agendamentos",
    icon: <CalendarRange />,
    path: "/agendamentos",
    type_user: "USER",
  },
  {
    title: "Assinaturas",
    icon: <CreditCard />,
    path: "/assinaturas",
    type_user: "USER",
  },
  {
    title: "Dashboard",
    icon: <Home />,
    path: "/admin",
    type_user: "ADMIN",
  },
  {
    title: "Minha Empresa",
    icon: <Store />,
    path: "/minha-empresa",
    type_user: "ADMIN",
  },
];

export function AppSidebar() {
  const { user } = useAuthCtx();
  console.log(user);
  const navigate = useRouter();
  const listOptions = LIST_MENU.map((item) => {
    if (user?.role == item.type_user)
      return (
        <SidebarMenuItem key={item.title} className="cursor-pointer">
          <SidebarMenuButton asChild>
            <a
              onClick={() => {
                document.startViewTransition(() => {
                  navigate.push(item.path);
                });
              }}
            >
              {item.icon}
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
  });

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <SidebarGroupLabel className="text-2xl text-shadow-3xs">
          <h5 className="text-[#049EA4] dark:text-[#049EA4]">sisar</h5>
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="rounded">
        <SidebarGroup className="flex items-center justify-center gap-6">
          <SidebarGroupContent>
            <SidebarMenu>{listOptions}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <CustomDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

const CustomDropdown = () => {
  const navigate = useRouter();
  const { user } = useAuthCtx();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full flex flex-row-reverse items-center justify-end gap-4 cursor-pointer p-2">
          <h5 className="text-ellipsis overflow-hidden whitespace-nowrap font-bold">
            {user?.username}
          </h5>
          <Avatar>
            <AvatarImage
              src={
                user?.image ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlDGXYTrMG8sjQ_yDUeevuJ1N55HysP9IS_UEFfzx-Kw8hsHnW7pgK1g&s"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {user?.role == "ADMIN" && (
          <>
            <DropdownMenuLabel
              onClick={() => navigate?.push("/minha-empresa")}
              className="cursor-pointer"
            >
              Minha Empresa
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup className="flex flex-row h-10 items-center">
          <DropdownMenuLabel>Tema</DropdownMenuLabel>
          <ThemeButton />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            localStorage.clear();
            document.startViewTransition(() => {
              window.location.href = "/login";
            });
          }}
          className="cursor-pointer"
        >
          <LogOut />
          <span>Log-out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
