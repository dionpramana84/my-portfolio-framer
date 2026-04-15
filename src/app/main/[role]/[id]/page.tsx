"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/main-layout";
import { Badge } from "@/components/ui/badge";
import ImageGifCard from "@/components/image-gif-card";
import PageBanner from "@/components/page-banner";
import BannerMediumContent from "@/components/banner-medium-content";
import { useProject } from "@/hooks/firebase/project";

export default function Page() {
  const { role, id } = useParams();
  const projectId = (Array.isArray(id) ? id[0] : id) ?? "";

  const { project } = useProject({ id: projectId });

  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push(`/${role}`);
    }
  }, [id, role, router]);

  if (!project) {
    return null;
  }

  const imageThumbnail = project.images?.find((image) => image.is_thumbnail);

  return (
    <>
      <PageBanner height="50vh">
        <BannerMediumContent
          employment_type={project.employment_type}
          end_date={project.end_date ?? new Date()}
          name={project.name}
          start_date={project.start_date ?? new Date()}
          image_thumbnail={
            imageThumbnail?.url ??
            (role === "front-end-developer"
              ? "/barong-black.webp"
              : "/mining-1.webp")
          }
          link={project.link_url}
          height="50vh"
          company_name={project.company_name}
        />
      </PageBanner>

      <MainLayout>
        <div className="flex justify-center my-[65px] md:my-[128px] lg:my-[156px]">
          <div className="mb-[32px] text-justify w-full sm:w-[70vw]">
            <h6 className="font-black">Role : {project.role_type}</h6>
            <br />
            <div
              dangerouslySetInnerHTML={{ __html: project.description ?? "" }}
            />
            <br />
            <div className="w-[fit-content] flex flex-wrap gap-4 justify-between">
              {project.skills?.map((skill, index) => (
                <Badge key={index} className="px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>

      {project.images?.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full my-[64px] md:my-[128px] lg:my-[156px]">
          {project.images?.map((image, index) => (
            <ImageGifCard
              image_thumbnail={image.url}
              key={index}
              index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
