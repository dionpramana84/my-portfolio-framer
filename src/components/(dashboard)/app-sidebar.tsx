"use client";

import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  ProjectorIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import useUserSession from "@/hooks/firebase/user-session";
import Link from "next/link";

const data = [
  {
    title: "Profile",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Project",
    icon: ProjectorIcon,
    url: "/dashboard/project",
  },
  {
    title: "Experience",
    url: "/dashboard/experience",
    icon: ProjectorIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user = null, onLogOut } = useUserSession();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu className="p-0">
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild className="p-0">
              <Link href="/dashboard">
                <h3 className="text-base font-semibold flex items-center space-x-2">
                  <ArrowUpCircleIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </h3>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain data={data} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogOut={onLogOut} />
      </SidebarFooter>
    </Sidebar>
  );
}
