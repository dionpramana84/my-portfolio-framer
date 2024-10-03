"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import projectsData from "../../../../public/content/frontEndDeveloperContent";
import MainLayout from "@/components/main-layout";
import { Badge } from "@/components/ui/badge";
import ImageGifCard from "@/components/image-gif-card";
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
          image_gif={data.image_gif!}
          image_thumbnail={
            data.image_thumbnail ? data.image_thumbnail : "/barong_statue.webp"
          }
          link={data.link}
          height="50vh"
          company_name={data.company_name}
        />
      </PageBanner>

      <MainLayout>
        <div className="flex justify-center my-[65px] md:my-[128px] lg:my-[156px]">
          <div className="mb-[32px] text-justify w-full sm:w-[70vw]">
            <h6 className="font-black">Role : {data.role}</h6>
            <br />
            <p>{data.description}</p>
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
        {data.images.map((image, index) => (
          <ImageGifCard image_thumbnail={image} key={index} index={index} />
        ))}
      </div>
    </>
  );
}
