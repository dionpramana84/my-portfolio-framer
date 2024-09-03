"use client";

import DelayedFading from "@/animation/delayed-fading";
import MainLayout from "@/components/main-layout";
import projectsData from "../../../public/content/frontEndDeveloperContent";
import { useRouter } from "next/navigation";
import ImageGifCard from "@/components/iamge-gif-card";
import Image from "next/image";

export default function FrontEndDeveloper() {
  const router = useRouter();
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(0deg, rgb(8 8 8 ) 0%, rgb(10 10 10 / 50%) 79.48%)",
        }}
        className="flex h-[calc(50vh-84px)] items-center justify-between"
      >
        <div className="w-full mt-[84px]">
          <MainLayout>
            <DelayedFading className="w-full text-center">
              <h1 className="text-4xl font-black">
                <span className="opacity-80">I GEDE</span> DION PRAMANA{" "}
                <span className="opacity-80">UTAMA</span>
              </h1>
              <p className="text-7xl font-black">Front End Developer</p>
            </DelayedFading>
          </MainLayout>
        </div>
        <DelayedFading
          className={`absolute w-full h-[calc(50vh-85px)] top-0 z-[-1] brightness-50 invert-0`}
        >
          <Image
            src="/barong-black.png"
            alt="Photo by Dion"
            fill
            className="object-cover"
            priority
          />
        </DelayedFading>
      </div>
      <div className="my-[84px]">
        <MainLayout>
          <p className="text-4xl font-black mb-[24px]">PROJECTS</p>
        </MainLayout>
        <div className="grid grid-cols-3 w-full">
          {projectsData.map((project, index) => (
            <ImageGifCard
              key={index}
              project={project}
              onClick={() => router.push(`/front-end-developer/${project.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
