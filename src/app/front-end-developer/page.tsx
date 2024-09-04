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
          image="/barong-black.png"
          title="Front End Developer"
          subTitle={
            <>
              <span className="opacity-80">I GEDE</span> DION PRAMANA{" "}
              <span className="opacity-80">UTAMA</span>
            </>
          }
          height="50vh"
        />
      </PageBanner>
      <div className="my-[84px]">
        <MainLayout>
          <p className="text-4xl font-black mb-[24px]">PROJECTS</p>
        </MainLayout>
        <div className="grid grid-cols-3 w-full">
          {projectsData.map((project, index) => (
            <ImageGifCard
              key={index}
              finished_on={project.finished_on!}
              started_on={project.started_on}
              name={project.name}
              image_thumbnail={project.image_thumbnail}
              type={project.employment_type}
              onClick={() => router.push(`/front-end-developer/${project.id}`)}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
