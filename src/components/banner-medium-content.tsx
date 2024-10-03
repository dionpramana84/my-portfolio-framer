import DelayedFading from "@/animation/delayed-fading";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import Link from "next/link";
import MainLayout from "./main-layout";
import { Button } from "./ui/button";
import Image from "next/image";
import HeaderContent from "./header-content";
import React from "react";

export default function BannerMediumContent({
  employment_type,
  name,
  started_on,
  finished_on,
  link,
  image_thumbnail,
  image_gif,
  height = "50vh",
  company_name,
}: {
  employment_type: string;
  name: string;
  started_on: string;
  finished_on: string | null;
  link?: string | null;
  image_thumbnail: string;
  image_gif?: string;
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
                      {employment_type} | {dayjs(started_on).format("MMM YYYY")}{" "}
                      -{" "}
                      {finished_on !== null
                        ? dayjs(finished_on).format("MMM YYYY")
                        : "Now"}
                    </p>
                    <h3 className="font-black">{name.toUpperCase()}</h3>
                  </div>
                  <div className="flex flex-col self-end text-left md:text-right">
                    {link ? (
                      <Link
                        href={link}
                        target="_blank"
                        className="flex justify-end"
                      >
                        <Button variant="outline" className="mb-[16px] w-28">
                          VISIT SITE <ArrowTopRightIcon />
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          className="mb-[16px] w-28"
                          disabled
                        >
                          VISIT SITE
                        </Button>
                      </div>
                    )}
                    <p className="font-black hidden md:block">
                      {employment_type}{" "}
                      {company_name ? `| ${company_name}` : ""}
                    </p>
                    <p className="hidden md:block">
                      {dayjs(started_on).format("MMM YYYY")} -{" "}
                      {finished_on !== null
                        ? dayjs(finished_on).format("MMM YYYY")
                        : "Now"}
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
          src={image_gif ? image_gif : image_thumbnail}
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
