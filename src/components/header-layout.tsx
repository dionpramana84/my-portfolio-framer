"use client";

import { usePathname } from "next/navigation";
import DynamicHeader from "./dynamic-header";
import Header from "./header";
import HeaderContent from "./header-content";
import MainLayout from "./main-layout";

export default function HeaderLayout() {
  const path = usePathname();
  return (
    <>
      {!path.startsWith("/dashboard") &&
        (path.includes("mining-engineer") ||
        path.includes("front-end-developer") ? (
          <DynamicHeader />
        ) : (
          <Header />
        ))}
    </>
  );
}
