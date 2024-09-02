"use client";

import DelayedFading from "@/animation/delayed-fading";
import MainLayout from "@/components/main-layout";
import Image from "next/image";
import projectsData from "../../../public/content/projects";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function MiningEngineer() {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(0deg, rgb(8 8 8 ) 0%, rgb(10 10 10 / 50%) 79.48%)",
        }}
        className="flex h-[calc(100vh-84px)] items-center justify-between"
      >
        <div className="w-full">
          <MainLayout>
            <DelayedFading className="w-full">
              <h1 className="text-4xl font-black">
                <span className="opacity-80">I GEDE</span> DION PRAMANA{" "}
                <span className="opacity-80">UTAMA</span>
              </h1>
              <p className="text-7xl font-black">Mining Engineer</p>
            </DelayedFading>
          </MainLayout>
        </div>
        <DelayedFading
          className={`absolute w-full h-[calc(100vh-85px)] top-0 z-[-1] brightness-50 invert-0`}
        >
          <Image
            src="/mining-2.png"
            alt="Photo by Dion"
            fill
            className="object-cover"
            priority
          />
        </DelayedFading>
      </div>
    </>
  );
}
