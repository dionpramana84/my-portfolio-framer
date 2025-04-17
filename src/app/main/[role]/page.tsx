"use client";

import MainLayout from "@/components/main-layout";
import ImageGifCard from "@/components/image-gif-card";
import PageBanner from "@/components/page-banner";
import BannerSimpleContent from "@/components/banner-simple-content";
import useProjects from "@/hooks/firebase/project";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function Page() {
  const { role } = useParams();
  const roleType =
    role === "front-end-developer" || role === "mining-engineer"
      ? role
      : undefined;
  const { projects } = useProjects({
    role_type: roleType,
  });

  return (
    <>
      <PageBanner>
        <BannerSimpleContent
          image={
            role === "front-end-developer"
              ? "/barong-black.webp"
              : "/mining-2.webp"
          }
          title="Front End Developer"
          subTitle={
            <>
              <span className="opacity-80">I GEDE</span> DION PRAMANA{" "}
              <span className="opacity-80">UTAMA</span>
            </>
          }
        />
      </PageBanner>
      <div className="my-[24px]">
        <MainLayout>
          <h6 className="font-black mb-[24px]">PROJECTS</h6>
        </MainLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full">
          {!projects ? (
            <Loader2 className="animate-spin mr-1" />
          ) : (
            projects.map((project, index) => (
              <ImageGifCard
                key={index}
                start_date={project.start_date!}
                end_date={project.end_date}
                name={project.name}
                image_thumbnail={
                  project.images?.find((image) => image.is_thumbnail)?.url ??
                  (role === "front-end-developer"
                    ? "/barong-black.webp"
                    : `/mining-${Math.floor(Math.random() * 3) + 1}.webp`)
                }
                type={project.employment_type}
                url={`/main/${role}/${project.id}`}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
