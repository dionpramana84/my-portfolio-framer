"use client";

import "../globals.css";
import { AppSidebar } from "@/components/(dashboard)/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.push("/main/auth");
  });

  if (!user) return;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
