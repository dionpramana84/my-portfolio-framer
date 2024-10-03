import Link from "next/link";
import Image from "next/image";
import DrawerComponent from "./drawer";
import MainLayout from "./main-layout";

export default function HeaderContent() {
  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-start items-center">
        <Link href="/">
          <Image
            src="/logo-dion.webp"
            alt="Logo"
            height={32}
            width={32}
            className="object-cover"
            priority
            quality={50}
          />
        </Link>
      </div>
      <div className="flex justify-end items-center">
        <DrawerComponent />
      </div>
    </div>
  );
}
