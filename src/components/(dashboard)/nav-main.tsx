"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Url } from "next/dist/shared/lib/router/router";

export function NavMain({
  data,
}: {
  data: {
    title: string;
    url?: Url;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const path = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {data.map((menuItem) => (
          <Collapsible
            key={menuItem.title}
            asChild
            defaultOpen={path === menuItem.url}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {menuItem.items ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={menuItem.title}>
                      {menuItem.icon && <menuItem.icon />}
                      <span>{menuItem.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menuItem.items?.map(
                        (item: { title: string; url: string }) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.url}>
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : menuItem.url ? (
                <Link href={menuItem.url} prefetch={true}>
                  <SidebarMenuButton
                    tooltip={menuItem.title}
                    isActive={path === menuItem.url}
                  >
                    {menuItem.icon && <menuItem.icon />}
                    <span>{menuItem.title}</span>
                  </SidebarMenuButton>
                </Link>
              ) : (
                // Disable the button when there's no URL
                <SidebarMenuButton tooltip={menuItem.title} disabled>
                  {menuItem.icon && <menuItem.icon />}
                  <span>{menuItem.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
