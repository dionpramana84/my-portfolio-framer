"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import projectsData from "../../../../public/content/projects";
import DelayedFading from "@/animation/delayed-fading";
import MainLayout from "@/components/main-layout";
import Image from "next/image";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const { id } = useParams();

  const router = useRouter();
  const data = projectsData.filter((project) => project.id === id)[0];

  useEffect(() => {
    if (!data) {
      // Redirect to /front-end-developer if the id is invalid
      router.push("/front-end-developer");
    }
  }, [data, router]);

  if (!data) {
    // Return null while the redirect is happening
    return null;
  }

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(0deg, rgb(8 8 8 ) 0%, rgb(10 10 10 / 10%) 79.48%)",
        }}
        className="flex h-[50vh] items-end justify-between"
      >
        <DelayedFading className="w-full">
          <MainLayout>
            <div className="w-full flex justify-between">
              <div>
                <h1 className="text-4xl font-black">{data.type}</h1>
                <p className="text-7xl font-black">{data.name.toUpperCase()}</p>
              </div>
              <div className="flex flex-col self-end text-right">
                <p className="font-black">{data.employment_type}</p>
                <p>
                  {dayjs(data.start_date).format("MMM YYYY")} -{" "}
                  {data.end_date !== null
                    ? dayjs(data.end_date).format("MMM YYYY")
                    : "Now"}
                </p>
              </div>
            </div>
          </MainLayout>
        </DelayedFading>

        <DelayedFading
          className={`absolute w-full h-[50vh] top-0 z-[-1] brightness-50 invert-0`}
        >
          <Image
            src={data.image_thumbnail}
            alt="Photo by Drew Beamer"
            fill
            className="object-cover"
            priority
            quality={50}
          />
        </DelayedFading>
      </div>

      <MainLayout>
        <div className="my-[156px] flex justify-center">
          <div className="mb-[32px] text-justify  w-[70vw]">
            <p className="text-2xl font-black">Role : {data.role}</p>
            <br />
            <p className="text-1xl ">{data.description}</p>
            <br />
            <div className="w-[fit-content] flex flex-wrap gap-4 justify-between">
              {data.skills.map((skill, index) => (
                <Badge key={index} className="px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>

      <div className="grid grid-cols-3 w-full my-[156px] gap-4">
        {data.images.map((project, index) => (
          <div
            key={index}
            className="relative flex-grow h-full p-[24px] border-solid border-right border-[0.5px] border-2 border-[#1c1c1c] hover:bg-zinc-900 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div className="relative w-full aspect-square object-cover rounded-2xl">
              <Image
                src={project}
                alt="Photo by Dion Pramana"
                fill
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
