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
                <div className="relative !h-[45vh] w-[150px] mr-[16px] filter grayscale hover:grayscale-0 hover:w-[200px] transition-all duration-300 ease">
                  <Image
                    src="/mining.png"
                    alt="Photo by Drew Beamer"
                    fill
                    sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                    className="rounded-md object-cover !static"
                    priority
                  />
                </div>
              </Link>
              <Link href="/front-end-developer">
                <div className="relative !h-[45vh] w-[150px] mr-[16px] filter grayscale hover:grayscale-0 hover:w-[200px] transition-all duration-300 ease">
                  <Image
                    src="/web-dev.png"
                    alt="Photo by Drew Beamer"
                    fill
                    sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                    className="rounded-md object-cover !static"
                    priority
                  />
                </div>
              </Link>
              <div
                className={`relative !h-[45vh] w-[500px] !aspect-[4/3] filter grayscale hover:grayscale-0`}
              >
                <Image
                  src="/dion-2.png"
                  alt="Photo by Drew Beamer"
                  fill
                  sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                  className="rounded-md object-cover !static "
                  priority
                />
              </div>
            </div>

            <div className="w-full">
              <h1 className="text-4xl font-black">
                <span className="opacity-50">I GEDE</span> DION PRAMANA{" "}
                <span className="opacity-50">UTAMA</span>
              </h1>
              <p className="text-9xl font-black">PORTFOLIO</p>
            </div>
          </MainLayout>
        </div>
      </div>
      {/* <MainLayout>

        <div className="h-full w-full grid grid-cols-3 gap-[16px] !my-[160px]">
          <div className="w-full grid col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Mining Related Skills</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-[16px]">
                <ProgressCard src="/mining.png" title="Auto CAD" value={70} />
                <ProgressCard src="/mining.png" title="Mircomine" value={60} />
                <ProgressCard src="/mining.png" title="Surpac" value={65} />
                <ProgressCard
                  src="/mining.png"
                  title="Mine Planning"
                  value={60}
                />
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                  Showing skills level based on years of experience
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="grid col-span-2 gap-[16px]">
            {experienceData.map((experience, index) => (
              <ExperienceDrawerComponent
                key={index}
                employment_type={experience.employment_type}
                title={experience.title}
                place={experience.place}
                started_on={experience.started_on}
                finished_on={experience.finished_on}
                skill={experience.skill}
                description={experience.description}
              />
            ))}
          </div>
        </div>
      </MainLayout> */}
    </>
  );
}
