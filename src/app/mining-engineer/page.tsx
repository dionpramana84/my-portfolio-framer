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
      <PageBanner height="50vh">
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
          <p className="text-4xl font-black mb-[24px]">EXPERIENCES</p>
        </MainLayout>
        <div className="grid grid-cols-3 w-full">
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
              onClick={() =>
                router.push(`/mining-engineer/experience/${experience.id}`)
              }
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
