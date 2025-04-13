"use client";

import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-84px)] w-full items-center justify-center pt-[104px]">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
