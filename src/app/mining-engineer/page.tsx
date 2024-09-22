"use client";

import MainLayout from "@/components/main-layout";
import { useRouter } from "next/navigation";
import experienceData from "../../../public/content/miningContent";
import PageBanner from "@/components/page-banner";
import ImageGifCard from "@/components/image-gif-card";
import BannerSimpleContent from "@/components/banner-simple-content";

export default function MiningEngineer() {
  const router = useRouter();
  return (
    <>
      <PageBanner>
        <BannerSimpleContent
          image="/mining-2.png"
          title="Mining Engineer"
          subTitle={
            <>
              <span className="opacity-80">I GEDE</span> DION PRAMANA{" "}
              <span className="opacity-80">UTAMA</span>
            </>
          }
        />
      </PageBanner>
      <div className="my-[84px]">
        <MainLayout>
          <h6 className="font-black mb-[24px]">EXPERIENCES</h6>
        </MainLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {experienceData.map((experience, index) => (
            <ImageGifCard
              finished_on={experience.finished_on}
              started_on={experience.started_on}
              key={index}
              name={experience.name}
              image_thumbnail={
                experience.image_thumbnail
                  ? experience.image_thumbnail
                  : "/mining-1.png"
              }
              type={experience.place}
              href={`/mining-engineer/experience/${experience.id}`}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
