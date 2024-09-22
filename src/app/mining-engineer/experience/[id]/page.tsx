"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import experienceData from "../../../../../public/content/miningContent";
import DelayedFading from "@/animation/delayed-fading";
import MainLayout from "@/components/main-layout";
import Image from "next/image";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import BannerMediumContent from "@/components/banner-medium-content";
import PageBanner from "@/components/page-banner";
import ImageGifCard from "@/components/image-gif-card";

export default function Page() {
  const { id } = useParams();

  const router = useRouter();
  const data = experienceData.filter((experience) => experience.id === id)[0];

  useEffect(() => {
    if (!data) {
      router.push("/mining-engineer");
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
          image_thumbnail={
            data.image_thumbnail ? data.image_thumbnail : "/mining-3.png"
          }
          height="50vh"
        />
      </PageBanner>

      <MainLayout>
        <div className="flex justify-center my-[65px] md:my-[128px] lg:my-[156px]">
          <div className="mb-[32px] text-justify w-full sm:w-[70vw]">
            <h6 className="text-2xl font-black">Role : {data.name}</h6>
            <br />
            <div dangerouslySetInnerHTML={{ __html: data.description }} />{" "}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full my-[64px] md:my-[128px] lg:my-[156px]">
        {data.images?.map((image, index) => (
          <ImageGifCard image_thumbnail={image} key={index} index={index} />
        ))}
      </div>
    </>
  );
}
