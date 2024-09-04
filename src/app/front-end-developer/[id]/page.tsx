"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import projectsData from "../../../../public/content/frontEndDeveloperContent";
import DelayedFading from "@/animation/delayed-fading";
import MainLayout from "@/components/main-layout";
import Image from "next/image";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ImageGifCard from "@/components/image-gif-card";
import BannerSimpleContent from "@/components/banner-simple-content";
import PageBanner from "@/components/page-banner";
import BannerMediumContent from "@/components/banner-medium-content";

export default function Page() {
  const { id } = useParams();

  const router = useRouter();
  const data = projectsData.filter((project) => project.id === id)[0];

  useEffect(() => {
    if (!data) {
      router.push("/front-end-developer");
    }
  }, [data, router]);

  if (!data) {
    return null;
  }

  return (
    <>
      <PageBanner height="50vh">
        <BannerMediumContent
          employment_type={data.employment_type}
          finished_on={data.finished_on}
          name={data.name}
          started_on={data.started_on}
          type={data.employment_type}
          image_gif={data.image_gif!}
          image_thumbnail={data.image_thumbnail ? data.image_thumbnail : "/barong_statue.png"}
          link={data.link}
          height="50vh"
        />
      </PageBanner>

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

      <div className="grid grid-cols-3 w-full my-[156px]">
        {data.images.map((image, index) => (
          <ImageGifCard image_thumbnail={image} key={index} index={index} />
        ))}
      </div>
    </>
  );
}
