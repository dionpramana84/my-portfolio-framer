"use client";

import MainLayout from "@/components/main-layout";
import projectsData from "../../../public/content/frontEndDeveloperContent";
import { useRouter } from "next/navigation";
import ImageGifCard from "@/components/image-gif-card";
import PageBanner from "@/components/page-banner";
import BannerSimpleContent from "@/components/banner-simple-content";

export default function FrontEndDeveloper() {
  const router = useRouter();
  return (
    <>
      <PageBanner>
        <BannerSimpleContent
          image="/barong-black.webp"
          title="Front End Developer"
          subTitle={
            <>
              <span className="opacity-80">I GEDE</span> DION PRAMANA{" "}
              <span className="opacity-80">UTAMA</span>
            </>
          }
        />
      </PageBanner>
      <div className="my-[24px] md:my-[48px] lg:my-[84px]">
        <MainLayout>
          <h6 className="font-black mb-[24px]">PROJECTS</h6>
        </MainLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {projectsData.map((project, index) => (
            <ImageGifCard
              key={index}
              finished_on={project.finished_on!}
              started_on={project.started_on}
              name={project.name}
              image_thumbnail={project.image_thumbnail}
              type={project.employment_type}
              href={`/front-end-developer/${project.id}`}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
