"use client";

import { usePathname } from "next/navigation";
import DynamicHeader from "./dynamic-header";
import Header from "./header";

export default function HeaderLayout() {
  const path = usePathname();
  return (
    <>
      {path.includes("mining-engineer") ||
      path.includes("front-end-developer") ? (
        <DynamicHeader />
      ) : (
        <Header />
      )}
    </>
  );
}
