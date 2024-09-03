"use client";

import DelayedFading from "@/animation/delayed-fading";
import MainLayout from "@/components/main-layout";
import Image from "next/image";
import projectsData from "../../../public/content/frontEndDeveloperContent";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import experienceData from "../../../public/content/miningContent";

export default function MiningEngineer() {
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
              <p className="text-7xl font-black">Mining Engineer</p>
            </DelayedFading>
          </MainLayout>
        </div>
        <DelayedFading
          className={`absolute w-full h-[calc(50vh-85px)] top-0 z-[-1] brightness-50 invert-0`}
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
      <div className="my-[84px]">
        <MainLayout>
          <p className="text-4xl font-black mb-[24px]">EXPERIENCES</p>
        </MainLayout>
        <div className="grid grid-cols-3 w-full">
          {experienceData.map((experience, index) => (
            <div
              key={index}
              className="relative w-full h-full p-[24px] border-solid border-right border-[0.5px] border-2 border-[#1c1c1c] hover:bg-zinc-900 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() =>
                router.push(`/mining-engineer/experience/${experience.id}`)
              }
            >
              <div className="text-1xl font-black mb-[16px]">
                {experience.name.toLocaleUpperCase()}
              </div>
              <div className="relative w-full aspect-square object-cover rounded-3xl">
                <Image
                  src={experience.image_thumbnail ?? "/mining-1.png"}
                  alt="Photo by Drew Beamer"
                  fill
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>

              <div className="flex justify-between mt-[16px] text-thin">
                <p>{experience.place}</p>
                <p>
                  {dayjs(experience.started_on).format("MMM YYYY")} -{" "}
                  {experience.finished_on
                    ? dayjs(experience.finished_on).format("MMM YYYY")
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
