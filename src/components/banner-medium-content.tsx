import DelayedFading from "@/animation/delayed-fading";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import Link from "next/link";
import MainLayout from "./main-layout";
import { Button } from "./ui/button";
import Image from "next/image";
import HeaderContent from "./header-content";

export default function BannerMediumContent({
  employment_type,
  name,
  type,
  started_on,
  finished_on,
  link,
  image_thumbnail,
  image_gif,
  height = "50vh",
}: {
  employment_type: string;
  name: string;
  type: string;
  started_on: string;
  finished_on: string | null;
  link?: string | null;
  image_thumbnail: string;
  image_gif?: string;
  height?: string;
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
              <div className="w-[70vw]">
                <h1 className="text-4xl font-black">{type}</h1>
                <p className="text-7xl font-black">{name.toUpperCase()}</p>
              </div>
              <div className="flex flex-col self-end text-right">
                <Link
                  href={link ?? ""}
                  target="_blank"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Button
                    variant="outline"
                    className="mb-[16px]"
                    disabled={!link}
                  >
                    VISIT SITE <ArrowTopRightIcon />
                  </Button>
                </Link>
                <p className="font-black">{employment_type}</p>
                <p>
                  {dayjs(started_on).format("MMM YYYY")} -{" "}
                  {finished_on !== null
                    ? dayjs(finished_on).format("MMM YYYY")
                    : "Now"}
                </p>
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
