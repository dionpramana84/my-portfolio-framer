"use client";

import DelayedFading from "@/animation/delayed-fading";
import MainLayout from "@/components/main-layout";
import Image from "next/image";
import projectsData from "../../../public/content/projects";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function FrontEndDeveloper() {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(0deg, rgb(8 8 8 ) 0%, rgb(10 10 10 / 50%) 79.48%)",
        }}
        className="flex h-screen items-center justify-between"
      >
        <div className="w-full">
          <MainLayout>
            <DelayedFading className="w-full">
              <h1 className="text-4xl font-black">
                <span className="opacity-80">I GEDE</span> DION PRAMANA{" "}
                <span className="opacity-80">UTAMA</span>
              </h1>
              <p className="text-7xl font-black">Front End Developer</p>
            </DelayedFading>
          </MainLayout>
        </div>

        <DelayedFading
          className={`absolute w-full h-screen top-0 z-[-1] brightness-50 invert-0`}
        >
          <Image
            src="/barong-black.png"
            alt="Photo by Drew Beamer"
            fill
            className="object-cover"
            priority
            quality={50}
          />
        </DelayedFading>
      </div>
      <div className="my-[156px]">
        <div className="mb-[32px]">
          <MainLayout>
            <h1 className="text-4xl font-black">PROJECTS</h1>
          </MainLayout>
        </div>
        <div className="grid grid-cols-3 w-full">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="relative w-full h-full p-[24px] border-solid border-right border-[0.5px] border-2 border-[#1c1c1c] hover:bg-zinc-900 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => router.push(`/front-end-developer/${project.id}`)}
            >
              <div className="text-2xl font-black mb-[16px]">
                {project.name}
              </div>
              <div className="relative w-full aspect-square object-cover rounded-2xl">
                <Image
                  src={project.image_thumbnail}
                  alt="Photo by Drew Beamer"
                  fill
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <div className="flex justify-between mt-[16px]">
                <p>{project.type}</p>
                <p>
                  {dayjs(project.start_date).format("MMM YYYY")} -{" "}
                  {project.end_date
                    ? dayjs(project.end_date).format("MMM YYYY")
                    : "Now"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
