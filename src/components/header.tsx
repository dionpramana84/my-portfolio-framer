import Link from "next/link";
import Image from "next/image";
import DrawerComponent from "./drawer";
import MainLayout from "./main-layout";

export default function Header() {
  return (
    <header className="absolute w-full z-9999 top-0 my-[32px]">
      <MainLayout>
        <div className="grid grid-cols-2">
          <div className="flex justify-start items-center">
            <Link href="/">
              <Image
                src="/logo-dion.png"
                alt="Logo"
                height={48}
                width={48}
                className="object-cover"
              />
            </Link>
          </div>
          <div className="flex justify-end items-center">
            <DrawerComponent />
          </div>
        </div>
      </MainLayout>
    </header>
  );
}
