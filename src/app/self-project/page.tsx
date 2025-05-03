"use client";

import BannerSimpleContent from "@/components/banner-simple-content";
import ListCard from "@/components/list-card";
import MainLayout from "@/components/main-layout";
import PageBanner from "@/components/page-banner";
import ConvertStringToSlug from "@/helper/convertStringToSlug";
import { SELF_PROJECTS } from "@/components/constant";

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-84px)]">
      <PageBanner>
        <BannerSimpleContent
          image={"/barong-black.webp"}
          title="Self Project"
        />
      </PageBanner>
      <div className="my-[24px]">
        <MainLayout>
          <h6 className="font-black mb-[24px]">List of Self Projects </h6>
        </MainLayout>
        <div className="grid grid-cols-1 w-full">
          {SELF_PROJECTS.map((project, index) => (
            <ListCard
              index={index}
              title={project}
              url={`/self-project/${ConvertStringToSlug(project)}`}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
