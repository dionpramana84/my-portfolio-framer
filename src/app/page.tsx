"use client";

import MainLayout from "@/components/main-layout";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex h-[calc(100vh-84px)] items-center justify-between pt-[68px] ">
        <div className="w-full">
          <MainLayout>
            <div className="w-full flex justify-end mb-[48px]">
              <div className="flex h-auto items-end mr-[16px]">
                <ArrowTopRightIcon className="h-[1.2rem] w-[1.2rem]" />
              </div>
              <Link href="/mining-engineer">
                <div className="relative !h-[45vh] w-[80px] md:w-[150px] mr-[16px] filter grayscale hover:grayscale-0 hover:w-[200px] md:hover:w-[200px] xl:hover:w-[250px] transition-all duration-300 ease group">
                  <Image
                    src="/mining.png"
                    alt="Photo by Drew Beamer"
                    fill
                    sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                    className="rounded-md object-cover !static group-hover:w-[200px] md:group-hover:w-[200px] xl:group-hover:w-[250px] transition-all duration-300 ease"
                    priority
                  />
                </div>
              </Link>
              <Link href="/front-end-developer">
                <div className="relative !h-[45vh] w-[80px] md:w-[150px] mr-[16px] filter grayscale hover:grayscale-0 hover:w-[100px] md:hover:w-[200px] xl:hover:w-[250px] transition-all duration-300 ease group">
                  <Image
                    src="/web-dev.png"
                    alt="Photo by Drew Beamer"
                    fill
                    sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                    className="rounded-md object-cover !static group-hover:w-[100px] md:group-hover:w-[200px] xl:group-hover:w-[250px] transition-all duration-300 ease"
                    priority
                  />
                </div>
              </Link>
              <div
                className={`relative !h-[45vh] w-[300px] md:!w-[500px] !aspect-[4/3] filter grayscale hover:grayscale-0 hidden md:block`}
              >
                <Image
                  src="/dion-2.png"
                  alt="Photo by Drew Beamer"
                  fill
                  sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                  className="rounded-md object-cover !static"
                  priority
                />
              </div>
            </div>

            <div className="w-full">
              <h6 className="font-black">
                <span className="opacity-50">I GEDE</span> DION PRAMANA{" "}
                <span className="opacity-50">UTAMA</span>
              </h6>
              <h1 className="font-black">PORTFOLIO</h1>
            </div>
          </MainLayout>
        </div>
      </div>
    </>
  );
}
