"use client";

import "../globals.css";
import { AppSidebar } from "@/components/(dashboard)/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/firebase/config";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!user && !loading) router.push("/main/auth");
  }, [user, loading, router]);

  if (!user) return null;

  // ✅ Get path segments (excluding "dashboard")
  const pathSegments = path.split("/").filter(Boolean).slice(1);

  // ✅ Format segment text (e.g., "front-end-developer" → "Front End Developer")
  const formatSegment = (segment: string) =>
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {/* Dashboard Link */}
              <BreadcrumbItem>
                <Link href="/dashboard">
                  <BreadcrumbLink>Dashboard</BreadcrumbLink>
                </Link>
                {pathSegments.length > 0 && <BreadcrumbSeparator />}
              </BreadcrumbItem>

              {/* Dynamically render breadcrumb levels */}
              {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                const href = `/dashboard/${pathSegments
                  .slice(0, index + 1)
                  .join("/")}`;

                // ✅ Ensure "Project" is plain text (not a link)
                if (segment.toLowerCase() === "project") {
                  return (
                    <BreadcrumbItem key={index}>
                      <span className="text-muted-foreground">
                        {formatSegment(segment)}
                      </span>
                      {!isLast && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                  );
                }

                return (
                  <BreadcrumbItem key={index}>
                    {isLast ? (
                      <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                    ) : (
                      <Link href={href}>
                        <BreadcrumbLink>
                          {formatSegment(segment)}
                        </BreadcrumbLink>
                      </Link>
                    )}
                    {!isLast && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] p-6 flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
