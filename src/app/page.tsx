import MainLayout from "@/components/main-layout";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-between pt-[68px]">
      <div className="w-full">
        <MainLayout>
          <div className="w-full flex justify-end">
            <div className="w-[140px] mr-[16px]">
              <Link href="/experience/mining">
                <AspectRatio ratio={5 / 9} className="bg-muted">
                  <Image
                    src="mining.svg"
                    alt="Photo by Drew Beamer"
                    fill
                    className="rounded-md object-cover filter grayscale hover:grayscale-0"
                  />
                </AspectRatio>
              </Link>
            </div>

            <div className="w-[150px] mr-[16px]">
              <Link href={"/experience/mining"}>
                <AspectRatio ratio={5 / 9} className="bg-muted ">
                  <Image
                    src="web-dev.svg"
                    alt="Photo by Drew Beamer"
                    fill
                    className="rounded-md object-cover filter grayscale hover:grayscale-0"
                  />
                </AspectRatio>
              </Link>
            </div>

            <div className="w-[500px]">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src="dion-portofolio-16-9.svg"
                  alt="Photo by Drew Beamer"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </div>

          <div className="w-full">
            <p className="text-4xl font-black">
              <span className="opacity-50">I GEDE</span> DION PRAMANA{" "}
              <span className="opacity-50">UTAMA</span>
            </p>
            <p className="text-9xl font-black">PORTOFOLIO</p>
          </div>
        </MainLayout>
      </div>
    </div>
  );
}
