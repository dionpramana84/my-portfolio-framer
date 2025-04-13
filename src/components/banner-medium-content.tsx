import DelayedFading from "@/animation/delayed-fading";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import MainLayout from "./main-layout";
import { Button } from "./ui/button";
import Image from "next/image";
import HeaderContent from "./header-content";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";

export default function BannerMediumContent({
  employment_type,
  name,
  start_date,
  end_date,
  link,
  image_thumbnail,
  height = "50vh",
  company_name,
}: {
  employment_type: string;
  name: string;
  start_date: Date;
  end_date: Date;
  link?: string | null;
  image_thumbnail: string;
  height?: string;
  company_name?: string | null;
}) {
  return (
    <>
      <DelayedFading className="w-full">
        <MainLayout>
          <div className="w-full h-full flex flex-col justify-between items-end">
            <div className="w-full my-[32px] self-start">
              <HeaderContent />
            </div>
            <div className="w-full flex justify-between self-end">
              <div className="flex flex-col md:flex-row justify-between w-full">
                <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full">
                  <div className="w-full mb-4 md:mb-0">
                    <p className="font-black md:hidden">
                      {employment_type} | {format(start_date, "PPP")} -{" "}
                      {end_date !== null ? format(end_date, "PPP") : "Now"}
                    </p>
                    <h3 className="font-black">{name.toUpperCase()}</h3>
                  </div>
                  <div className="flex flex-col self-end text-left md:text-right">
                    <Link target="_blank" href={link ?? "#"}>
                      <Button
                        variant="outline"
                        className="mb-[16px] w-28"
                        disabled={!link}
                      >
                        VISIT SITE <ArrowTopRightIcon />
                      </Button>
                    </Link>
                    <p className="font-black hidden md:block">
                      {employment_type}{" "}
                      {company_name ? `| ${company_name}` : ""}
                    </p>
                    <p className="hidden md:block">
                      {format(start_date, "PPP")} -{" "}
                      {end_date !== null ? format(end_date, "PPP") : "Now"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      </DelayedFading>

      <DelayedFading
        className={`absolute w-full h-[${height}]  top-0 z-[-1] brightness-50 invert-0`}
      >
        <Image
          src={image_thumbnail}
          alt="Photo by Drew Beamer"
          fill
          className="object-cover"
          priority
          quality={50}
        />
      </DelayedFading>
    </>
  );
}
