import DelayedFading from "@/animation/delayed-fading";
import Image from "next/image";
import { title } from "process";
import HeaderContent from "./header-content";
import MainLayout from "./main-layout";

export default function BannerSimpleContent({
  title,
  subTitle,
  image,
}: {
  title: string;
  subTitle: JSX.Element;
  image: string;
}) {
  return (
    <>
      <div className="w-full h-full">
        <MainLayout>
          <DelayedFading className="w-full h-full flex flex-col">
            <div className="my-[32px] w-full self-start">
              <HeaderContent />
            </div>
            <div className="w-full h-full text-center self-end flex flex-col justify-center">
              <h1 className="text-4xl font-black">{subTitle}</h1>
              <p className="text-7xl font-black">{title}</p>
            </div>
          </DelayedFading>
        </MainLayout>
      </div>
      <DelayedFading
        className={`absolute w-full h-[50vh] top-0 z-[-1] brightness-50 invert-0`}
      >
        <Image
          src={image}
          alt={image}
          fill
          className="object-cover"
          priority
          quality={50}
        />
      </DelayedFading>
    </>
  );
}
