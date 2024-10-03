"use client";

import Link from "next/link";
import Image from "next/image";
import DrawerComponent from "./drawer";
import MainLayout from "./main-layout";
import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

export default function DynamicHeader() {
  const slideDistance = 104; // the height of the navbar
  const threshold = 300; // the scrollY position at which the navbar appears

  const { scrollY } = useScroll();

  const [isInView, setIsInView] = useState(false); // Start with the navbar hidden

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsInView(latest > threshold); // Show navbar when scrollY > 200px
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, [scrollY]);

  return (
    <motion.div
      className={`fixed h-[${slideDistance}] w-full z-[9999] top-0 py-[16px] bg-black/10 shadow-lg shadow-zinc-900/30 backdrop-blur-[5px]`}
      initial={{ y: -slideDistance }}
      animate={{ y: isInView ? 0 : -slideDistance }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <MainLayout>
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
      </MainLayout>
    </motion.div>
  );
}
